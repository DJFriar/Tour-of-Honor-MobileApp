import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, useWindowDimensions, useColorScheme, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import * as Linking from 'expo-linking';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import memorial from '../api/memorial';
import MetaHeading from '../components/MetaHeading';
import Screen from '../components/Screen';
import TappableIcon from '../components/TappableIcon';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

const lightTagsStyles = {
  body: {
    color: colors.dark,
  },
  p: {
    margin: 0,
    marginBottom: 12,
  }
};

const darkTagsStyles = {
  body: {
    color: colors.light,
  },
  p: {
    margin: 0,
    marginBottom: 12,
  }
};

function MemorialDetailScreen({ navigation, route }) {
  const { user, logOut } = useAuth();
  const isFocused = useIsFocused();

  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;
  const tagsStyles = colorScheme === 'light' ? lightTagsStyles : darkTagsStyles;

  const memorialID = route.params.id;
  let memorialStatus = {"ScorerNotes": "", "Status": 9};
  const getMemorialDetailsApi = useApi(memorial.getMemorialDetails);
  const memorialDetails = getMemorialDetailsApi.data[0] || {};
  const getMemorialMetadataApi = useApi(memorial.getMemorialMetadata);
  const memorialMetadata = getMemorialMetadataApi.data;
  const getMemorialStatusApi = useApi(memorial.getMemorialStatus);
  const memorialStatusApiResponse = getMemorialStatusApi.data[0] || {};
  if (memorialStatusApiResponse.Status < 9) { memorialStatus = memorialStatusApiResponse };

  const memorialLat = memorialDetails.Latitude;
  const memorialLong = memorialDetails.Longitude;
  const memorialCode = memorialDetails.Code;
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const gpsUrl = Platform.select({
    ios: `${scheme}${memorialCode}@${memorialLat},${memorialLong}`,
    android: `${scheme}${memorialLat},${memorialLong}(${memorialCode})`
  });
  const contentWidth = useWindowDimensions().width;
  const imageURL = "http://images.tourofhonor.com/SampleImages/" + memorialDetails.SampleImage;

  useEffect(() => {
    getMemorialDetailsApi.request(memorialID);
    getMemorialMetadataApi.request(memorialID);
    getMemorialStatusApi.request(memorialID, user.UserID);
  }, [isFocused]);

  return (
    <Screen hasNoHeader>
      {getMemorialDetailsApi.error && (
        <>
          <AppText>Couldn't retrieve memorial details.</AppText>
          <AppButton title="Retry" onPress={getMemorialDetailsApi.request}/>
        </>
      )}
      <ScrollView style={[styles.container, themeContainerStyle]}>

        {/* Top Section */}
        <View style={styles.topDetailInfo}>
          <View style={styles.memorialNameContainer}>
            <AppText style={[styles.memorialName, themeTextStyle]}>{memorialDetails.Name}</AppText>
            <AppText style={[styles.memorialCityState, themeTextStyle]}>{memorialDetails.City}, {memorialDetails.State}</AppText>
          </View>
          <View style={styles.statusIcons}>
            {memorialStatus.Status === 2 && <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={25} color={'red'} />}
            {memorialStatus.Status === 1 && <FontAwesomeIcon icon={['fas', 'shield-check']} size={25} color={'green'} />}
            {(memorialStatus.Status === 0 && colorScheme === 'light') && <FontAwesomeIcon icon={['far', 'clock']} size={25} /> }
            {(memorialStatus.Status === 0 && colorScheme === 'dark') && <FontAwesomeIcon icon={['far', 'clock']} size={25} color={'white'} /> }
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.memorialCodeContainer}>
          <AppText style={[styles.memorialCodeText, themeTextStyle]}>{memorialDetails.CategoryName}</AppText>
          <AppText style={[styles.memorialCodeText, themeTextStyle]}>{memorialDetails.Code}</AppText>
        </View>
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{uri: imageURL}} />
        </View>
        <View style={styles.infoIconsContainer}>
          {(memorialDetails.MultiImage > 0 && colorScheme === 'light') && <FontAwesomeIcon icon={['far', 'images']} size={35} />}
          {(memorialDetails.MultiImage > 0 && colorScheme === 'dark') && <FontAwesomeIcon icon={['far', 'images']} size={35} color={'white'} />}
          <TappableIcon iconFamily="fal" iconName="map-signs" onPress={() => {Linking.openURL(gpsUrl)}}/>
          {memorialDetails.Restrictions > 1 && <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={35} color={'red'} />}
          
        </View>
        <View style={styles.submitButtonContainer}>
          { memorialStatus.Status === 9 &&
            <AppButton title="Submit" onPress={() => 
              navigation.navigate('MemorialSubmitScreen', { 
                id: memorialID,
                name: memorialDetails.Name,
                code: memorialDetails.Code,
                multiImage: memorialDetails.MultiImage,
                sampleImage: memorialDetails.SampleImage
              })} 
            />
          }
          { memorialStatus.Status === 2 &&
            <>
              <View style={styles.disabledButtonContainer}>
                <AppText style={[styles.disabledButtonText, themeTextStyle]}>{memorialStatus.ScorerNotes}</AppText>
              </View>
              <AppButton title="Resubmit" onPress={() => 
                navigation.navigate('MemorialSubmitScreen', { 
                  id: memorialID,
                  name: memorialDetails.Name,
                  code: memorialDetails.Code,
                  multiImage: memorialDetails.MultiImage,
                  sampleImage: memorialDetails.SampleImage
                })} 
              />
            </>
          }
          { memorialStatus.Status === 1 &&
            <View style={styles.disabledButtonContainer}>
              <AppText style={[styles.disabledButtonText, themeTextStyle]}>You have already earned this memorial, congrats!</AppText>
            </View>
          }
          { memorialStatus.Status === 0 &&
            <View style={styles.disabledButtonContainer}>
              <AppText style={[styles.disabledButtonText, themeTextStyle]}>This memorial has been submitted and is awaiting review.</AppText>
            </View>
          }
        </View>

        {/* Bottom Section */}
        <View style={styles.metadataDetailContainer}>
          <MetaHeading style={themeTextStyle}>Access</MetaHeading>
          <AppText style={themeTextStyle}>{memorialDetails.Access}</AppText>
          {memorialMetadata.map(({id, Heading, Text}) => (
            <View key={id}>
              <MetaHeading style={themeTextStyle}>{Heading}</MetaHeading>
              <HTML 
                source={{ html: Text }} 
                contentWidth={contentWidth}
                tagsStyles={tagsStyles}
              />
            </View>
          ))}
        </View>
        <View style={styles.metadataDetailContainer}>
          <MetaHeading style={themeTextStyle}>Restrictions</MetaHeading>
          <AppText style={themeTextStyle}>{memorialDetails.RestrictionName}</AppText>
        </View>
        <View style={{paddingVertical: 10}}>
          <AppText>&nbsp;</AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 8,
  },
  darkContainer: {
    backgroundColor: colors.black
  },
  darkTextStyle: {
    color: colors.light
  },
  lightContainer: {
    backgroundColor: colors.background
  },
  lightTextStyle: {
    color: colors.dark
  },
  disabledButtonText: {
    padding: 10,
    textAlign: 'center',
  },
  disabledButtonContainer: {
    backgroundColor: '#6e696980',
    borderRadius: 25,
    marginTop: 10,
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
