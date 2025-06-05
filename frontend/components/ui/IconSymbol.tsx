import AntDesign from '@expo/vector-icons/AntDesign';
import type { SymbolWeight } from 'expo-symbols';
import type { ComponentProps, FC } from 'react';
import type { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

export type IconSymbolName = ComponentProps<typeof AntDesign>['name'];

type IconSymbolProps = {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
};

export const IconSymbol: FC<IconSymbolProps> = ({
  name,
  size = 24,
  color,
  style,
}) => <AntDesign color={color} size={size} name={name} style={style} />;
