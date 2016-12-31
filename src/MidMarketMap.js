import React from 'react';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';
import MAP_STYLES from './mapstyles.js';

const MapBase = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={15}
    defaultCenter={{lat: 37.7805, lng: -122.4125}}
    onClick={props.onMapClick}
    defaultOptions={{styles: MAP_STYLES}}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker}
        label={(index + 1).toString()}
        onClick={() => props.onMarkerClick(index)}
        key={index}
      />
    ))}
  </GoogleMap>
));


const MidMarketMap = (props) => {
  return (
    <MapBase
      containerElement={
        <div className='map-container' />
      }
      mapElement={
        <div className='map-element' />
      }
      markers={props.markers}
      onMarkerClick={props.onMarkerClick}
    />
  );
};

export default MidMarketMap;
