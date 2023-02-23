/**
 * Sudoku Space
 */

import React, { useRef, useState } from 'react';
import {
  Button,
  ImageBackground,
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
import ModalWindow from './ModalWindow';
import { getSudoku } from 'sudoku-gen';

let initFlag = true;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [focusNumber, setFocusNumber] = useState<number>(5);
  const [cells, setCells] = useState<string[]>(Array(81).fill(''));
  const [cellStyles, setCellStyles] = useState<any[]>(Array(81).fill({}));
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalBody, setModalBody] = useState<string>('');
  const sudoku = getSudoku('easy');

  const onRequestClose = () => {
    return () => {
      setModalVisible(false);
    }
  }

  const backgroundStyle = {
    color: 'black'
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
      if (cellStyles[n].backgroundColor === '#d2e8ff') {
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

  const checkGameClear = (newCells: string[]) => {
    let gameClearFlag = true;
    // 縦の列のチェック
    for (let i = 0; i < 9; i++) {
      const col = newCells.slice(i, 81, 9);
      const colSet = new Set(col);
      if (colSet.size !== 9) {
        gameClearFlag = false;
        break;
      }
    }
    // 横の列のチェック
    for (let i = 0; i < 9; i++) {
      const row = newCells.slice(i * 9, i * 9 + 9);
      const rowSet = new Set(row);
      if (rowSet.size !== 9) {
        gameClearFlag = false;
        break;
      }
    }
    return gameClearFlag;
  }

  const answerGame = () => {
    return () => {
      const newCells = cells.slice();
      let gameClearFlag = checkGameClear(newCells);
      if (gameClearFlag) {
        setModalTitle('ゲームクリア');
        setModalBody('おめでとうございます！！！');
      } else {
        setModalTitle('もう少し頑張ってください');
        setModalBody('数字が合っていない部分があります。');
      }
      setModalVisible(true);
    }
  }

  const gameOver = () => {
    return () => {
      const newCells = cells.slice();
      sudoku.solution.split('').forEach((c, i) => {
        newCells[i] = c;
      });
      setCells(newCells);
      setModalTitle('ゲームオーバー');
      setModalBody('正解を表示します');
      setModalVisible(true);
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
      <ImageBackground source={require('./assets/images/background.jpg')} resizeMode="cover" style={styles.image}>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>数独スペース - Sudoku Space</Text>
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
        <Button title="解答する" onPress={answerGame()} />
        <View style={{height: 20}} />
        <Button title="あきらめる" onPress={gameOver()} />
        <View style={{height: 20}} />
        <Button title="初期化する" onPress={initCells()} />
        <ModalWindow visible={modalVisible} title={modalTitle} body={modalBody} onRequestClose={onRequestClose()} />
      </View>
      </ImageBackground>
    </SafeAreaView>

  );

  return elements;
}

const styles = StyleSheet.create({
  images: {
    flex: 1,
    justifyContent: 'center',
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    width: 100 + '%',
    height: 100 + '%',
    opacity: 0.9,
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
  },
});

export default App;
