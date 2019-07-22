import {
  GET_DIRECTIONS,
  GET_COORDINATE
} from '../constants/DirectionsConstants';

export const getDirections = payload => {
  return {
    type: GET_DIRECTIONS,
    payload: payload
  }
};

export const getCoordinate = payload => {
  return {
    type: GET_COORDINATE,
    payload: payload
  }
};
