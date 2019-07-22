  import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchAutoComplete,
  setSelectedDestination,
  resetPredictions,
  removeDestination
} from '../actions/HomeAction';
import {
  getCoordinate
} from '../actions/DirectionsAction';
import HomeComponent from '../components/home';
import { setCurrentLocation } from "../actions/FullScreenMapAction";

class HomeContainer extends Component {
  static navigationOptions = {
    header: !__DEV__ && null,
    title: "Running in DEV"
  };

  render() {
    return (
      <HomeComponent
        {...this.props}
        predictions={this.props.predictions}
        destinations={this.props.destinations}
        currentLocation={this.props.currentLocation}
        fetchAutoComplete={this.props.fetchAutoComplete}
        setSelectedDestination={this.props.setSelectedDestination}
        resetPredictions={this.props.resetPredictions}
        removeDestination={this.props.removeDestination}
        setCurrentLocation={this.props.setCurrentLocation}
        getCoordinate={this.props.getCoordinate}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    predictions: state.homeReducer.predictions,
    destinations: state.homeReducer.destinations,
    currentLocation: state.fullScreenMapReducer.currentLocation
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAutoComplete: (input) => { dispatch(fetchAutoComplete(input)) },
    setSelectedDestination: (destination) => { dispatch(setSelectedDestination(destination)) },
    resetPredictions: () => { dispatch(resetPredictions()) },
    removeDestination: (placeId) => { dispatch(removeDestination(placeId)) },
    setCurrentLocation: (currentLocation) => { dispatch(setCurrentLocation(currentLocation)) },
    getCoordinate: (placeId) => { dispatch(getCoordinate(placeId)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
