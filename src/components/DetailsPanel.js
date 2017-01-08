import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaceCard from './PlaceCard'

import PLACES from '../constants/places';

import scrollTo from './scrollTo';

class DetailsPanel extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.setScrollHandlerEnabled = this.setScrollHandlerEnabled.bind(this);


    this.cards = [];

    this.previousScrollTop = 0;
    this._isScrollHandlerEnabled = false;
    this._autoScrollCount = 0;

    this.cardTops = [];
    this.cardBottoms = [];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selectedIndex !== this.props.selectedIndex;
  }

  render() {
    return (
      <div className="details">
        <div>
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
      </div>
    );
  }

  setScrollHandlerEnabled(enabled) {
    if (enabled && !this._isScrollHandlerEnabled) {
      document.addEventListener('scroll', this.handleScroll);
      this._isScrollHandlerEnabled = true;
    } else if (!enabled && this._isScrollHandlerEnabled) {
      document.removeEventListener('scroll', this.handleScroll);
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
    this.computeBreakpoints();
    if (this.props.selectedIndex !== prevProps.selectedIndex &&
        this.props.shouldScrollToSelected) {
      this.setScrollHandlerEnabled(false);
      this._autoScrollCount++;
      scrollTo(this.cardTops[this.props.selectedIndex], () => {
        this._autoScrollCount--;
        if (this._autoScrollCount == 0) {
          this.setScrollHandlerEnabled(true);
        }
      });
    }
  }

  computeBreakpoints() {
    this.cardTops = [];
    this.cardBottoms = [];
    this.cards.forEach((card) => {
      const cardEl = ReactDOM.findDOMNode(card);
      this.cardTops.push(cardEl.offsetTop);
      this.cardBottoms.push(cardEl.cardBottom + cardEl.clientHeight);
    });
  }

  handleScroll(event) {
    var el = window
    var direction = el.scrollY > this.previousScrollTop ? 'down' : 'up';
    this.previousScrollTop = el.scrollY;

    var viewBottom = el.scrollY + el.innerHeight;
    var viewTop = el.scrollY;

    var fullyVisible = [];
    var topVisible = [];
    var bottomVisible = [];
    for (let i = 0; i < this.cards.length; i++) {
      const cardEl = ReactDOM.findDOMNode(this.cards[i]);

      var cardBottom = cardEl.offsetTop + cardEl.clientHeight;
      var cardTop = cardEl.offsetTop + 40;

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

    console.log(fullyVisible, topVisible, bottomVisible, selectedIndex)
    this.props.onCardSelected(selectedIndex);
  }

}

export default DetailsPanel;
