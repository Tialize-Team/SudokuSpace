import React from 'react';
import { TouchableOpacity } from 'react-native';

type CellProps = {
  value: string;
  onClick: () => void;
  style: any;
};

const Cell = ({value, onClick, style}: CellProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={style}>
      {value}
    </TouchableOpacity>
  );
};

export default Cell;
