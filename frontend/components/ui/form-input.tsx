import { ThemedText } from '@components/ThemedText';
import type { FC } from 'react';
import { StyleSheet, TextInput, type TextInputProps, View } from 'react-native';

export type FormInputProps = TextInputProps & {
  label: string;
};

export const FormInput: FC<FormInputProps> = ({ label, ...rest }) => {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} {...rest} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  textInputContainer: {
    borderColor: '#ddd',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
