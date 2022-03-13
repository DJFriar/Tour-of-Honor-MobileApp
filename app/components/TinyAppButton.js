import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function TinyAppButton({title, onPress, color = "blue"}) {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

export default TinyAppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: '90%',
  },
  text: {
    color: colors.white,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "bold"
  }
})