import React, { useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, useWindowDimensions, useColorScheme, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useIsFocused } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';

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

function MemorialIconLegendSection({ colorScheme, memorialDetails, memorialStatus, themeTextStyle }) {
  const rows = [];
  const status = memorialStatus.Status;

  if (status === 0 || status === 3) {
    rows.push(
      <View key="pending" style={styles.iconLegendRow}>
        {colorScheme === 'light' && <FontAwesomeIcon icon={['far', 'clock']} size={25} />}
        {colorScheme === 'dark' && <FontAwesomeIcon icon={['far', 'clock']} size={25} color="white" />}
        <AppText style={[styles.iconLegendText, themeTextStyle]}>
          {status === 3
            ? 'This memorial is on hold for scoring review.'
            : 'This memorial has been submitted and is awaiting review.'}
        </AppText>
      </View>
    );
  } else if (status === 1) {
    rows.push(
      <View key="approved" style={styles.iconLegendRow}>
        <FontAwesomeIcon icon={['fas', 'shield-check']} size={25} color="green" />
        <AppText style={[styles.iconLegendText, themeTextStyle]}>
          This memorial submission has been scored and approved. Congrats!
        </AppText>
      </View>
    );
  } else if (status === 2) {
    rows.push(
      <View key="rejected" style={styles.iconLegendRow}>
        <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={25} color="red" />
        <AppText style={[styles.iconLegendText, themeTextStyle]}>
          This memorial submission has been rejected. Check your email for details. You may resubmit this at
          anytime.
        </AppText>
      </View>
    );
  }

  if (memorialDetails.MultiImage > 0) {
    rows.push(
      <View key="multi-image" style={styles.iconLegendRow}>
        {colorScheme === 'light' && <FontAwesomeIcon icon={['far', 'images']} size={25} />}
        {colorScheme === 'dark' && <FontAwesomeIcon icon={['far', 'images']} size={25} color="white" />}
        <AppText style={[styles.iconLegendText, themeTextStyle]}>
          This memorial requires two images. See the official rules for more details.
        </AppText>
      </View>
    );
  }

  rows.push(
    <View key="directions" style={styles.iconLegendRow}>
      {colorScheme === 'light' && <FontAwesomeIcon icon={['fal', 'map-signs']} size={25} />}
      {colorScheme === 'dark' && <FontAwesomeIcon icon={['fal', 'map-signs']} size={25} color="white" />}
      <AppText style={[styles.iconLegendText, themeTextStyle]}>
        Tap on this icon to get driving directions using your phone's default map app.
      </AppText>
    </View>
  );

  if (memorialDetails.Restrictions > 1) {
    rows.push(
      <View key="restrictions" style={styles.iconLegendRow}>
        <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={25} color="red" />
        <AppText style={[styles.iconLegendText, themeTextStyle]}>
          This memorial has a restriction. Scroll up to the Restrictions section for details.
        </AppText>
      </View>
    );
  }

  return (
    <View style={styles.metadataDetailContainer}>
      <MetaHeading style={themeTextStyle}>Icon legend</MetaHeading>
      {rows}
    </View>
  );
}

function MemorialDetailScreen({ navigation, route }) {
  const { user, logOut } = useAuth();
  const isFocused = useIsFocused();

  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;
  const tagsStyles = colorScheme === 'light' ? lightTagsStyles : darkTagsStyles;

  const memorialID = route.params.id;
  let memorialStatus = { ScorerNotes: '', Status: 9, HasEarnedCredit: false };
  const getMemorialDetailsApi = useApi(memorial.getMemorialDetails);
  const memorialDetails = getMemorialDetailsApi.data[0] || {};
  const getMemorialMetadataApi = useApi(memorial.getMemorialMetadata);
  const memorialMetadata = Array.isArray(getMemorialMetadataApi.data)
    ? getMemorialMetadataApi.data
    : [];
  const getMemorialStatusApi = useApi(memorial.getMemorialStatus);
  const memorialStatusApiResponse = getMemorialStatusApi.data[0] || {};
  if (
    memorialStatusApiResponse.Status != null &&
    typeof memorialStatusApiResponse.Status === 'number' &&
    memorialStatusApiResponse.Status < 9
  ) {
    memorialStatus = {
      ...memorialStatusApiResponse,
      HasEarnedCredit: memorialStatusApiResponse.HasEarnedCredit === true,
    };
  }

  const memorialSubmitParams = {
    id: memorialID,
    name: memorialDetails.Name,
    code: memorialDetails.Code,
    multiImage: memorialDetails.MultiImage,
    sampleImage: memorialDetails.SampleImage,
    hasEarnedCredit: memorialStatus.HasEarnedCredit === true,
  };

  const memorialLat = memorialDetails.Latitude;
  const memorialLong = memorialDetails.Longitude;
  const memorialCode = memorialDetails.Code;
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const gpsUrl = Platform.select({
    ios: `${scheme}${memorialCode}@${memorialLat},${memorialLong}`,
    android: `${scheme}${memorialLat},${memorialLong}(${memorialCode})`
  });
  const contentWidth = useWindowDimensions().width;
  const imageURL = "https://images.tourofhonor.com/SampleImages/" + memorialDetails.SampleImage;

  const copyGPSToClipboard = async () => {
    await Clipboard.setStringAsync(`${memorialLat}, ${memorialLong}`, { contentType: Clipboard.ContentType.PLAIN_TEXT });
  };

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
          <AppButton title="Retry" onPress={() => getMemorialDetailsApi.request(memorialID)} />
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
            {(memorialStatus.Status === 0 || memorialStatus.Status === 3) && colorScheme === 'light' && (
              <FontAwesomeIcon icon={['far', 'clock']} size={25} />
            )}
            {(memorialStatus.Status === 0 || memorialStatus.Status === 3) && colorScheme === 'dark' && (
              <FontAwesomeIcon icon={['far', 'clock']} size={25} color={'white'} />
            )}
          </View>
        </View>

        {/* Middle Section */}

        <View style={styles.gpsCoordinatesContainer}>
          <AppText style={styles.gpsCoordinatesText}>{memorialDetails.Latitude}, {memorialDetails.Longitude}</AppText>
        </View>
        <View style={styles.memorialCodeContainer}>
          <AppText style={[styles.memorialCodeText, themeTextStyle]}>{memorialDetails.CategoryName}</AppText>
          <AppText style={[styles.memorialCodeText, themeTextStyle]}>{memorialDetails.Code}</AppText>
        </View>
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{ uri: imageURL }} />
        </View>

        <View style={styles.infoIconsContainer}>
          <TappableIcon iconFamily="fas" iconName="location-dot" onPress={() => { copyGPSToClipboard }} />
          {(memorialDetails.MultiImage > 0 && colorScheme === 'light') && <FontAwesomeIcon icon={['far', 'images']} size={35} />}
          {(memorialDetails.MultiImage > 0 && colorScheme === 'dark') && <FontAwesomeIcon icon={['far', 'images']} size={35} color={'white'} />}
          <TappableIcon iconFamily="fal" iconName="map-signs" onPress={() => { Linking.openURL(gpsUrl) }} />
          {memorialDetails.Restrictions > 1 && <FontAwesomeIcon icon={['fas', 'octagon-exclamation']} size={35} color={'red'} />}

        </View>
        <View style={styles.submitButtonContainer}>
          {memorialStatus.Status === 9 && (
            <AppButton
              title="Submit"
              onPress={() => navigation.navigate('MemorialSubmitScreen', memorialSubmitParams)}
            />
          )}
          {memorialStatus.Status === 2 && (
            <>
              <View style={styles.disabledButtonContainer}>
                <AppText style={[styles.disabledButtonText, themeTextStyle]}>{memorialStatus.ScorerNotes}</AppText>
              </View>
              <AppButton
                title="Resubmit"
                onPress={() => navigation.navigate('MemorialSubmitScreen', memorialSubmitParams)}
              />
            </>
          )}
          {memorialStatus.Status === 1 && (
            <>
              <View style={styles.disabledButtonContainer}>
                <AppText style={[styles.disabledButtonText, themeTextStyle]}>
                  You have already earned this memorial, congrats!
                </AppText>
              </View>
              <AppButton
                title="Submit again"
                onPress={() =>
                  navigation.navigate('MemorialSubmitScreen', {
                    ...memorialSubmitParams,
                    hasEarnedCredit: true,
                  })
                }
              />
            </>
          )}
          {(memorialStatus.Status === 0 || memorialStatus.Status === 3) && (
            <View style={styles.disabledButtonContainer}>
              <AppText style={[styles.disabledButtonText, themeTextStyle]}>
                {memorialStatus.Status === 3
                  ? 'This memorial is on hold for scoring review.'
                  : 'This memorial has been submitted and is awaiting review.'}
              </AppText>
            </View>
          )}
        </View>

        {/* Bottom Section */}
        <View style={styles.metadataDetailContainer}>
          <MetaHeading style={themeTextStyle}>Access</MetaHeading>
          <AppText style={themeTextStyle}>{memorialDetails.Access}</AppText>
          {memorialMetadata.map(({ id, Heading, Text }) => (
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

        <MemorialIconLegendSection
          colorScheme={colorScheme}
          memorialDetails={memorialDetails}
          memorialStatus={memorialStatus}
          themeTextStyle={themeTextStyle}
        />

        <View style={{ paddingVertical: 10 }}>
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
  gpsCoordinatesContainer: {
    paddingHorizontal: 10,
  },
  gpsCoordinatesText: {
    fontSize: 16,
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
  iconLegendRow: {
    flexDirection: 'row',
    marginTop: 8,
    marginRight: 6,
  },
  iconLegendText: {
    flex: 1,
    fontSize: 14,
    paddingLeft: 8,
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
