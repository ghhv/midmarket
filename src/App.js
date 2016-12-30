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
      <div>
        <h2>{place.title}</h2>
        <div>{place.address}</div>
        <div>{place.description}</div>
        <div><a href={place.link}>Learn more</a></div>
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
            <h1>midmarket rising</h1>
            <p className="subtitle">developments in and around sf civic center</p>
          </div>
        </header>
        <main>
          <MidMarketMap
            markers={MARKERS}
            onMarkerClick={this.handleMarkerClick}
          />
          <div className="details">
            Details
            {this.state.selectedIndex >= 0 && <PlaceDetails index={this.state.selectedIndex} />}
          </div>
        </main>
        <footer>
          Thanks for stopping by!
        </footer>
      </div>
    );
  }

  handleMarkerClick(index) {
    this.setState({selectedIndex: index});
  }
}

export default App;
