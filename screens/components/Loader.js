import React, {useContext} from 'react';
import {StatusBar, View} from 'react-native';

import { LocalizationContext } from "../../localize"

import { userInformation } from "../../lib/user"

/*
From what I gather, this file gets loaded first somehow and
based on userInformation promise above redirects the user
to the login page or home page.

The LocalizationContext is a hook that is badly commented
and confusing on how it really works. Hoping it can be
mocked somehow since its effect/output dont matter for the tests

Tests wanted:

1. render (done)
2. ensure it redirects to Login page if userInformation resolves null
else go to the home page (failing)
*/

import {LocalizationContext} from '../lib/localization';

const Loader: () => React$Node = (props) => {
  const {initializeAppLanguage} = useContext(LocalizationContext);

  initializeAppLanguage();

  const bootstrapAsync = async () => {
    const userInfo = await userInformation();
    let goToLogin = true; // force user to go to the login page
    if (userInfo != null) {
      goToLogin = false;
    }

    props.navigation.navigate(!goToLogin ? 'App' : 'Login');
  };
  


  
  bootstrapAsync().then().catch()

  return (
    <View>
      <StatusBar barStyle="default" />
    </View>
  );
};

export default Loader;
