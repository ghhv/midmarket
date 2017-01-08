import React, { Component } from 'react';

import PLACES from '../constants/places.js';


const getLink = (url, label) => {
  return (
    <div className="place-link">
      <a href={url} target="_blank">{label}</a>
    </div>);
}

const getImage = (id) => {
  return require(`../images/places/${id}.jpg`);
}

const getPlanningUrl = (query) => {
  return 'http://propertymap.sfplanning.org/?search=' + query;
}

const getNewsUrl = (query) => {
  return 'https://www.google.com/search?tbm=nws&q=' + query;
}


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
          <img src={getImage(place.id)} alt={place.id} />
          <div className="place-description">{place.description}</div>
          {place.developer &&
              getLink(place.developer, 'Project')}
          {getLink(getNewsUrl(place.title + ' San Francisco'), 'News')}
          {place.address &&
              getLink(getPlanningUrl(place.address), 'SF Planning')}
        </div>
      </div>
    );
  }
}

export default PlaceCard;
