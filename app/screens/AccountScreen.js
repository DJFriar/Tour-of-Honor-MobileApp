import React from 'react';
import * as Application from 'expo-application';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

function AccountScreen(props) {
  const { user, logOut } = useAuth();
  const appVersion = Application.nativeApplicationVersion;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={styles.topContainer}>
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
          <View style={styles.faqSection}>
            <AppText style={{marginBottom: 10}}>Wondering what all the icons are on the memorial details? Below is a handy legend:</AppText>
            <View style={styles.iconDefinitionRow}>
              <FontAwesomeIcon icon={['far', 'clock']} size={25} />
              <Text style={styles.iconDefinition}>This memorial has been submitted and is awaiting review.</Text>
            </View>
            <View style={styles.iconDefinitionRow}>
              <FontAwesomeIcon icon={['fas', 'shield-check']} size={25} color={'green'} />
              <Text style={styles.iconDefinition}>This memorial submission has been scored and approved. Congrats!</Text>
            </View>
            <View style={styles.iconDefinitionRow}>
              <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={25} color={'red'} />
              <Text style={styles.iconDefinition}>This memorial submission has been rejected. Check your email for details. You may resubmit this at anytime.</Text>
            </View>
            <View style={styles.iconDefinitionRow}>
              <FontAwesomeIcon icon={['far', 'images']} size={25} />
              <Text style={styles.iconDefinition}>This memorial requires two images. See the official rules for more details.</Text>
            </View>
            <View style={styles.iconDefinitionRow}>
              <FontAwesomeIcon icon={['fal', 'map-signs']} size={25} />
              <Text style={styles.iconDefinition}>Tap on this icon to get driving directions using your phone's default map app.</Text>
            </View>
            <View style={styles.iconDefinitionRow}>
              <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={25} color={'red'} />
              <Text style={styles.iconDefinition}>This memorial has a restriction. Scroll down the details to see what it is.</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.appInfoRow}>
            <Text style={styles.copyright}>&copy;2022 ambitiousNerds</Text>
            <Text style={styles.appInfo}>Version {appVersion}</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  appInfo:{
    fontSize: 12,
  },
  appInfoRow:{
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
  changesTextContainer: {
    margin: 10
  },
  faqSection: {
    marginTop: 20,
    marginRight: 10,
    paddingRight: 10
  },
  flag :{
    fontSize: 14,
  },
  iconDefinition: {
    fontSize: 14,
    paddingLeft: 8
  },
  iconDefinitionRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 6,
  },
  logoutButtonContainer: {
    width: "100%"
  },
  riderName: {
    fontSize: 24,
    fontWeight: "500",
  },
  screen: {
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
  },
  topContainer: {
    flex: 2,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
});

export default AccountScreen;