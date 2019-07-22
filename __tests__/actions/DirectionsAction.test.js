import {
  GET_DIRECTIONS,
  GET_COORDINATE
} from '../../src/constants/DirectionsConstants';
import * as actions from '../../src/actions/DirectionsAction';

it('creates an action to get direction', () => {
  const payload = {
    currentLocation: { latitude: -12332234, longitude: 12332234 }, destinations: [{ id: 1, placeId: "2skdfhaweih" }]
  };

  const expectedAction = { type: GET_DIRECTIONS, payload: payload };

  expect(actions.getDirections(payload)).toEqual(expectedAction);
});

it('creates an action to get coordinates', () => {
  const coordinates = { latitude: -12332234, longitude: 12332234 };

  const expectedAction = { type: GET_COORDINATE, payload: coordinates };

  expect(actions.getCoordinate(coordinates)).toEqual(expectedAction);
});
