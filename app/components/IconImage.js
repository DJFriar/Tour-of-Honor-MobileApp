import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

function IconImage({ name, size = 40, }) {
  const iconPath = "https://www.tourofhonor.com/2022appimages/stateIcons/" + name + ".png";

  return (
    <View style={[styles.container, {
      width: size,
      height: size,
      borderRadius: size / 2,
    }]}>
      <Image style={{height: size}}
        resizeMode={"contain"}
        source={require("../assets/toh_logo.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default IconImage;