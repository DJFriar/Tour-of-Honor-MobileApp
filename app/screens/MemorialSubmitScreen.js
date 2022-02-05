import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppFormImagePicker from '../components/forms/AppFormImagePicker';
import AppForm from '../components/forms/AppForm';
import submissionApi from '../api/submission';
import SubmitButton from '../components/SubmitButton'
import AppFormField from '../components/forms/AppFormField';

let validationSchema = {};

function MemorialSubmitScreen({ navigation, route }) {
  const multiImage = route.params.multiImage;
  const maxImageCount = multiImage + 1;
  console.log("==== maxImageCount ====");
  console.log(maxImageCount);
  console.log("multiImage = " + multiImage);
  const memorialID = route.params.id;
  const memorialCode = route.params.code;
  const imageURL = "https://www.tourofhonor.com/2022appimages/" + route.params.sampleImage;

  if (multiImage == 1) {
    validationSchema = Yup.object().shape({
      images: Yup.array().min(2, "Two images are required for this memorial.")
    });
  } else {
    validationSchema = Yup.object().shape({
      images: Yup.array().min(1, "Please select at least one image.")
    });
  }

  const handleSubmit = async (submission, { resetForm }) => {
    // setProgress(0);
    // setUploadVisible(true);
    const result = await submissionApi.postSubmission(
      {...submission},
      // progress => setProgress(progress)
    );

    if (!result.ok) {
      // setUploadVisible(false);
      return alert('Could not save the submission.')
    }

    resetForm();
  }

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <AppText>This the submit modal for {memorialCode}</AppText>
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{uri: imageURL}} />
        </View>
        <AppForm
          initialValues={{ images: [], MemorialID: memorialID, MemorialCode: memorialCode, RiderNotes: '', RiderID: 1}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.imagesRow}>
            <AppFormImagePicker name="images" maxImageCount={maxImageCount} />
          </View>
          <AppFormField 
          autoCorrect
          maxLength={255}
          multiline
          name="RiderNotes"
          numberOfLines={4}
          placeholder="Optional Notes"
        />
          <View style={styles.submitButtonContainer}>
            <SubmitButton title="Submit" />
          </View>
        </AppForm>
        <View style={styles.emptyView} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingVertical: 8,
  },
  emptyView: {
    marginBottom: 25,
  },
  formPicker: {
    color: colors.medium
  },
  imagesRow:{
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
  sampleImage: {
    borderRadius: 10,
    height: 270,
    width: 360,
  },
  sampleImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    paddingTop: 10,
  },
  submitButtonContainer: {
    marginHorizontal: 25,
  },
});

export default MemorialSubmitScreen;