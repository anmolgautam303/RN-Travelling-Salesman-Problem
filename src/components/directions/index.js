import React, { Component } from 'react';
import {StyleSheet, Text, View, Alert, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

const initialLatitude = 37.33233141;
const initialLongitude = -122.0312186;
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

export default class Directions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: initialLatitude,
        longitude: initialLongitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
      },
      coordinates: null,
      distance: null,
      duration: null,
    };
  }

  componentDidMount() {
    this.props.getDirections(this.props.currentLocation, this.props.destinations);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.directions !== this.props.directions) {
      this.renderRoute(nextProps.directions)
        .then(result => {
          this.setState(result);
          this.onReady && this.onReady(result);
        })
        .catch(err => {
          Alert.alert(
              'Error',
              'Could not find directions',
              [
                {text: 'OK', onPress: () => this.props.navigation.goBack()},
              ],
              {cancelable: false},
          );
        });
    }
  }

  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 20),
        bottom: (height / 20),
        left: (width / 20),
        top: (height / 20),
      }
    });
  };

  decode = (t, e) => {
    let d = [];
    for (let n, o, u = 0, l = 0, r = 0, h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
      a = null, h = 0, i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
      do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
      o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c])
    }

    return d.map((t) => {
      return {
        latitude: t[0],
        longitude: t[1]
      }
    });
  };

  renderRoute = (directions) => {
    if (directions.routes.length === 0) {
      return Promise.reject();
    }

    const route = directions.routes[0];

    return Promise.resolve({
      distance: (route.legs.reduce((carry, curr) => {
        return carry + curr.distance.value;
      }, 0) / 1000).toFixed(2),
      duration: (route.legs.reduce((carry, curr) => {
        return carry + curr.duration.value;
      }, 0) / 60).toFixed(2),
      coordinates: this.decode(route.overview_polyline.points)
    });
  };

  render() {
    if (!this.state.coordinates) {
      return (
        <ActivityIndicator size="large" color="#4C4CFF" style={styles.loading}/>
      );
    }

    const { region, distance, duration, coordinates } = this.state;
    const { markerCoordinates, currentLocation } = this.props;

    return (
      <View style={styles.map}>
        <MapView
          ref={c => this.mapView = c}
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={this.onRegionChange}
        >
          {
            markerCoordinates.map((markerCoordinate, i) => {
              const coordinate = {
                latitude: markerCoordinate.lat,
                longitude: markerCoordinate.lng
              };

              return (
                <Marker
                  key={i}
                  coordinate={coordinate}
                  title={JSON.stringify(coordinate)}
                >
                  <MaterialCommunityIcons
                    style={styles.markerIcon}
                    name='map-marker'
                    size={32}
                  />
                </Marker>
              )
            })
          }
          <Marker
            coordinate={currentLocation}
            title={'My Location'}
          >
            <MaterialCommunityIcons
              style={styles.myMarkerIcon}
              name='map-marker'
              size={32}
            />
          </Marker>
          <MapView.Polyline coordinates={coordinates} {...this.props} />
        </MapView>
        <SafeAreaView style={styles.travelInfo}>
          <Text>{`Distance= ${distance}km & Duration= ${duration}m`}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1
  },
  map: {
    flex: 1
  },
  travelInfo: {
    margin: 20
  },
  markerIcon: {
    color: 'red'
  },
  myMarkerIcon: {
    color: 'green'
  }
});
