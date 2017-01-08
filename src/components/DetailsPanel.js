import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import scrollIntoView from 'scroll-into-view';

import PlaceCard from './PlaceCard'

import PLACES from '../constants/places.js';

class DetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.setScrollHandlerEnabled = this.setScrollHandlerEnabled.bind(this);
    this.cards = [];
    this.previousScrollTop = 0;
    this._isScrollHandlerEnabled = false;
    this._autoScrollCount = 0;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selectedIndex !== this.props.selectedIndex;
  }

  render() {
    return (
      <div className="details">
        {PLACES.map((place, index) => (
          <PlaceCard
            ref={(card) => { this.cards[index] = card; }}
            onClick={() => { this.props.onCardSelected(index); }}
            index={index}
            key={index}
            isSelected={index === this.props.selectedIndex}
          />
        ))}
      </div>
    );
  }

  setScrollHandlerEnabled(enabled) {
    const node = ReactDOM.findDOMNode(this);
    if (enabled && !this._isScrollHandlerEnabled) {
      node.addEventListener('scroll', this.handleScroll);
      this._isScrollHandlerEnabled = true;
    } else if (!enabled && this._isScrollHandlerEnabled) {
      node.removeEventListener('scroll', this.handleScroll);
      this._isScrollHandlerEnabled = false;
    }

  }

  componentDidMount() {
    this.setScrollHandlerEnabled(true);
  }

  componentWillUnmount() {
    this.setScrollHandlerEnabled(false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedIndex !== prevProps.selectedIndex &&
        this.props.shouldScrollToSelected) {
      const card = this.cards[this.props.selectedIndex];

      if (this._autoScrollCount) {
        // Cancel the previous scroll.
        var e = new TouchEvent('touchstart');
        const list = ReactDOM.findDOMNode(this);
        list.dispatchEvent(e);
      }

      const cardNode = ReactDOM.findDOMNode(card);
      const options = {align: {top: 0}};

      this.setScrollHandlerEnabled(false);
      this._autoScrollCount++;
      scrollIntoView(cardNode, options, () => {
        this._autoScrollCount--;
        if (this._autoScrollCount === 0) {
          this.setScrollHandlerEnabled(true);
        }
      });
    }
  }

  handleScroll(event) {
    var el = ReactDOM.findDOMNode(this);
    var direction = el.scrollTop > this.previousScrollTop ? 'down' : 'up';
    this.previousScrollTop = el.scrollTop;

    var viewBottom = el.scrollTop + el.clientHeight;
    var viewTop = el.scrollTop;

    var fullyVisible = [];
    var topVisible = [];
    var bottomVisible = [];
    for (let i = 0; i < this.cards.length; i++) {
      var cardEl = ReactDOM.findDOMNode(this.cards[i]);

      var cardBottom = cardEl.offsetTop + cardEl.clientHeight;
      var cardTop = cardEl.offsetTop + 40;  // Offset.

      var isBottomVisible = cardBottom <= viewBottom && cardBottom >= viewTop;
      var isTopVisible = cardTop <= viewBottom && cardTop >= viewTop;

      if (isBottomVisible && isTopVisible) {
        fullyVisible.push(i);
      } else if (isBottomVisible) {
        bottomVisible.push(i);
      } else if (isTopVisible) {
        topVisible.push(i);
      }
    }

    var selectedIndex = this.props.selectedIndex;
    if (direction === 'down') {
      if (fullyVisible.length) {
        selectedIndex = fullyVisible[fullyVisible.length - 1];
      } else if (topVisible.length) {
        selectedIndex = topVisible[0];
      }
    } else {
      if (fullyVisible.length) {
        selectedIndex = fullyVisible[0];
      } else if (bottomVisible.length) {
        selectedIndex = bottomVisible[0];
      }
    }

    this.props.onCardSelected(selectedIndex);
  }
}

export default DetailsPanel;
