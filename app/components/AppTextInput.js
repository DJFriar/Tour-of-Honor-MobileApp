import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import defaultStyles from '../config/styles';

function AppTextInput({ icon, height, ...otherProps }) {
  return (
    <View style={[styles.container, {height: height}]}>
      <View style={styles.iconContainer}>
        {icon && <MaterialCommunityIcons name={icon} size={25} color={defaultStyles.colors.medium} style={styles.icon} />}
      </View>
      <View>
        <TextInput placeholderTextColor={defaultStyles.colors.medium} style={styles.text} {...otherProps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flex: 4,
    flexDirection: "row",
    marginLeft: 10,
    marginVertical: 10,
    paddingVertical: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer:{
    marginHorizontal: 10
  },
  text: {
    color: defaultStyles.colors.dark,
    fontSize: 24,
    fontFamily: Platform.OS === "android" ? "Roboto": "Avenir",
  },
})

export default AppTextInput;