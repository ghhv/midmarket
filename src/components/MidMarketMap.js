import React, { Component } from 'react';
import { GoogleMap, Polygon, withGoogleMap } from 'react-google-maps';
import MAP_STYLES from '../constants/mapstyles.js';

import PLACES from '../constants/places.js';

const MapBase = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16}
    defaultCenter={{lat: 37.7805, lng: -122.4125}}
    onClick={props.onMapClick}
    defaultOptions={{
      disableDefaultUI: true,
      styles: MAP_STYLES
    }}
  >
    {PLACES.map((place, index) => {
      const isSelected = index === props.selectedIndex;
      return (<Polygon
        path={JSON.parse(place.coords)}
        defaultOptions={{
          strokeColor: '#0041C2',
          strokeOpacity: isSelected ? 1 : .5,
          strokeWeight: 2,
          fillColor: '#0041C2',
          fillOpacity: isSelected ? .5 : .1
        }}
        onClick={() => props.onPlaceClick(index)}
        key={index + isSelected.toString()}
      />);
    })}
  </GoogleMap>
));


class MidMarketMap extends Component {
  render() {
    return (
      <MapBase
        containerElement={
          <div className='map-container' />
        }
        mapElement={
          <div className='map-element' />
        }
        selectedIndex={this.props.selectedIndex}
        onPlaceClick={this.props.onPlaceClick}
      />
    );
  }
};

export default MidMarketMap;
