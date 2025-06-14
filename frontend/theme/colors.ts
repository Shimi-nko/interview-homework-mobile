/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textInverse: '#ECEDEE',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    blue: '#42a5f5',
    cyan: '#26c6da',
    green: '#66bb6a',
    error: '#ef5350',
  },
  dark: {
    text: '#ECEDEE',
    textInverse: '#11181C',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    blue: '#42a5f5',
    cyan: '#26c6da',
    teal: '#26c6da',
    error: '#ef5350',
  },
};
