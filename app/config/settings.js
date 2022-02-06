import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'http://10.0.0.122:3700/api/v1'
  },
  test: {
    apiUrl: 'https://toh-portal.ambitiousnerds.com/api/v1'
  },  
  prod: {
    apiUrl: 'https://scoring.tourofhonor.com/api/v1'
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === 'test') return settings.staging;
  return settings.prod;
}

export default getCurrentSettings();