import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import colors from '../config/colors';

function MemorialsButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.icon} source={require('../assets/toh_logo.png')} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: colors.white,
    borderRadius: 40,
    borderWidth: 10,
    bottom: 20,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  icon: {
    height: 70,
    width: 70
  }
});

export default MemorialsButton;