import React from 'react';
import { TouchableOpacity } from 'react-native';

type CellProps = {
  value: string;
  onPress: any;
  style: any;
};

const Cell = ({value, onPress, style}: CellProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {value}
    </TouchableOpacity>
  );
};

export default Cell;
