import {
  SET_PREDICTIONS,
  SET_SELECTED_DESTINATION,
  RESET_PREDICTION,
  REMOVE_DESTINATION
} from "../constants/HomeConstants";

const initialState = {
  predictions: [],
  destinations: []
};

const mapViewReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_PREDICTIONS:
      return {
        ...state,
        predictions: action.payload
      };
    case SET_SELECTED_DESTINATION:
      return {
        ...state,
        destinations: [...state.destinations, action.payload]
      };
    case REMOVE_DESTINATION: {
      return {
        ...state,
        destinations: state.destinations.filter((prediction) => prediction.place_id !== action.payload)
      };
    }
    case RESET_PREDICTION:
      return {
        ...state,
        predictions: []
      };
    default:
      return state;
  }
};

export default mapViewReducer;
