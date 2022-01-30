import React from 'react';
import { Text } from 'react-native';

import defaultStyles from '../config/styles';

function MetaHeading({children, style, ...otherProps }) {
  return (
    <Text style={[defaultStyles.heading, style]} {...otherProps }>{children}</Text>
  );
}

export default MetaHeading;