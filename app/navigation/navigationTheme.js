import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import colors from '../config/colors';

const tohLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.white
  },
}

const tohDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.darkBackground
  },
}

export {
  tohDarkTheme,
  tohLightTheme,
};
