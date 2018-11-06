import React from 'react';
import { View, Text, StyleSheet,AsyncStorage } from 'react-native';

import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';

class MyPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar title='自定义标签' style={{ backgroundColor: '#6495ED' }} />
        <Text style={styles.tips} onPress={() => { this.props.navigator.push({ component: CustomKeyPage, params: { ...this.props } }) }}>自定义标签</Text>
        <Text style={styles.tips} onPress={() => { this.props.navigator.push({ component: SortKeyPage, params: { ...this.props } }) }}>标签排序</Text>
        <Text onPress={()=>{AsyncStorage.clear()}}>1</Text>
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