import { ThemedText } from '@components/ThemedText';
import type { FC } from 'react';
import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export const Button: FC<ButtonProps> = ({
  title,
  style,
  disabled,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[style, disabled && styles.disabled]}
      disabled={disabled}
      {...rest}
    >
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
};

const styles = {
  disabled: {
    opacity: 0.7,
  },
};
