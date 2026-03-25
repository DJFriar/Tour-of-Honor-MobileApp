import apiClient from './client';

const endpoint = '/categories';

const getCategories = async () => {
  const response = await apiClient.get(endpoint);
  if (!response.ok) return response;
  const raw = response.data?.categories ?? response.data;
  const list = Array.isArray(raw) ? raw : [];
  return {
    ...response,
    data: list.map((c) => ({
      id: c.id,
      Name: c.Name ?? c.name ?? '',
    })),
  };
};

export default {
  getCategories,
};
