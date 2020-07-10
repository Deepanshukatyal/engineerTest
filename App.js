/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Root} from 'native-base'
import AppContainer from './app/Navigation'
class App extends Component{
render(){
  return(
    <Root>
      <AppContainer/>
    </Root>
  )
}
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  
});

export default App;
