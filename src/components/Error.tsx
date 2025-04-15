import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Theme} from '../Constant';

interface ErrorProps {
  message: String;
}

export default function Error(props: ErrorProps) {
  const {message = ''} = props;

  return (
    <View style={styles.errorView}>
      <Image
        source={require('../assets/error.png')}
        style={styles.imageStyle}
      />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorView: {
    flexDirection: 'row',
    borderColor: Theme.errorColor,
    borderRadius: Theme.borderRadius,
    borderWidth: Theme.borderWidth,
    backgroundColor: Theme.errorBackgroundColor,
    padding: 5,
    alignItems: 'center',
  },
  imageStyle: {
    width: 15,
    height: 15,
    margin: 3,
  },
});
