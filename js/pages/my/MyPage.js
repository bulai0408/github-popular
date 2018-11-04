import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';

class MyPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title='自定义标签' style={{ backgroundColor: '#6495ED' }} />
        <Text style={styles.tips} onPress={() => { this.props.navigator.push({ component: CustomKeyPage, params: { ...this.props } }) }}>自定义标签</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 29
  }
});

export default MyPage;