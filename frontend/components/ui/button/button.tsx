import { ThemedText } from '@components/themed-text';
import { IconSymbol, type IconSymbolName } from '@components/ui/IconSymbol';
import { containerVariants, labelVariants } from '@components/ui/button/utils';
import { type FC, useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'critical' | 'success';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  leftIcon?: IconSymbolName;
  rightIcon?: IconSymbolName;
  variant?: ButtonVariant;
};

export const Button: FC<ButtonProps> = ({
  title,
  style,
  disabled,
  leftIcon,
  rightIcon,
  variant = 'primary',
  ...rest
}) => {
  const buttonVariantStyle = useMemo(
    () => containerVariants[variant],
    [variant],
  );

  const textVariantStyle = useMemo(() => labelVariants[variant], [variant]);

  const leftIconComponent = useMemo(
    () =>
      leftIcon && (
        <IconSymbol name={leftIcon} color={textVariantStyle.color} size={16} />
      ),
    [leftIcon, textVariantStyle.color],
  );

  const rightIconComponent = useMemo(
    () =>
      rightIcon && (
        <IconSymbol name={rightIcon} color={textVariantStyle.color} size={16} />
      ),
    [rightIcon, textVariantStyle.color],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.container,
        buttonVariantStyle,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      {leftIconComponent}
      {title && (
        <ThemedText style={textVariantStyle} type="defaultSemiBold">
          {title}
        </ThemedText>
      )}
      {rightIconComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    columnGap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
});
