import { Colors } from '@theme/colors';
import type { ViewStyle } from 'react-native';
import type { ButtonVariant } from './button';

export const containerVariants: Record<ButtonVariant, ViewStyle> = {
  critical: {
    backgroundColor: Colors.light.error,
  },
  primary: {
    backgroundColor: Colors.light.blue,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.light.cyan,
  },
  success: {
    backgroundColor: Colors.light.green,
  },
};

export const labelVariants: Record<ButtonVariant, { color: string }> = {
  critical: {
    color: Colors.light.background,
  },
  primary: {
    color: Colors.light.background,
  },
  secondary: {
    color: Colors.light.cyan,
  },
  success: {
    color: Colors.light.background,
  },
};
