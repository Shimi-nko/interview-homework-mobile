import { IconSymbol } from '@components/ui/IconSymbol';
import { useThemeColor } from '@hooks/use-theme-color';
import { useRouter } from 'expo-router';
import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AddButton: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const color = useThemeColor({}, 'blue');
  const { push } = useRouter();

  const style = styles(bottom, color);

  const onPress = () => push('/add');

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={style.addButton}
      onPress={onPress}
    >
      <IconSymbol name="pluscircle" color="white" />
    </TouchableOpacity>
  );
};

const styles = (bottomOffset: number, backgroundColor: string) =>
  StyleSheet.create({
    addButton: {
      position: 'absolute',
      bottom: bottomOffset,
      right: 16,
      backgroundColor,
      borderRadius: 99,
      padding: 16,
      alignItems: 'center',
    },
  });
