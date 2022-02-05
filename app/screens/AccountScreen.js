import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';


function AccountScreen(props) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.container}>
      <Text style={styles.titleText}>User Profile</Text>
      <Text style={styles.riderName}>{user.FirstName} {user.LastName}</Text>
      <Text style={styles.flag}>Flag #{user.FlagNumber}</Text>
      <Text>&nbsp;</Text>
      <Text style={styles.text}>Zip Code: {user.ZipCode}</Text>
      <Text style={styles.text}>Email: {user.Email}</Text>
      <View style={styles.changesTextContainer}>
        <AppText>To make changes to your User Profile, please login to the Scoring Portal.</AppText>
      </View>
      <View style={styles.logoutButtonContainer}>
        <AppButton title="Log Out" onPress={() => logOut()}/>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingLeft: 10,
  },
  changesTextContainer: {
    margin: 10
  },
  flag :{
    fontSize: 14,
  },
  logoutButtonContainer: {
    paddingHorizontal: 20,
    width: "100%"
  },
  riderName: {
    fontSize: 24,
    fontWeight: "500",
  },
  text: {
    fontSize: 18,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "600",
    marginBottom: 20
  }
});

export default AccountScreen;