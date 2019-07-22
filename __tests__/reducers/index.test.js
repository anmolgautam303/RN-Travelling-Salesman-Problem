import rootReducer from '../../src/reducers';

describe('rootReducer', () => {

  it('initialises the default state', () => {
    expect(rootReducer({}, {})).toEqual({
      "directionsReducer": {
        "directions": [],
        "markerCoordinates": [],
      },
      "fullScreenMapReducer": {
        "currentLocation": {
          "latitude": null,
          "latitudeDelta": 0.0922,
          "longitude": null,
          "longitudeDelta": 0.0421,
        },
      },
      "homeReducer": {
        "predictions": [],
        "destinations": []
      }
    });
  });
});
