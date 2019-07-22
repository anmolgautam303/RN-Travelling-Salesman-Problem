import {
  FETCH_AUTO_COMPLETE_RESULTS,
  SET_SELECTED_DESTINATION,
  RESET_PREDICTION,
  REMOVE_DESTINATION
} from '../../src/constants/HomeConstants';
import * as actions from '../../src/actions/HomeAction';

it('creates an action to get auto complete results', () => {
  const input = 'Auckland';

  const expectedAction = { type: FETCH_AUTO_COMPLETE_RESULTS, payload: input };

  expect(actions.fetchAutoComplete(input)).toEqual(expectedAction);
});

it('creates an action to set selected destination', () => {
  const payload = [{ id: 1, placeId: "2skdfhaweih", title: 'Auckland' }];

  const expectedAction = { type: SET_SELECTED_DESTINATION, payload: payload };

  expect(actions.setSelectedDestination(payload)).toEqual(expectedAction);
});

it('creates an action to empty predictions array', () => {
  const expectedAction = { type: RESET_PREDICTION };

  expect(actions.resetPredictions()).toEqual(expectedAction);
});

it('creates an action to remove a destination from the array', () => {
  const payload = { id: 1 };

  const expectedAction = { type: REMOVE_DESTINATION, payload: payload };

  expect(actions.removeDestination(payload)).toEqual(expectedAction);
});
