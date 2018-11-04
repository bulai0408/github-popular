import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import NavigationBar from '../../common/NavigationBar';

import ViewUtils from '../../util/ViewUtils';
import { LanguageDao, FLAG_LANGUAGE } from '../../expand/dao/LanguageDao';

class CustomKeyPage extends React.Component {
  constructor(props) {
    super(props);
    this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
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
  onSave = () => {
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
            <Text>{dataArray[i].name}</Text>
            <Text>{dataArray[i + 1].name}</Text>
          </View>
          <View style={styles.line} />
        </View>
      )
    }
    views.push(
      <View>
        <View style={styles.item}>
          {len % 2 === 0 && <Text>{dataArray[len - 2].name}</Text>}
          <Text>{dataArray[len - 1].name}</Text>
        </View>
        <View style={styles.line} />
      </View>
    )
    return views
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
          leftButton={ViewUtils.getLeftButton(this.onSave)}
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
    height: 1,
    backgroundColor: 'black'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default CustomKeyPage;