import React from 'react';
import * as Application from 'expo-application';
import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';

import colors from '../config/colors';
import MiniAppButton from '../components/MiniAppButton';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

function AccountScreen(props) {
  const { user, logOut } = useAuth();
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;
  const appVersion = Application.nativeApplicationVersion;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={[{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }, themeContainerStyle]}>
        <View style={[styles.topContainer, themeContainerStyle]}>
          <View style={styles.nameLogOutRow}>
            <View style={styles.nameAndFlagContainer}>
              <Text style={[styles.riderName, themeTextStyle]}>{user.FirstName} {user.LastName}</Text>
              <Text style={[styles.flag, themeTextStyle]}>Flag #{user.FlagNumber}</Text>
            </View>
            <View style={styles.logoutButtonContainer}>
              <MiniAppButton title="Log Out" onPress={() => logOut()} />
            </View>
          </View>

        </View>
        <View style={[styles.bottomContainer, themeContainerStyle]}>
          <View style={styles.appInfoRow}>
            <Text style={[styles.copyright, themeTextStyle]}>&copy;2026 ambitiousNerds</Text>
            <Text style={[styles.appInfo, themeTextStyle]}>Version {appVersion}</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  appInfo: {
    fontSize: 12,
  },
  appInfoRow: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4
  },
  bottomContainer: {
    marginTop: 40,
  },
  copyright: {
    fontSize: 10,
  },
  darkContainer: {
    backgroundColor: colors.black
  },
  darkTextStyle: {
    color: colors.light
  },
  flag: {
    fontSize: 20,
  },
  label: {
    alignItems: 'flex-start',
    fontSize: 18,
  },
  lightContainer: {
    backgroundColor: colors.background
  },
  lightTextStyle: {
    color: colors.dark
  },
  logoutButtonContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  nameAndFlagContainer: {
    flex: 2,
  },
  nameLogOutRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  riderName: {
    fontSize: 24,
    fontWeight: "500",
  },
  screen: {
    backgroundColor: colors.background,
  },
  suggestionsSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    alignItems: 'flex-end',
    fontSize: 18,
  },
  textRow: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  userDetailContainer: {
    marginVertical: 10
  },
});

export default AccountScreen;
