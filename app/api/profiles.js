import apiClient from "./client";

const endpoint = '/user';

const getUserProfile = (id) => apiClient.get(endpoint + '/' + id);

export default {
  getUserProfile,
};