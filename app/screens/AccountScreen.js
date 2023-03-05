import React from 'react';
import * as Application from 'expo-application';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as Linking from 'expo-linking';


import colors from '../config/colors';
import MiniAppButton from '../components/MiniAppButton';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';
import MiniHeading from '../components/MiniHeading';

function AccountScreen(props) {
  const { user, logOut } = useAuth();
  const appVersion = Application.nativeApplicationVersion;
  const ANDROID_URL = 'https://improveloop.com/loop/aTOH';
  const IPHONE_URL = 'https://improveloop.com/loop/iTOH';
  
  console.log(user);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>
        <View style={styles.topContainer}>
          <View style={styles.nameLogOutRow}>
            <View style={styles.nameAndFlagContainer}>
              <Text style={styles.riderName}>{user.FirstName} {user.LastName}</Text>
              <Text style={styles.flag}>Flag #{user.FlagNumber}</Text>
            </View>
            <View style={styles.logoutButtonContainer}>
              <MiniAppButton title="Log Out" onPress={() => logOut()}/>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>

          <View style={styles.faqSection}>
            <MiniHeading>Icon Legend</MiniHeading>
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

          <View style={styles.suggestionsSection}>
            {(Platform.OS === 'android') ? 
              <MiniAppButton color="secondary" title="Suggest an Improvement" onPress={() => Linking.openURL(ANDROID_URL)}/>
              : 
              <MiniAppButton color="secondary" title="Suggest an Improvement" onPress={() => Linking.openURL(IPHONE_URL)}/>
            }
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.appInfoRow}>
            <Text style={styles.copyright}>&copy;2021-2023 ambitiousNerds</Text>
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
  faqSection: {
    marginTop: 10,
    marginRight: 10,
    paddingRight: 10
  },
  flag :{
    fontSize: 20,
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
  label: {
    alignItems: 'flex-start',
    fontSize: 18,
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
  suggestionsSection:{
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
