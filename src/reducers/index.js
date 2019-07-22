import { combineReducers } from 'redux';
import homeReducer from '../reducers/HomeReducer';
import fullScreenMapReducer from '../reducers/FullScreenMapReducer';
import directionsReducer from '../reducers/DirectionsReducer';

const rootReducer = combineReducers({
  homeReducer,
  fullScreenMapReducer,
  directionsReducer
});

export default rootReducer;
