/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import Main from './src/components/Main';
import Challenge from './src/components/Challenge';
import TakenChallenges from './src/components/TakenChallenges';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 2
    }
  }

  render() {
    const { pageIndex } = this.state;
    return (
      <View style={styles.container}>
        { pageIndex === 0 && <Main />}
        { pageIndex === 1 && <Challenge />}
        { pageIndex === 2 && <TakenChallenges />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});
