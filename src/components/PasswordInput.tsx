import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import {Theme} from '../Constant';

interface PasswordInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

export default function PasswordInput(props: PasswordInputProps) {
  const {value = '', onChangeText = () => {}, placeholder = ''} = props;

  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        style={styles.inputView}
      />
      <TouchableOpacity onPress={() => setSecure(!secure)}>
        <Image
          source={
            secure
              ? require('../assets/hide.png')
              : require('../assets/visible.png')
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 15,
    margin: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: Theme.borderWidth,
    borderColor: Theme.borderColor,
    borderRadius: Theme.borderRadius,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0,
    marginVertical: 10,
  },
  inputView: {
    flex: 1,
  },
});
