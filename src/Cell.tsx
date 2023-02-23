import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

type CellProps = {
  value: string;
  onPress: any;
  style: any;
};

const Cell = ({value, onPress, style}: CellProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    text: {
        fontSize: Dimensions.get('window').width / 11 - 10,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'black',
        fontWeight: 'normal',
    },
});

export default Cell;
