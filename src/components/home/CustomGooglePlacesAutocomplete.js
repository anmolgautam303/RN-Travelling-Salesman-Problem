import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { debounce } from 'lodash';

class CustomGooglePlacesAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ''
    };

    this.debouncedCallFetchAutoCompletefunc = debounce(this.callFetchAutoCompleteFunc, 1000);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.searchString.length > 1 && nextState.searchString !== this.state.searchString) {
      this.debouncedCallFetchAutoCompletefunc(nextState.searchString);
    }
  }

  callFetchAutoCompleteFunc(searchString) {
    this.props.fetchAutoComplete(searchString);
  };

  render() {
    const {
      predictions,
      toggleOpenSuggestionView,
      resetPredictions
    } = this.props;
    const { searchString } = this.state;

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.searchSection}>
          <MaterialIcons
            style={styles.icon}
            name="search"
            color="green"
            size={32}
          />
          <TextInput
            ref="search_input"
            style={styles.textInput}
            onChangeText={searchString => this.setState({ searchString })}
            underlineColorAndroid="transparent"
            placeholder='Search here'
            onFocus={() => toggleOpenSuggestionView(true)}
            autoCorrect={false}
            value={searchString}
          />
          {
            predictions.length > 0
              && (
                <MaterialIcons
                  style={styles.icon}
                  name="close"
                  size={32}
                  color="green"
                  onPress={() => {
                    resetPredictions();
                    this.setState({ searchString: '' });
                    this.refs['search_input'].blur();
                  }}
                />
            )
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    marginTop: '5%'
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderColor: 'lightgray',
    borderWidth: 2
  },
  icon: {
    padding: 10,
    color: 'black'
  },
  textInput: {
    backgroundColor: 'white',
    flex: 1,
  }
});

export default CustomGooglePlacesAutocomplete;
