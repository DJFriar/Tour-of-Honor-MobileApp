import React from 'react';
import { Platform, View, StyleSheet, useColorScheme } from 'react-native';
import { DateTime } from 'luxon';

import AppText from './AppText';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

let formattedDate = Date.now;

function addZero(i) {
  if (i < 10) { i = "0" + i }
  return i;
}

function SubmissionListItem({ code, date, statusID }) {
  const colorScheme = useColorScheme();

  if (Platform.OS === 'android') {
    const dateValue = new Date(date);
    const month = dateValue.getMonth() + 1;
    const day = dateValue.getDate();
    const year = dateValue.getFullYear();
    const hour = dateValue.getHours();
    let adjustedHour = 0;
    if (hour == 0) {
      adjustedHour = 12;
    } else {
      adjustedHour = (hour > 12 ? hour - 12 : hour);
    }
    const minutes = addZero(dateValue.getMinutes());

    formattedDate = month + "/" + day + "/" + year + ", " + adjustedHour + ":" + minutes + (hour > 11 ? " PM" : " AM");
  } else {
    formattedDate = DateTime.fromISO(date).setZone("America/Chicago").toLocaleString(DateTime.DATETIME_SHORT);
  }

  return (
    <View style={styles.container}>
      <View style={styles.submissionTextContainer}>
        <AppText>{code}</AppText>
      </View>
      <View style={styles.submissionDateContainer}>
        <AppText>{formattedDate}</AppText>
      </View>
      <View style={styles.statusIcons}>
        {statusID === 2 && <FontAwesomeIcon icon={['fas', 'shield-exclamation']} size={25} color={'red'} />}
        {statusID === 1 && <FontAwesomeIcon icon={['fas', 'shield-check']} size={25} color={'green'} />}
        {(statusID === 0 && colorScheme === 'light') && <FontAwesomeIcon icon={['far', 'clock']} size={25} />}
        {(statusID === 0 && colorScheme === 'dark') && <FontAwesomeIcon icon={['far', 'clock']} size={25} color={'white'} />}
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  statusIcons: {
    alignItems: 'flex-end',
    flex: 1,
  },
  submissionDateContainer: {
    flex: 4,
  },
  submissionTextContainer: {
    flex: 2,
  },
});

export default SubmissionListItem;
