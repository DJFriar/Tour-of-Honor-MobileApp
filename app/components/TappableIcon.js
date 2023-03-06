import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function TappableIcon({iconFamily, iconName, onPress}) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity onPress={onPress}>
      {colorScheme === 'light' && <FontAwesomeIcon icon={[iconFamily, iconName]} size={35} />}
      {colorScheme === 'dark' && <FontAwesomeIcon icon={[iconFamily, iconName]} size={35} color={'white'} />}
    </TouchableOpacity>
  );
}

export default TappableIcon;
