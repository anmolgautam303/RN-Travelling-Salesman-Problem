import {
  FETCH_AUTO_COMPLETE_RESULTS,
  SET_SELECTED_DESTINATION,
  RESET_PREDICTION,
  REMOVE_DESTINATION
} from '../constants/HomeConstants';

export const fetchAutoComplete = payload => {
  return {
    type: FETCH_AUTO_COMPLETE_RESULTS,
    payload: payload
  }
};

export const setSelectedDestination = payload => {
  return {
    type: SET_SELECTED_DESTINATION,
    payload: payload
  }
};

export const resetPredictions = () => {
  return {
    type: RESET_PREDICTION
  }
};

export const removeDestination = payload => {
  return {
    type: REMOVE_DESTINATION,
    payload: payload
  }
};
