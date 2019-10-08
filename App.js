import React, {useState, createContext, useContext} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

const App = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.centered}>
        <Text style={styles.largeText}>Demo!</Text>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  largeText: {
    fontSize: 38,
    fontWeight: '400',
  },
});
