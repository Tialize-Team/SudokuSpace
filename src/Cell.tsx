import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
        fontSize: 24,
        textAlign: 'center',
        verticalAlign: 'middle',
        marginTop: 3,
        color: 'black',
    },
});

export default Cell;
