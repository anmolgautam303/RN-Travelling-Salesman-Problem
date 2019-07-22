import { takeLatest } from 'redux-saga/effects'

import {
  FETCH_AUTO_COMPLETE_RESULTS,
} from '../constants/HomeConstants';
import {
  GET_DIRECTIONS,
  GET_COORDINATE
} from "../constants/DirectionsConstants";
import {
  fetchAutoCompleteResults,
  fetchDirections,
  getCoordinatesFromPlaceId
} from './HomeSaga';

function* Saga() {
  yield takeLatest(FETCH_AUTO_COMPLETE_RESULTS, fetchAutoCompleteResults);
  yield takeLatest(GET_DIRECTIONS, fetchDirections);
  yield takeLatest(GET_COORDINATE, getCoordinatesFromPlaceId);
}

export default Saga;
