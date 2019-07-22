import {
  SET_CURRENT_LOCATION
} from "../constants/FullScreenMapConstants";

const latitudeDelta= 0.0922;
const longitudeDelta= 0.0421;

const initialState = {
  currentLocation: {
    latitude: null,
    longitude: null,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta
  },
};

const FullScreenMapReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      };
    default:
      return state;
  }
};

export default FullScreenMapReducer;
