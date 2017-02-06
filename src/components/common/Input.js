import React, { PropTypes } from 'react';
import { TextInput, View, Text } from 'react-native';

export const Input = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  keyboardType,
}) => (
  <View style={styles.containerStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    <TextInput
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
      style={styles.inputStyle}
      autoCorrect={false}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  </View>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
};

Input.defaultProps = {
  secureTextEntry: false,
  keyboardType: 'default',
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    height: 40,
    alignItems: 'center',
  },
  labelStyle: {
    paddingLeft: 20,
    fontSize: 18,
    flex: 1,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
};

export default Input;