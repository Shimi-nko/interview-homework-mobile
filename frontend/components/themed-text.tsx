import { useThemeColor } from '@hooks/use-theme-color';
import { Typography, type TypographyType } from '@theme/typography';
import type { FC } from 'react';
import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: TypographyType;
};

export const ThemedText: FC<ThemedTextProps> = ({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const typographyType = Typography[type];

  return <Text style={[{ color, ...typographyType }, style]} {...rest} />;
};
