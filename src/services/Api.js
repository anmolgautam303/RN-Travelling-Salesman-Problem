import apisauce from 'apisauce';

const GOOGLE_API_KEY = 'AIzaSyAzABPCPI2H-cWRvL5Hb36N44MsD8K7Vc4';

const create = (baseURL = 'http://localhost:3000') => {

  const api = apisauce.create({
    baseURL,
    timeout: 5000
  });


  const callAutoCompleteResultsApi = async (input) => {
    return await api.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}`);
  };

  const retrieveAddressWithPlaceId = async (placeId) => {
    return await api.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY}`);
  };

  const callGetDirectionApi = async ({ currentLocation, destinations }) => {
    const filteredDestination = [];
    await destinations.forEach(destination => {
      filteredDestination.push(destination.description);
    });

    return await api.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude}, ${currentLocation.longitude}&destination=${currentLocation.latitude}, ${currentLocation.longitude}&waypoints=optimize:true|${filteredDestination.join("|")}&sensor=false&key=${GOOGLE_API_KEY}`);
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
