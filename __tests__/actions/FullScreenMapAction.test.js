// /**
//  * @format
//  */
//
// import 'react-native';
// import React from 'react';
// import App from '../App';
//
// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
//
// it('renders correctly', () => {
//   renderer.create(<App />);
// });


import {
  SET_CURRENT_LOCATION
} from '../../src/constants/FullScreenMapConstants';
import * as actions from '../../src/actions/FullScreenMapAction';

it('creates an action to set current location', () => {
  const coordinates = { latitude: -12332234, longitude: 12332234 };

  const expectedAction = { type: SET_CURRENT_LOCATION, payload: coordinates };

  expect(actions.setCurrentLocation(coordinates)).toEqual(expectedAction);
});
