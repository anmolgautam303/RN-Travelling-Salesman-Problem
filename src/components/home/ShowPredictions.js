import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { Notifications } from "expo";
// import * as Permissions from 'expo-permissions'

class CustomGooglePlacesAutocomplete extends Component {
  componentDidMount () {
    // this.askPermissions();
  }

  // askPermissions = async () => {
  //   const { status: existingStatus } = await Permissions.getAsync(
  //     Permissions.NOTIFICATIONS
  //   );
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== "granted") {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== "granted") {
  //     return false;
  //   }
  //   return true;
  // };

  // scheduleNotification = async (notifText) => {
  //   Notifications.cancelAllScheduledNotificationsAsync();
  //
  //   let notificationId = Notifications.scheduleLocalNotificationAsync(
  //       {
  //         title: `Last address added: ${notifText}`,
  //         body: `Time: ${new Date().toLocaleTimeString()}`
  //       },
  //       {
  //         repeat: "minute",
  //         time: new Date().getTime() + 500000
  //       }
  //   );
  //   console.log(notificationId);
  // };

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
                // this.scheduleNotification(row.item.structured_formatting.main_text);
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
