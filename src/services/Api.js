import apisauce from 'apisauce';
import Config from "react-native-config";

const create = (baseURL = Config.GOOGLE_API) => {
  const api = apisauce.create({
    baseURL,
    timeout: 5000
  });

  const callAutoCompleteResultsApi = async (input) => {
    return await api.get(`/api/place/autocomplete/json?input=${input}&key=${Config.GOOGLE_API_KEY}`);
  };

  const retrieveAddressWithPlaceId = async (placeId) => {
    return await api.get(`/api/place/details/json?placeid=${placeId}&key=${Config.GOOGLE_API_KEY}`);
  };

  const callGetDirectionApi = async ({ currentLocation, destinations }) => {
    const filteredDestination = [];
    await destinations.forEach(destination => {
      filteredDestination.push(destination.description);
    });

    return await api.get(`/api/directions/json?origin=${currentLocation.latitude}, ${currentLocation.longitude}&destination=${currentLocation.latitude}, ${currentLocation.longitude}&waypoints=optimize:true|${filteredDestination.join("|")}&sensor=false&key=${Config.GOOGLE_API_KEY}`);
  };

  return {
    callAutoCompleteResultsApi,
    callGetDirectionApi,
    retrieveAddressWithPlaceId
  }
};

export default {
  create
}
