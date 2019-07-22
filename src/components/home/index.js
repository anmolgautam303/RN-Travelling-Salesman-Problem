import React, { Component } from 'react';
import { StyleSheet, View, Alert, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomGooglePlacesAutocomplete from './CustomGooglePlacesAutocomplete';
import Destinations from './Destinations';
import ShowPredictions from './ShowPredictions';

const latitude = -36.852095;
const longitude = 174.7631803;
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      openSuggestionView: false
    };
  }

  componentDidMount() {
    this.checkForPermission();
  }

  setRegionOnError = () => {
    const region = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta
    };

    this.props.setCurrentLocation(region);
  };

  getLocationAsync = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta,
        longitudeDelta
      };

      this.props.setCurrentLocation(region);
    }, (error) => {
      console.log(error);
      this.setRegionOnError();
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  };

  checkForPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getLocationAsync();
      }
      else {
        this.setRegionOnError();

        Alert.alert(
            'Error',
            'Permission to access location was denied',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]
        );
      }
    } else {
      this.getLocationAsync();
    }
  };

  toggleOpenSuggestionView = (openSuggestionView = false) => {
    this.setState({ openSuggestionView });
  };

  render() {
    const { predictions, currentLocation } = this.props;

    if (!currentLocation.latitude) {
      return null;
    }

    return (
      <View style={styles.wrapper}>
        <MapView
          scrollEnabled={false}
          style={styles.map}
          region={currentLocation}
        >
          <Marker
            coordinate={currentLocation}
            title='My location'
          >
            <MaterialCommunityIcons
              style={styles.markerIcon}
              name='map-marker'
              size={32}
            />
          </Marker>

          <View style={styles.iconContainer}>
            <MaterialIcons
              style={styles.icon}
              name="my-location"
              color="white"
              size={32}
              onPress={() => this.props.navigation.push('FullScreenMap')}
            />
          </View>
        </MapView>

        <Destinations
          {...this.props}
        />
        <CustomGooglePlacesAutocomplete
          {...this.props}
          toggleOpenSuggestionView={this.toggleOpenSuggestionView}
        />
        {
          predictions.length > 0
            && (
              <ShowPredictions
                {...this.props}
                toggleOpenSuggestionView={this.toggleOpenSuggestionView}
              />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column'
  },
  map: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  icon: {
    // backgroundColor: 'red'
    marginHorizontal: 10,
    marginVertical: 10,
  },
  iconContainer: {
    backgroundColor: 'rgba(70,130,180, 0.7)',
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgb(70,130,180)'
  },
  markerIcon: {
    color: 'red'
  },
});
