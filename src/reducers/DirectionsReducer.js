import {
  SET_COORDINATE,
  SET_DIRECTIONS
} from "../constants/DirectionsConstants";

const initialState = {
  directions: [],
  markerCoordinates: []
};

const DirectionsReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_DIRECTIONS:
      return {
        ...state,
        directions: action.payload
      };
    case SET_COORDINATE:
      return {
        ...state,
        markerCoordinates: [...state.markerCoordinates, action.payload]
      };
    default:
      return state;
  }
};

export default DirectionsReducer;
