import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppFormImagePicker from '../components/forms/AppFormImagePicker';
import colors from '../config/colors';
import Screen from '../components/Screen';
import submissionApi from '../api/submission';
import SubmitButton from '../components/forms/SubmitButton';
import useAuth from '../auth/useAuth';

let validationSchema = {};

function MemorialSubmitScreen({ navigation, route }) {
  const { user } = useAuth();

  console.log("==== user ====");
  console.log(user);

  const multiImage = route.params.multiImage;
  const maxImageCount = multiImage + 1;
  const userID = user.UserID;
  const riderFlagNumber = user.FlagNumber;
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
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{uri: imageURL}} />
        </View>
        <AppForm
          initialValues={{ images: [], MemorialID: memorialID, MemorialCode: memorialCode, RiderNotes: '', RiderID: userID, RiderFlag: riderFlagNumber}}
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