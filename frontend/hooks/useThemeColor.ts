import { Colors } from '@constants/Colors';
import { useColorScheme } from 'react-native';

type ThemeType = { light?: string; dark?: string };

export const useThemeColor = (
  props: ThemeType,
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) => {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
};
