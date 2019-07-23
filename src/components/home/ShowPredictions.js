// @flow
import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification'
// import { Notifications } from "expo";

type Props = {
  setSelectedDestination: Function,
  resetPredictions: Function,
  getCoordinate: Function,
  predictions: Array<any>
};

type State = {
  notifText: string
};

class CustomGooglePlacesAutocomplete extends Component<Props, State> {
  scheduleNotification = async (notifText: string) => {
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotificationSchedule({
      title: `Last address added: ${notifText}`,
      message: `Time: ${new Date().toLocaleTimeString()}`,
      date: new Date(Date.now() + (300 * 1000)) // in 5 min
    });
  };

  render () {
    const {
      predictions,
      setSelectedDestination,
      resetPredictions,
      getCoordinate
    } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={predictions}
          ListEmptyComponent={<Text style={styles.destinationPlaceHolder}>No predictions</Text>}
          keyExtractor={row => row.place_id}
          renderItem={(row) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                setSelectedDestination(row.item);
                resetPredictions();
                getCoordinate(row.item.place_id);
                this.scheduleNotification(row.item.structured_formatting.main_text);
              }}
            >
              <View style={styles.addressContainer}>
                <MaterialIcons style={styles.addIcon}
                  name='add-circle'
                  size={32}
                />
                <View>
                  <Text style={styles.text}>{`${row.item.structured_formatting.main_text}`}</Text>
                  <Text style={styles.subText}>{`${row.item.structured_formatting.secondary_text}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  // senderID: 'YOUR GCM (OR FCM) SENDER ID',

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '80%'
  },
  destinationPlaceHolder: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  row: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
    backgroundColor: 'white'
  },
  addressContainer: {
    flexDirection: 'row'
  },
  addIcon: {
    color: '#4795A2',
    marginRight: 10
  },
  text: {
    fontSize: 18
  },
  subText: {
    fontSize: 12,
    color: 'gray'
  }
});

export default CustomGooglePlacesAutocomplete;
