import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { AppForm, AppFormField, ErrorMessage, SubmitButton } from '../components/forms';
import AppText from '../components/AppText';
import authApi from '../api/auth';
import Screen from '../components/Screen';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  flag: Yup.number().required().min(1).label("Flag Number"),
  zipcode: Yup.string().required().matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits').max(5, 'Must be exactly 5 digits').label("Zipcode")
});

function LoginScreen(props) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('An unexpected error occured. If this error persists, please send an email to support@tourofhonor.com.');

  const handleSubmit = async ({ flag, zipcode }) => {
    const result = await authApi.login(flag, zipcode);
    console.log(`authResponse was: ${JSON.stringify(result.status)}`);
    if (!result.ok) {
      if (result.status === 400) setErrorMessageText("Invalid Flag # and/or Zip Code.");
      if (result.status === 401) setErrorMessageText("Error 401. Please contact TOH Support.");
      if (result.status === 403) setErrorMessageText("Please update this app to continue.");
      return setLoginFailed(true);
    }
    setLoginFailed(false);
    auth.logIn(result.data);
  }

  return (
    <Screen hasNoHeader>
      <ScrollView style={{ marginTop: 20 }} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/toh_logo.png")}
          />
        </View>
        <AppText style={styles.text}>Please login below using your flag number and zip code.</AppText>
        <AppForm
          initialValues={{ flag: '', zipcode: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.errorMessage}>
            <ErrorMessage error={errorMessageText} visible={loginFailed} />
          </View>
          <View style={styles.formContent}>
            <AppFormField
              autoCorrect={false}
              iconFamily="fas"
              iconName="flag"
              keyboardType="number-pad"
              name="flag"
              placeholder="Flag Number"
              height={60}
            />
            <AppFormField
              autoCorrect={false}
              iconFamily="fas"
              iconName="location-dot"
              keyboardType="number-pad"
              name="zipcode"
              placeholder="Zip Code"
              height={60}
            />
            <SubmitButton title="Login" />
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
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
