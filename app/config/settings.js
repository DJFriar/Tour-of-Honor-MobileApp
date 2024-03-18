import Constants from 'expo-constants';

const settings = {
  dev: {
    apiUrl: 'https://scoringtest.tourofhonor.com/api/v1',
    statusBarColor: 'orange',
  },
  test: {
    apiUrl: 'https://scoringtest.tourofhonor.com/api/v1',
    statusBarColor: 'blue',
  },  
  prod: {
    apiUrl: 'https://scoring.tourofhonor.com/api/v1',
    statusBarColor: '#c0dffd',
  },
}

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.expoConfig.releaseChannel === 'test') return settings.test;
  return settings.prod;
}

export default getCurrentSettings();
