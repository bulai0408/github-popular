import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';

import NavigationBar from '../../common/NavigationBar';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import HomePage from '../HomePage';
class CustomKeyPage extends React.Component {
  constructor(props) {
    super(props);
    this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    this.changeValues = [];
    this.state = {
      dataArray: []
    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.LanguageDao.fetch().then(res => {
      console.log(res);
      this.setState({ dataArray: res })
    })
      .catch(error => {
        console.log(error);
      })
  }

  onBack = () => {
    if (this.changeValues.length === 0) {
      this.props.navigator.pop();
      return;
    }
    Alert.alert('提示', '是否保存修改？', [
      { text: '不保存', onPress: () => { this.props.navigator.pop() }, style: 'cancel' },
      { text: '保存', onPress: () => { this.onSave() } },
    ])
  }

  onSave = () => {
    if (this.changeValues.length === 0) {
      this.props.navigator.pop();
      return;
    }
    this.LanguageDao.save(this.state.dataArray)
    this.props.navigator.pop();
  }

  renderView = () => {
    const { dataArray } = this.state;
    if (!dataArray || dataArray.length === 0) return null;
    const len = dataArray.length;
    let views = [];
    for (let i = 0; i < len - 2; i += 2) {
      views.push(
        <View key={i.toString()}>
          <View style={styles.item}>
            {this.renderCheckBox(dataArray[i])}
            {this.renderCheckBox(dataArray[i + 1])}
          </View>
          <View style={styles.line} />
        </View>
      )
    }
    views.push(
      <View key={(len - 1).toString()}>
        <View style={styles.item}>
          {len % 2 === 0 && this.renderCheckBox(dataArray[len - 2])}
          {this.renderCheckBox(dataArray[len - 1])}
        </View>
        <View style={styles.line} />
      </View>
    )
    return views
  }

  onClick = (itemIndex, data) => {
    const { dataArray } = this.state;
    dataArray[itemIndex].checked = !dataArray[itemIndex].checked;
    ArrayUtils.updateArray(this.changeValues, data);
    this.setState({ dataArray });
  }

  renderCheckBox = (data) => {
    const { dataArray } = this.state;
    const leftText = data.name;
    const itemIndex = dataArray.findIndex(i => i.name === data.name && i.path === data.path);
    return <CheckBox
      style={{ flex: 1, padding: 10 }}
      onClick={() => { this.onClick(itemIndex, data) }}
      // onClick={() => { this.onClick(data) }}
      isChecked={dataArray[itemIndex].checked}
      // isChecked={data.checked}
      leftText={leftText}
      checkedImage={<Image style={{ tintColor: '#6495ED' }} source={require('../img/ic_check_box.png')} />}
      unCheckedImage={<Image style={{ tintColor: '#6495ED' }} source={require('../img/ic_check_box_outline_blank.png')} />}
    />
  }

  render() {
    const rightButton = (
      <TouchableOpacity onPress={this.onSave}>
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>
    )

    return (
      <View style={styles.container}>
        <NavigationBar
          title='自定义标签'
          style={{ backgroundColor: '#6495ED' }}
          leftButton={ViewUtils.getLeftButton(this.onBack)}
          rightButton={rightButton}
        />
        <ScrollView>
          {this.renderView()}
          {/* <Text style={styles.tips} onPress={() => { this.props.navigator.push({ component: CustomKeyPage, params: { ...this.props } }) }}>自定义标签</Text> */}
        </ScrollView>
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
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  line: {
    height: 0.5,
    backgroundColor: 'black'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CustomKeyPage;