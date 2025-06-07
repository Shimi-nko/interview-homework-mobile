import { ThemedText } from '@components/ThemedText';
import type { FC } from 'react';
import { type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native';

type ButtonProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const Button: FC<ButtonProps> = ({ title, style, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={style} onPress={onPress}>
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
};
