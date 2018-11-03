import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'


import WelcomePage from './WelcomePage';

const setup = () => {
  //初始化配置
  class Root extends Component {

    renderScene = (route, navigator) => {
      const Component = route.component;
      return <Component {...route.params} navigator={navigator} />
    }

    render() {
      return (
        <Navigator
          initialRoute={{ component: WelcomePage }}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
        />
      )
    }
  }
  return <Root />
}

export default setup;