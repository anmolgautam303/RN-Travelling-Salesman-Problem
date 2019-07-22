import React, { Component } from 'react';
import { connect } from 'react-redux';

import DirectionsComponent from '../components/directions';
import {
  getDirections
} from '../actions/DirectionsAction';

class DirectionsContainer extends Component {
  static navigationOptions = {
    title: __DEV__ ? "DEV Update location" : "Directions"
  };

  render() {
    return (
      <DirectionsComponent
        {...this.props}
        directions={this.props.directions}
        getDirections={this.props.getDirections}
        destinations={this.props.destinations}
        currentLocation={this.props.currentLocation}
        markerCoordinates={this.props.markerCoordinates}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    directions: state.directionsReducer.directions,
    markerCoordinates: state.directionsReducer.markerCoordinates,
    destinations: state.homeReducer.destinations,
    currentLocation: state.fullScreenMapReducer.currentLocation
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getDirections: (currentLocation, destinations) => { dispatch(getDirections({ currentLocation, destinations })) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectionsContainer)
