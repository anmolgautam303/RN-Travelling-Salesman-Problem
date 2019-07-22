// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  region: Object,
  navigation: Object,
  currentLocation: Object,
  setCurrentLocation: Function
};

type State = {
  region: Object
};

export default class FullScreenMap extends Component<Props, State> {
  state = {
    region: this.props.currentLocation
  };

  onRegionChange = (region: Object) => {
    this.setState({
      region
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  confirmPressed = () => {
    this.props.setCurrentLocation(this.state.region);
    this.goBack();
  };

  render() {
    const { region } = this.state;

    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChange}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress = {this.goBack}
          >
            <Text>CANCEL</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress = {this.confirmPressed}
          >
            <Text>CONFIRM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.marker}>
          <MaterialCommunityIcons
            style={styles.markerIcon}
            name='map-marker'
            size={32}
          />
        </View>
        <View style={styles.currentLocation}>
          <Text style={styles.text}>GPS Co-ordinates</Text>
          <Text style={styles.text}>{`${region.longitude}N ${region.latitude}E`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    marginVertical: 20,
    paddingVertical: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 20
  },
  marker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -32,
    marginLeft: -16
  },
  markerIcon: {
    color: 'red'
  },
  currentLocation: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 20,
    paddingHorizontal: 10,
    position: 'absolute',
    top: '37%',
    right: '5%',
    marginTop: -32,
    marginLeft: -16,
    borderRadius: 20
  },
  text: {
    color: 'white'
  }
});
