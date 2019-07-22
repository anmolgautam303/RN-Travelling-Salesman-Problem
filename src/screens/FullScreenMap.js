import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  setCurrentLocation
} from '../actions/FullScreenMapAction';
import FullScreenMapComponent from '../components/fullScreenMap';

class FullScreenMapContainer extends Component {
  static navigationOptions = {
    title: __DEV__ ? "DEV Update location" : "Update location"
  };

  render() {
    return (
      <FullScreenMapComponent
        {...this.props}
        setCurrentLocation={this.props.setCurrentLocation}
        currentLocation={this.props.currentLocation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.fullScreenMapReducer.currentLocation
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentLocation: (currentLocation) => { dispatch(setCurrentLocation(currentLocation)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FullScreenMapContainer)
