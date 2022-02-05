import apiClient from "./client";

const endpoint = '/memorial';

const getMemorialDetails = (id) => apiClient.get(endpoint + '/data/' + id);
const getMemorialMetadata = (id) => apiClient.get(endpoint + '/text/' + id);
const getMemorialList = () => apiClient.get(endpoint + '-list');


export default {
  getMemorialDetails,
  getMemorialMetadata,
  getMemorialList,
};