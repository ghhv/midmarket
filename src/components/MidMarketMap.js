import React, { Component } from 'react';
import { GoogleMap, Polygon, withGoogleMap } from 'react-google-maps';
import MAP_STYLES from '../constants/mapstyles.js';

import PLACES from '../constants/places.js';

const MapBase = withGoogleMap(props => (
  <GoogleMap
    ref={props.handleRef}
    zoom={props.zoom}
    center={props.center}
    onZoomChanged={props.onZoomChanged}
    defaultOptions={{
      disableDefaultUI: true,
      zoomControl: true,
      scrollwheel: false,
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


function getCenter(coords) {
  const lngs = coords.map(c => c.lng);
  const lats = coords.map(c => c.lat);
  lats.sort();
  lngs.sort();
  const lowX = lats[0];
  const highX = lats[coords.length - 1];
  const lowY = lngs[0];
  const highY = lngs[coords.length - 1];
  const centerX = lowX + ((highX - lowX) / 2);
  const centerY = lowY + ((highY - lowY) / 2);
  return {lat: centerX, lng: centerY};
}

class MidMarketMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.7805, lng: -122.4125},
      zoom: 16
    };
  }

  render() {
    return (
      <MapBase
        containerElement={
          <div className='map-container' />
        }
        mapElement={
          <div className='map-element' />
        }
        center={this.state.center}
        zoom={this.state.zoom}
        handleRef={map => { this.map = map; }}
        onZoomChanged={() => {
          this.setState({zoom: this.map.getZoom()});
        }}
        selectedIndex={this.props.selectedIndex}
        onPlaceClick={this.props.onPlaceClick}
      />
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (window.google &&
        this.props.selectedIndex !== prevProps.selectedIndex &&
        this.props.shouldCenterSelected) {
      const place = PLACES[this.props.selectedIndex];
      const coords = JSON.parse(place.coords);
      const isVisible = coords.every((coord) => {
        return this.map.getBounds().contains(coord);
      })
      if (!isVisible) {
        this.setState({
          center: getCenter(coords),
          zoom: 16
        });
      }
    }
  }
};

export default MidMarketMap;
