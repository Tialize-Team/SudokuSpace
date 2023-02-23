/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import {
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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [focusNumber, setFocusNumber] = useState<number>(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onNumbers = (n: number) => {
    setFocusNumber(n);
  }

  const onCellPress = (n: number) => {
    return () => {
      console.log(n);
    }
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
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderTopWidth: 2, borderLeftWidth: 2}]} />
                  ) : i % 3 == 0 && n === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderBottomWidth: 2, borderLeftWidth: 2}]} />
                  ) : i === 8 && n % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderTopWidth: 2, borderRightWidth: 2}]} />
                  ) : i === 8 && n === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderBottomWidth: 2, borderRightWidth: 2}]} />
                  ) : i % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderLeftWidth: 2}]} />
                  ) : n % 3 == 0 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderTopWidth: 2}]} />
                  ) : i === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderRightWidth: 2}]} />
                  ) : n === 8 ? (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={[styles.cell, {borderBottomWidth: 2}]} />
                  ) : (
                    <Cell onPress={onCellPress(n * 9 + i)} value="" style={styles.cell} />
                  )
                )
              )}
            </View>
          )
        )}
        <View style={{height: 20}} />
        <Numbers onNumbers={onNumbers} focusNumber={focusNumber} />
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
