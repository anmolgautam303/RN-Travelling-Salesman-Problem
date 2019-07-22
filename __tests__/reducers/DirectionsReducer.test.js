import DirectionsReducer from '../../src/reducers/DirectionsReducer';
import {
  SET_COORDINATE,
  SET_DIRECTIONS
} from '../../src/constants/DirectionsConstants';

describe('DirectionsReducer', () => {
  it('adds directions to redux store', () => {
    const directions = { id: 1, placeId: "2skdfhaweih" };
    let state = {
      directions: [directions]
    };

    state = DirectionsReducer(state,{ type: SET_DIRECTIONS, payload: directions });
    expect(state.directions).toEqual(directions)
  });

  it('sets marker coordinates to redux store', () => {
    const coordinates = { latitude: -12332234, longitude: 12332234 };
    let emptyState = {
      markerCoordinates: []
    };

    emptyState = DirectionsReducer(emptyState,{ type:SET_COORDINATE, payload: coordinates });
    expect(emptyState.markerCoordinates).toEqual([coordinates] )
  });
});
