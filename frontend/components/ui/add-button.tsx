import { IconSymbol } from '@components/ui/IconSymbol';
import { useRouter } from 'expo-router';
import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AddButton: FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { push } = useRouter();

  const style = styles(bottom);

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

const styles = (bottomOffset: number) =>
  StyleSheet.create({
    addButton: {
      position: 'absolute',
      bottom: bottomOffset,
      right: 16,
      backgroundColor: '#007bff',
      borderRadius: 99,
      padding: 16,
      alignItems: 'center',
    },
  });
