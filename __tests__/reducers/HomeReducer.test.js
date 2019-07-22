import HomeReducer from '../../src/reducers/HomeReducer';
import {
  SET_PREDICTIONS,
  SET_SELECTED_DESTINATION,
  RESET_PREDICTION,
  REMOVE_DESTINATION
} from "../../src/constants/HomeConstants";

describe('DirectionsReducer', () => {
  it('set prediction to redux store', () => {
    const payload = { id: 1, placeId: "2skdfhaweih", title: 'Auckland' };
    let state = {
      predictions: []
    };

    state = HomeReducer(state,{ type: SET_PREDICTIONS, payload: payload });
    expect(state.predictions).toEqual(payload)
  });

  it('set selected destination to redux store', () => {
    const destination = { id: 1, placeId: "2skdfhaweih", title: 'Auckland' };
    let emptyState = {
      destinations: []
    };

    emptyState = HomeReducer(emptyState,{ type: SET_SELECTED_DESTINATION, payload: destination });
    expect(emptyState.destinations).toEqual([destination] )
  });

  it('remove destination from the redux store', () => {
    const destination = { id: 1, placeId: "2skdfhaweih", title: 'Auckland' };
    let state = {
      destinations: [
        { id: 1, placeId: "2skdfhaweih", title: 'Auckland' }
      ]
    };

    state = HomeReducer(state, { type: REMOVE_DESTINATION, payload: destination.placeId });
    expect(state.destinations).not.toContain(destination);
  });

  it('reset prediction and empty the array', () => {
    const destination = { id: 1, placeId: "2skdfhaweih", title: 'Auckland' };
    let state = {
      predictions: [destination]
    };

    state = HomeReducer(state, { type: RESET_PREDICTION });
    expect(state.predictions).toEqual([])
  });
});
