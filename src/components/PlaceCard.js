import React, { Component } from 'react';

import PLACES from '../constants/places.js';

class PlaceCard extends Component {
  render(props) {
    const place = PLACES[this.props.index];
    return (
      <div className="place-card-wrapper" onClick={this.props.onClick}>
        <div className={`place-card selected-${this.props.isSelected}`}>
          <h2>
            {place.title}
          </h2>
          <div className="place-eta">{place.eta}</div>
          <img src={require(`../images/places/${place.id}.jpg`)} alt={place.id} />
          <div className="place-description">{place.description}</div>
          {place.developer && <div className="place-link"><a href={place.developer} target="_blank">Project site</a></div>}
          {place.news && <div className="place-link"><a href={place.news} target="_blank">News</a></div>}
        </div>
      </div>
    );
  }
}

export default PlaceCard;
