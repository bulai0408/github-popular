import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, ListView, FlatList, RefreshControl } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      text: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          statusBar={{
            backgroundColor: '#2196F3'
          }}
        />
        <ScrollableTabView
          style={{ flex: 1 }}
          tabBarBackgroundColor='#2196F3'
          tabBarInactiveTextColor='mintcream'
          tabBarActiveTextColor='white'
          tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <PopularTab tabLabel='Java' />
          <PopularTab tabLabel='Ios' />
          <PopularTab tabLabel='JavaScript' />
          <PopularTab tabLabel='Python' />
        </ScrollableTabView>
      </View>
    )
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: '',
      dataSource: [],
      isLoading: false
    }
  }

  componentDidMount = () => {
    this.loadData();
  }
  loadData = () => {
    this.setState({ isLoading: true })
    const { text } = this.state;
    const url = URL + this.props.tabLabel + QUERY_STR;
    this.dataRepository.fetchNetRepository(url)
      .then(res => this.setState({ dataSource: res.items, isLoading: false }))
      .catch(error => this.setState({ result: error }))
  }

  renderItem = (data) => <RepositoryCell data={data.item} />

  keyExtractor = (item, index) => (item.id).toString();

  render() {
    const { dataSource, isLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataSource}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          refreshControl={
            <RefreshControl
              title='玩命加载中...'
              colors={['#2196F3']}
              tintColor='#2196F3'
              titleColor='#2196F3'
              refreshing={isLoading}
              onRefresh={this.loadData}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})