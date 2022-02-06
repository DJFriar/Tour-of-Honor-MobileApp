import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

function AccountScreen(props) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.container}>
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
        <AppText>Wondering what all the icons are on the memorial details? Below is a handy legend:</AppText>
        <View style={styles.iconDefinitionRow}>
          <MaterialCommunityIcons name='clock-outline' size={25} style={[styles.icon, {color: 'black'}]} />
          <Text style={styles.iconDefinition}>This memorial has been submitted and is awaiting review.</Text>
        </View>
        <View style={styles.iconDefinitionRow}>
          <MaterialCommunityIcons name='shield-check' size={25} style={[styles.icon, {color: 'green'}]} />
          <Text style={styles.iconDefinition}>This memorial has been scored and approved. Congrats!</Text>
        </View>
        <View style={styles.iconDefinitionRow}>
          <MaterialCommunityIcons name='image-multiple-outline' size={25} style={[styles.icon, {color: 'black'}]} />
          <Text style={styles.iconDefinition}>This memorial requires two images. See the official rules for more details.</Text>
        </View>
        <View style={styles.iconDefinitionRow}>
          <MaterialCommunityIcons name='alert-octagon-outline' size={25} style={[styles.icon, {color: 'red'}]} />
          <Text style={styles.iconDefinition}>This memorial has a restriction. Scroll down the details to see what it is.</Text>
        </View>
        <View style={styles.iconDefinitionRow}>
          <MaterialCommunityIcons name='map-search-outline' size={25} style={[styles.icon, {color: 'black'}]} />
          <Text style={styles.iconDefinition}>Tap on this icon to get driving directions using your phone's default map app.</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  changesTextContainer: {
    margin: 10
  },
  faqSection: {
    marginTop: 20,
    marginRight: 10,
  },
  flag :{
    fontSize: 14,
  },
  icon: {
    paddingRight: 8
  },
  iconDefinition: {
    fontSize: 14,
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
  text: {
    fontSize: 18,
  },
});

export default AccountScreen;