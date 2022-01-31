import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';

function MemorialSubmitScreen({ navigation, route }) {
  const memorialCode = route.params.code;
  const imageURL = "https://www.tourofhonor.com/2022appimages/" + route.params.sampleImage;
  
  return (
    <Screen>
      <View style={styles.container}>
        <AppText>This the submit modal for {memorialCode}</AppText>
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{uri: imageURL}} />
        </View>
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
});

export default MemorialSubmitScreen;