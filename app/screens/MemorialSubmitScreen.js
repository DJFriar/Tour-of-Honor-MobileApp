import React, { useState } from 'react';
import { Image, View, StyleSheet, ScrollView, Switch, Text } from 'react-native';
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
  const [showOtherRiders, setShowOtherRiders] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const multiImage = route.params.multiImage;
  const maxImageCount = multiImage + 1;
  const userID = user.UserID;
  const riderFlagNumber = user.FlagNumber;
  const memorialID = route.params.id;
  const memorialCode = route.params.code;
  const imageURL = "http://images.tourofhonor.com/SampleImages/" + route.params.sampleImage;

  if (multiImage == 1) {
    validationSchema = Yup.object().shape({
      images: Yup.array().min(2, "Two images are required for this memorial.")
    });
  } else {
    validationSchema = Yup.object().shape({
      images: Yup.array().min(1, "Please select at least one image.")
    });
  }

  const toggleOtherRiders = () => {
    setShowOtherRiders((previousState) => !previousState);
  };

  const toggleShowNotes = () => {
    setShowNotes((previousState) => !previousState);
  };

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
    } else {
      navigation.goBack();
    }

    setShowNotes(false);
    setShowOtherRiders(false);
    resetForm();
  }

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <View style={styles.sampleImageContainer}>
          <Image style={styles.sampleImage} source={{uri: imageURL}} />
        </View>
        <AppForm
          initialValues={{ images: [], MemorialID: memorialID, MemorialCode: memorialCode, OtherRiders: '', RiderNotes: '', RiderID: userID, RiderFlag: riderFlagNumber}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.imagesRow}>
            <AppFormImagePicker multiImageRequired={multiImage} name="images" maxImageCount={maxImageCount} />
          </View>
          <View style={styles.formFieldContainer}>
          <View style={styles.toggleContainer}>
            <View style={styles.toggleLabelView}>
              <Text style={styles.toggleLabelText}>Include Other Riders</Text>
            </View>
            <Switch onValueChange={toggleOtherRiders} value={showOtherRiders}></Switch>
          </View>
          { showOtherRiders && 
            <>
              <Text>If multiple flags are present in this submission, please enter them below seperated with a comma, and with no spaces.</Text>
              <AppFormField 
                height={50}
                maxLength={255}
                name="OtherRiders"
                numberOfLines={4}
                placeholder="xxx,yyy,zzz"
              />
            </>
          }
          <View style={styles.toggleContainer}>
            <View style={styles.toggleLabelView}>
              <Text style={styles.toggleLabelText}>Include Notes</Text>
            </View>
            <Switch onValueChange={toggleShowNotes} value={showNotes}></Switch>
          </View>
          { showNotes && 
            <AppFormField 
              autoCorrect
              height={100}
              maxLength={255}
              multiline
              name="RiderNotes"
              numberOfLines={4}
              placeholder="Optional Notes"
            />
          }
          </View>
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
  formFieldContainer: {
    marginRight: 16,
    marginLeft: 6
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
    marginHorizontal: 34,
  },
  toggleContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  toggleLabelText: {
    fontSize: 18,
  },
  toggleLabelView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MemorialSubmitScreen;