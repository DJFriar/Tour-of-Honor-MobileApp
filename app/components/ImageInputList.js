import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage, maxImageCount }) {
  const scrollView = useRef();

  return (
    <View>
      {/* <ScrollView 
        ref={scrollView} 
        horizontal 
        > */}
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
          {imageUris.length < maxImageCount && <ImageInput onChangeImage={uri => onAddImage(uri)} />}
        </View>
      {/* </ScrollView> */}
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