import FullScreenMapReducer from '../../src/reducers/FullScreenMapReducer';
import {
  SET_CURRENT_LOCATION
} from '../../src/constants/FullScreenMapConstants';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

describe('FullScreenMapReducer', () => {
  const coordinates = { latitude: -12332234, longitude: 12332234, latitudeDelta, longitudeDelta };

  it('adds new employee to redux store', () => {
    let state = {
      latitude: null,
      longitude: null,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    };

    state = FullScreenMapReducer(state,{ type: SET_CURRENT_LOCATION, payload: coordinates });
    expect(state.currentLocation).toEqual(coordinates )
  });
});
