/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Dimensions} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Cell from './Cell';
import Numbers from './Numbers';
import { getSudoku } from 'sudoku-gen';

let initFlag = true;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [focusNumber, setFocusNumber] = useState<number>(5);
  const [cells, setCells] = useState<string[]>(Array(81).fill(''));
  const [cellStyles, setCellStyles] = useState<any[]>(Array(81).fill({}));
  const sudoku = getSudoku('easy');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onNumbers = (n: number | string) => {
    let newFocusNumber = n;
    if (n === '') {
      newFocusNumber = 0;
    }
    setFocusNumber(newFocusNumber as number);
  }

  const initCells = () => {
    return () => {
      const newCells = cells.slice();
      const newCellStyles = cellStyles.slice();
      sudoku.puzzle.split('').forEach((c, i) => {
        if (c === '-') {
          newCells[i] = '';
          newCellStyles[i] = {backgroundColor: '#fff'};
        } else {
          newCells[i] = c;
          newCellStyles[i] = {backgroundColor: '#d2e8ff'};
        }
      });
      setCells(newCells);
      setCellStyles(newCellStyles);
    }
  }

  const onCellPress = (n: number) => {
    return () => {
      const newCells = cells.slice();
      const m = focusNumber.toString()
      if (cellStyles[n]) {
        return;
      }
      if (m === '0') {
        newCells[n] = '';
      } else {
        newCells[n] = m;
      }
      setCells(newCells);
    }
  }

  const clearCells = () => {
    return () => {
      const newCells = cells.slice();
      newCells.forEach((c, i) => {
        newCells[i] = '';
      });
      setCells(newCells);
    }
  }

  if (initFlag) {
    initFlag = false;
    setTimeout(initCells(), 1000);
  }

  const elements = (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>数独アプリ</Text>
        {/* (3*3) * (3*3)のマス目を描く */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <View style={{flexDirection: 'row'}}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  i % 3 == 0 && n % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderTopWidth: 2, borderLeftWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : i % 3 == 0 && n === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderBottomWidth: 2, borderLeftWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : i === 8 && n % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderTopWidth: 2, borderRightWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : i === 8 && n === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderBottomWidth: 2, borderRightWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : i % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderLeftWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : n % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderTopWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : i === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderRightWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : n === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, {borderBottomWidth: 2}, cellStyles[n * 9 + i]]} />
                  ) : (
                    <Cell onPress={onCellPress(n * 9 + i)} value={cells[n * 9 + i]} style={[styles.cell, cellStyles[n * 9 + i]]} />
                  )
                )
              )}
            </View>
          )
        )}
        <View style={{height: 20}} />
        <Numbers onNumbers={onNumbers} focusNumber={focusNumber} />
        <View style={{height: 20}} />
        <Button title="初期化" onPress={initCells()} />
      </View>
    </SafeAreaView>
  );

  return elements;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },

  cell: {
    flex: 1,
    height: Dimensions.get('window').width / 9,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: 'black',
  }
});

export default App;
