import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PlaceCard from './PlaceCard'

import PLACES from '../constants/places.js';

class DetailsPanel extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.cards = [];
    this.previousScrollTop = 0;
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
            index={index}
            key={index}
            isSelected={index === this.props.selectedIndex}
          />
        ))}
      </div>
    );
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedIndex !== prevProps.selectedIndex &&
        this.props.shouldScrollToSelected) {
      const card = this.cards[this.props.selectedIndex];
      ReactDOM.findDOMNode(card).scrollIntoView();
    }
  }

  handleScroll(event) {
    var BUFFER = 10;

    var el = ReactDOM.findDOMNode(this);
    var direction = el.scrollTop > this.previousScrollTop ? 'down' : 'up';
    this.previousScrollTop = el.scrollTop;

    var selectedIndex;
    for (let i = 0; i < this.cards.length; i++) {
      var cardEl = ReactDOM.findDOMNode(this.cards[i]);

      if (direction === 'down') {
        var cardBottom = cardEl.offsetTop + cardEl.clientHeight;
        var viewBottom = el.scrollTop + el.clientHeight;
        if (cardBottom <= viewBottom + BUFFER) {
          selectedIndex = i;
        }
      }

      if (direction === 'up') {
        var cardTop = cardEl.offsetTop;
        var viewTop = el.scrollTop;
        if (cardTop >= viewTop - BUFFER) {
          selectedIndex = i;
          break;
        }
      }
    }

    this.props.onCardSelected(selectedIndex);
  }
}

export default DetailsPanel;
