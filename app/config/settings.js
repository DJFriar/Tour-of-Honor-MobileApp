import { Platform } from 'react-native';
import Constants from 'expo-constants';

const devHost =
  process.env.EXPO_PUBLIC_TOH_DEV_HOST ||
  (Platform.OS === 'android' ? '10.0.2.2' : 'localhost');

const settings = {
  dev: {
    apiUrl: process.env.EXPO_PUBLIC_TOH_API_URL || `http://${devHost}:3000/api/v1`,
    statusBarColor: 'orange',
  },
  test: {
    apiUrl: 'https://test.tourofhonor.com/api/v1',
    statusBarColor: 'blue',
  },
  prod: {
    apiUrl: 'https://www.tourofhonor.com/api/v1',
    statusBarColor: '#c0dffd',
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.expoConfig.releaseChannel === 'test') return settings.test;
  return settings.prod;
}

export default getCurrentSettings();
