import React, { Component } from 'react';
import logo from './logo.png';

import MidMarketMap from './MidMarketMap.js'

import PLACES from './places.js';

const MARKERS = PLACES.map((place) => {
  return {
    position: {lat: place.lat, lng: place.lng},
    title: place.title
  }
})

class PlaceDetails extends Component {
  render(props) {
    const place = PLACES[this.props.index];
    return (
      <div className="place-card">
        <h2>
          <div className="index">{this.props.index + 1}</div>
          {place.title}
        </h2>
        <div className="place-eta">{place.eta}</div>
        <img src={`/images/${place.id}.jpg`} alt="image" />
        <div className="place-description">{place.description}</div>
        <div className="place-link"><a href={place.link} target="_blank">Learn more</a></div>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.state = {
      selectedIndex: -1
    }
  }

  render() {
    return (
      <div className="app-root">
        <header>
          <img src={logo} className="logo" alt="logo" />
          <div className="header-text">
            <h1>mid-market rising</h1>
            <p className="subtitle">developments in and around sf civic center</p>
          </div>
        </header>
        <main>
          <MidMarketMap
            markers={MARKERS}
            onMarkerClick={this.handleMarkerClick}
          />
          <div className="details">
            {PLACES.map((place, index) => (
              <PlaceDetails index={index} key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  handleMarkerClick(index) {
    this.setState({selectedIndex: index});
  }
}

export default App;
