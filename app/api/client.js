import { create } from 'apisauce';
import Constants from 'expo-constants';

import settings from '../config/settings';

const apiKey =
  process.env.EXPO_PUBLIC_TOH_API_KEY ||
  Constants.expoConfig?.extra?.tohApiKey ||
  '';

const apiClient = create({
  baseURL: settings.apiUrl,
  headers: apiKey ? { Authorization: apiKey } : {},
});

if (__DEV__ && !apiKey) {
  console.warn(
    '[TOH] No API key: set EXPO_PUBLIC_TOH_API_KEY or expo.extra.tohApiKey. ' +
      'Memorial list and other /api/v1 routes will return 403 without Authorization.'
  );
}

export default apiClient;
