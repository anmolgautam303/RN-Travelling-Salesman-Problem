import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import SwipeOut from 'react-native-swipeout';
import Feather from 'react-native-vector-icons/Feather';

class CustomGooglePlacesAutocomplete extends Component {
  state = {
    searchText: ''
  };

  renderRow(row) {
    let swipeOutButton = [{
      text: 'Delete',
      type: 'delete',
      backgroundColor: 'red',
      onPress: () => {
        this.props.removeDestination(row.item.place_id);
      }
    }];

    return (
      <SwipeOut left={swipeOutButton}>
        <View style={styles.row}>
          <Text style={styles.text}>{`(${row.index + 1})`}</Text>
          <View style={styles.address}>
            <Text style={styles.text}>{row.item.structured_formatting.main_text}</Text>
            <Text style={styles.subText}>{row.item.structured_formatting.secondary_text}</Text>
          </View>
        </View>
      </SwipeOut>
    )
  }

  render() {
    const { destinations, navigation } = this.props;
    const buttonDisabled = destinations.length === 0;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Destinations</Text>
          <TouchableOpacity
            disabled={buttonDisabled}
            style={[styles.button, { opacity: buttonDisabled? 0.6 : 1 }]}
            onPress={() => navigation.push('Directions')}
          >
            <Feather style={styles.rightIcon} name='corner-up-right' size={32} />
            <Text style={styles.buttonText}>DIRECTIONS</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={destinations}
          ListEmptyComponent={<Text style={styles.destinationPlaceHolder}>No destinations are added</Text>}
          keyExtractor={row => row.place_id}
          renderItem={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
    width: '100%'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3F508B',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5
  },
  rightIcon: {
    fontSize: 15,
    color: 'white'
  },
  buttonText: {
    fontSize: 12,
    color: 'white'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 10,
    backgroundColor: 'white'
  },
  destinationPlaceHolder: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20
  },
  text: {
    fontSize: 18
  },
  address: {
    marginLeft: 10
  },
  subText: {
    fontSize: 12,
    color: 'gray'
  }
});

export default CustomGooglePlacesAutocomplete;
