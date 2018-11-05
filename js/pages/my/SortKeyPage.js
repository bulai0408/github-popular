import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';

class SortKeyPage extends React.Component {
  constructor(props) {
    super(props);
    this.dataArray = [];
    this.sortResultArray = [];
    this.originalCheckedArray = [];
    this.state = {
      checkedArray: []
    }
  }

  componentDidMount = () => {
    this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.loadData();
  }

  loadData = () => {
    this.LanguageDao.fetch().then(res => {
      this.getCheckedItems(res);
    })
      .catch(error => {
        console.log(error);
      })
  }

  getCheckedItems = (result) => {
    this.dataArray = result;
    let checkedArray = [];
    for (let i = 0; i < result.length; i++) {
      let data = result[i];
      if (data.checked) checkedArray.push(data);
    }
    this.setState({
      checkedArray
    });
    this.originalCheckedArray = ArrayUtils.clone(checkedArray);
  }

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

export default SortKeyPage;