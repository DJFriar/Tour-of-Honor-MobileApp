import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as ImagePicker from 'expo-image-picker';

import colors from '../config/colors';
import AppText from './AppText';

function ImageInput({ imageUri, onChangeImage, isOptional }) {

  const handlePress = () => {
    if (!imageUri) selectImage();
    else Alert.alert('Delete', 'Are you sure you want to delete this image?', [
      { text: 'Yes', onPress: () => onChangeImage(null)},
      { text: 'No'}
    ])
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        exif: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled)
        onChangeImage(result.uri)
    } catch (error) {
      console.log("Error reading an image", error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <>
            <FontAwesomeIcon icon={['fas', 'camera-retro']} size={50} color={colors.medium} />
            <AppText>{isOptional === 1 ? "Optional" : "Required"}</AppText>
          </>
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 150,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 150
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

export default ImageInput;