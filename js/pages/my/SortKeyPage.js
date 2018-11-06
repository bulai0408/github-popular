import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Alert } from 'react-native';
import SortableListView from 'react-native-sortable-listview';

import NavigationBar from '../../common/NavigationBar';
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';
import ArrayUtils from '../../util/ArrayUtils';
import ViewUtils from '../../util/ViewUtils';

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

  onBack = () => {
    if (ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigator.pop();
      return;
    };
    Alert.alert('提示', '是否保存修改？', [
      { text: '不保存', onPress: () => { this.props.navigator.pop() }, style: 'cancel' },
      { text: '保存', onPress: () => { this.onSave(true) } },
    ])
  }

  onSave = (isChecked) => {
    if ((!isChecked) && ArrayUtils.isEqual(this.originalCheckedArray, this.state.checkedArray)) {
      this.props.navigator.pop();
      return;
    }
    this.getSortResult();
    this.LanguageDao.save(this.sortResultArray);
    this.props.navigator.pop();
  }

  getSortResult = () => {
    this.sortResultArray = ArrayUtils.clone(this.dataArray);
    for (let i = 0; i < this.originalCheckedArray.length; i++) {
      let item = this.originalCheckedArray[i];
      let index = this.dataArray.indexOf(item);
      this.sortResultArray.splice(index, 1, this.state.checkedArray[i]);
    }
  }

  render() {
    const rightButton = (
      <TouchableOpacity onPress={this.onSave} style={{ alignItems: 'center' }}>
        <View style={{ marginRight: 10 }}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <NavigationBar
          title='我的'
          leftButton={ViewUtils.getLeftButton(this.onBack)}
          rightButton={rightButton}
        />
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.checkedArray}
          order={Object.keys(this.state.checkedArray)}
          onRowMoved={e => {
            this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
            this.forceUpdate();
          }}
          renderRow={row => <SortCell data={row} />}
        />
      </View>
    )
  }
}

const SortCell = (props) => (
  <TouchableHighlight
    underlayColor='#eee'
    delayLongPress={500}
    style={styles.item}
    {...props.sortHandlers}
  >
    <View style={styles.row}>
      <Image style={styles.img} source={require('../img/ic_sort.png')} />
      <Text> {props.data.name} </Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 29
  },
  item: {
    padding: 25,
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#eee'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    tintColor: '#2196F3',
    width: 16,
    height: 16,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF'
  }
});

export default SortKeyPage;