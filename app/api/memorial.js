import apiClient from "./client";

const endpoint = '/memorial';

const getMemorialDetails = (id) => apiClient.get(endpoint + '/data/' + id);
const getMemorialList = () => apiClient.get(endpoint + '-list');
const getMemorialMetadata = (id) => apiClient.get(endpoint + '/text/' + id);
const getMemorialStatus = (memID, userID) => apiClient.get(endpoint + '/status/' + memID + "/" + userID);


export default {
  getMemorialDetails,
  getMemorialList,
  getMemorialMetadata,
  getMemorialStatus,
};