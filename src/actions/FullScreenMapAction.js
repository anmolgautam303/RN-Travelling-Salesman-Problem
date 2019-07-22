import {
  SET_CURRENT_LOCATION
} from '../constants/FullScreenMapConstants';

export const setCurrentLocation = payload => {
  return {
    type: SET_CURRENT_LOCATION,
    payload: payload
  }
};
