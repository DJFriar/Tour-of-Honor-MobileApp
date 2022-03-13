import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DateTime } from "luxon";

import AppText from './AppText';
import colors from '../config/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function SubmissionListItem({category, code, date, statusID}) {
  const formattedDate = DateTime.fromISO(date).setZone("America/Chicago").toLocaleString(DateTime.DATETIME_SHORT);

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
        {statusID === 0 && <FontAwesomeIcon icon={['far', 'clock']} size={25} /> }
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
    backgroundColor: colors.backgroundColor
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