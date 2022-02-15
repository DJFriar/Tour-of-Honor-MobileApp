import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import AppText from './AppText';
import IconImage from './IconImage';

function StatePickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <IconImage name={item.shortName} size={70} />
        <AppText numberOfLines={1} style={styles.label}>{item.fullName}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: "20%"
  },
  label: {
    marginTop: 5,
    textAlign: "center"
  }
})

export default StatePickerItem;