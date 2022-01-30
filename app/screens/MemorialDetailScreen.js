import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';

function MemorialDetailScreen({ route }) {
  const memorialID = route.params.id;
  return (
    <Screen>
      <View style={styles.container}>
        <AppText>Memorial Details for Memorial # {memorialID} go here.</AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 8,
  },
  infoIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 6,
  },
  memorialCityState: {
    fontSize: 16
  },
  memorialCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  memorialCodeText: {
    fontSize: 16,
  },
  memorialName: {
    fontSize: 20,
    fontWeight: "600"
  },
  memorialNameContainer: {
    flex: 1,
  },
  metadataDetailContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sampleImage: {
    borderRadius: 10,
    height: 270,
    width: 360,
  },
  sampleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    paddingTop: 10,
  },
  statusIcons: {
    alignItems: 'flex-end',
    padding: 2,
    paddingRight: 6,
  },
  submitButtonContainer: {
    marginHorizontal: 25,
  },
  topDetailInfo: {
    flexDirection: 'row',
    paddingLeft: 10
  },
});

export default MemorialDetailScreen;