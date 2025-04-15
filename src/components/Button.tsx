import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Theme} from '../Constant';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button(props: ButtonProps) {
  const {title = '', onPress = () => {}} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonView}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: Theme.buttonColor,
    borderRadius: Theme.borderRadius,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
});
