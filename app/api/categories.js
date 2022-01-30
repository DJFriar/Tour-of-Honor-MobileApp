import apiClient from "./client";

const endpoint = '/categories';

const getCategories = () => apiClient.get(endpoint);

export default {
  getCategories,
};