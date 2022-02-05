import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

function TappableIcon({iconName, onPress}) {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={35} style={{color: 'black'}} />
    </TouchableOpacity>
  );
}

export default TappableIcon;

const styles = StyleSheet.create({
  icon: {
    // backgroundColor: colors.blue,
    // borderRadius: 25,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 15,
    // width: '100%',
    // marginVertical: 10
  },
})