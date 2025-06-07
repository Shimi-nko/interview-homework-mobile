import { IconSymbol } from '@components/ui/IconSymbol';
import type { FC } from 'react';
import { TextInput, View } from 'react-native';

type ProductSearchBarProps = {
  search: (text: string) => void;
};

export const ProductSearchBar: FC<ProductSearchBarProps> = ({ search }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={search}
        returnKeyType="search"
      />
      <IconSymbol name="search1" color="grey" />
    </View>
  );
};

const styles = {
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
  },
};
