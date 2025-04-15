import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {Theme} from '../Constant';

interface InputFieldProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export default function InputField(props: InputFieldProps) {
  const {value = '', onChangeText = () => {}, placeholder = ''} = props;
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.inputView}
    />
  );
}

const styles = StyleSheet.create({
  inputView: {
    borderWidth: Theme.borderWidth,
    borderColor: Theme.borderColor,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
