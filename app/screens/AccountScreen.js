import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import profiles from '../api/profiles';
import Screen from '../components/Screen';
import useApi from '../hooks/useApi';

function AccountScreen(props) {
  const id = 1; // This should be programatically set to the user's id
  const getUserProfileApi = useApi(profiles.getUserProfile);
  const profileData = getUserProfileApi.data;

  useEffect(() => {
    getUserProfileApi.request(id);
  }, []);

  return (
    <Screen style={styles.container}>
      {getUserProfileApi.error && (
        <>
          <AppText>Couldn't retrieve user profile.</AppText>
          <AppButton title="Retry" onPress={getUserProfileApi.request}/>
        </>
      )}
      <Text style={styles.riderName}>{profileData.FirstName} {profileData.LastName}</Text>
      <Text style={styles.flag}>Flag #{profileData.FlagNumber}</Text>
      <Text>&nbsp;</Text>
      <Text style={styles.text}>Username: {profileData.UserName}</Text>
      <Text style={styles.text}>Zip Code: {profileData.ZipCode}</Text>

    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingLeft: 10,
  },
  flag :{
    fontSize: 14,
  },
  riderName: {
    fontSize: 24,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
  }
});

export default AccountScreen;