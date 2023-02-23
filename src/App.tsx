/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {Dimensions} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Cell from './Cell';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderTopWidth: 2, borderLeftWidth: 2}]} />
                  ) : i % 3 == 0 && n === 8 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderBottomWidth: 2, borderLeftWidth: 2}]} />
                  ) : i === 8 && n % 3 == 0 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderTopWidth: 2, borderRightWidth: 2}]} />
                  ) : i === 8 && n === 8 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderBottomWidth: 2, borderRightWidth: 2}]} />
                  ) : i % 3 == 0 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderLeftWidth: 2}]} />
                  ) : n % 3 == 0 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderTopWidth: 2}]} />
                  ) : i === 8 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderRightWidth: 2}]} />
                  ) : n === 8 ? (
                    <Cell onClick={()=>{}} value="" style={[styles.cell, {borderBottomWidth: 2}]} />
                  ) : (
                    <Cell onClick={()=>{}} value="" style={styles.cell} />
                  )
                )
              )}
            </View>
          )
        )}
        <View style={{height: 20}} />
        {/* 1,2,3,4,5,6,7,8,9を並べる */}
        <View style={{flexDirection: 'row'}}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <TouchableOpacity style={{flex: 1, height: Dimensions.get('window').width / 9, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black', borderRightWidth: (n === 9) ? 1 : 0}}>
              <Text style={{textAlign: 'center', fontSize: 24, marginTop: 5}}>{n}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
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
