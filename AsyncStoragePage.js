import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, TextInput } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import NavigationBar from './js/common/NavigationBar';

const KEY = 'text';
class AsyncStoragePage extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '' }
  }

  onSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, this.state.text, () => {
        this.toast.show('保存成功', DURATION.LENGTH_LONG);
      });
    } catch (error) {
      this.toast.show('保存失败', DURATION.LENGTH_LONG)
    }
  }

  onRemove = async () => {
    try {
      await AsyncStorage.removeItem(KEY, () => {
        this.toast.show('移除成功', DURATION.LENGTH_LONG);
      });
    } catch (error) {
      this.toast.show('移除失败', DURATION.LENGTH_LONG)
    }
  }

  onGet = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY);
      this.toast.show(value !== null ? `取出成功,内容为:${value}` : '取出失败,key不存在', DURATION.LENGTH_LONG);
    } catch (error) {
      console.log(error);
      this.toast.show('取出失败', DURATION.LENGTH_LONG)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TextInput style={{ borderWidth: 1, height: 40, margin: 6 }} onChangeText={(text) => this.setState({ text })} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.tips} onPress={this.onSave}>保存</Text>
          <Text style={styles.tips} onPress={this.onRemove}>移除</Text>
          <Text style={styles.tips} onPress={this.onGet}>取出</Text></View>
        <Toast ref={toast => this.toast = toast} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 29,
    margin: 5
  }
})

export default AsyncStoragePage;