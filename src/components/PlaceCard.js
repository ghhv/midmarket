import React, { Component } from 'react';

import PLACES from '../constants/places.js';

class PlaceCard extends Component {
  render(props) {
    const place = PLACES[this.props.index];
    return (
      <div className="place-card-wrapper">
        <div className={`place-card selected-${this.props.isSelected}`}>
          <h2>
            <div className="index-label">{this.props.index + 1}</div>
            {place.title}
          </h2>
          <div className="place-eta">{place.eta}</div>
          <img src={require(`../images/places/${place.id}.jpg`)} alt={place.id} />
          <div className="place-description">{place.description}</div>
          <div className="place-link"><a href={place.link} target="_blank">Learn more</a></div>
        </div>
      </div>
    );
  }
}

export default PlaceCard;
