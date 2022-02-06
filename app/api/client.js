import { create } from 'apisauce';

import settings from '../config/settings';

const apiClient = create({
  baseURL: settings.apiUrl
  // baseURL: 'http://10.0.0.122:3700/api/v1' // Local Dev
  // baseURL: 'http://toh-portal.ambitiousnerds.com:3700/api/v1' // Scoring Test
});

export default apiClient;