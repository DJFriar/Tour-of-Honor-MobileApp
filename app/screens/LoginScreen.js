import React, { useState } from 'react';
import { Image, ScrollView, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import * as Yup from 'yup';

import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import authApi from '../api/auth';
import Screen from '../components/Screen';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
  flag: Yup.number().required().min(1).max(1600).label("Flag Number"),
  zipcode: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits').label("Zipcode")
});

function LoginScreen(props) {
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({flag, zipcode}) => {
    console.log("Login Submitted for " + flag);
  }

  return (
    <Screen>
      <ScrollView style={{marginTop: 20}} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo} 
            source={require("../assets/toh_logo.png")}
          />
        </View>
        <AppText style={styles.text}>Please login below using your flag number and zip code.</AppText>
        <AppForm 
          initialValues={{ flag: '', zipcode: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error="Invalid flag and/or zipcode." visible={loginFailed} />
          <View style={styles.formContent}>
            <AppFormField 
              autoCorrect={false}
              icon="flag"
              keyboardType="number-pad"
              name="flag"
              placeholder="Flag Number"
            />
            <AppFormField 
              autoCorrect={false}
              icon="map-marker-radius"
              keyboardType="number-pad"
              name="zipcode"
              placeholder="Zip Code"
            />
            <SubmitButton title="Login"/>
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1, 
    justifyContent: "flex-end",
    marginTop: 20
  },
  formContent: {
    padding: 20,
    width: "100%"
  },
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 20
  }
});

export default LoginScreen;