import { Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';

import { SET_PREDICTIONS } from '../constants/HomeConstants';
import { SET_DIRECTIONS, SET_COORDINATE } from '../constants/DirectionsConstants';
import Api from '../services/Api';

const api = Api.create();

export function* fetchAutoCompleteResults(action) {
  try {
    const response = yield call(api.callAutoCompleteResultsApi, action.payload);
    console.log('callAutoCompleteResultsApi', response);
    if(response.ok) {
      yield put({ type: SET_PREDICTIONS, payload: response.data.predictions });
    } else {
      Alert.alert(
        'Error',
        'Could not fetch auto complete results.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  } catch (error) {
    console.log('error happened', error);
  }
}

export function* fetchDirections(action) {
  try {
    const response = yield call(api.callGetDirectionApi, action.payload);
    if(response.ok) {
      yield put({ type: SET_DIRECTIONS, payload: response.data });
    } else {
      Alert.alert(
        'Error',
        'Could not fetch direction',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  } catch (error) {
    console.log('error happened', error);
  }
}

export function* getCoordinatesFromPlaceId(action) {
  try {
    const response = yield call(api.retrieveAddressWithPlaceId, action.payload);
    if(response.ok) {
      yield put({ type: SET_COORDINATE, payload: response.data.result.geometry.location });
    } else {
      Alert.alert(
        'Error',
        'Could not get coordinate',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  } catch (error) {
    console.log('error happened', error);
  }
}
