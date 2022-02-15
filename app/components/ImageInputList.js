import React from 'react';
import { View, StyleSheet } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage, multiImageRequired, maxImageCount }) {
  let isOptional = 0;

  if (multiImageRequired === 1) {isOptional = 1}

  return (
    <View>
      <View style={styles.container}>
        {imageUris.map((uri) => (
          <View key={uri} style={styles.image}>
            <ImageInput 
              imageUri={uri} 
              key={uri} 
              onChangeImage={() => onRemoveImage(uri)} 
            />
          </View>
        ))}
        {imageUris.length < maxImageCount && <ImageInput isOptional={0} onChangeImage={uri => onAddImage(uri)} />}
        {(imageUris.length >= maxImageCount && imageUris.length < 2 ) && <ImageInput isOptional={1} onChangeImage={uri => onAddImage(uri)} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 10
  },
  image: {
    marginRight: 10
  }
});

export default ImageInputList;