import { IconSymbol } from '@components/ui/IconSymbol';
import { useThemeColor } from '@hooks/useThemeColor';
import type { FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type ProductSearchBarProps = {
  search: (text: string) => void;
};

export const ProductSearchBar: FC<ProductSearchBarProps> = ({ search }) => {
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const style = styles(textColor);
  return (
    <View style={style.container}>
      <TextInput
        style={style.textInput}
        onChangeText={search}
        returnKeyType="search"
      />
      <IconSymbol name="search1" color={iconColor} />
    </View>
  );
};

const styles = (textColor: string) =>
  StyleSheet.create({
    container: {
      borderColor: '#ddd',
      borderRadius: 16,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 8,
      gap: 8,
    },
    textInput: {
      flex: 1,
      paddingVertical: 16,
      paddingLeft: 8,
      fontSize: 16,
      color: textColor,
    },
  });
