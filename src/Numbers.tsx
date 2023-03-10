import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

type NumbersProps = {
  onNumbers: (n: number | string) => void;
  focusNumber: number;
};

const Numbers = ({onNumbers, focusNumber}: NumbersProps) => {
  return (
    <View style={{flexDirection: 'row'}}>
      {['', 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <TouchableOpacity
          onPress={() => {
            onNumbers(n);
          }}
          style={[
            styles.number,
            focusNumber === n ? styles.focusNumber : styles.unfocusNumber,
          ]}>
          <Text style={styles.numberText}>{n}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    width: Dimensions.get('window').width / 11 - 2,
    height: Dimensions.get('window').width / 11 - 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  numberText: {
    fontSize: Dimensions.get('window').width / 11 / 2,
    color: '#000',
  },
  focusNumber: {
    backgroundColor: '#52b788',
  },
  unfocusNumber: {
    backgroundColor: '#fff',
  },
});

export default Numbers;