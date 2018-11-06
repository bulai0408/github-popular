import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, ListView, FlatList, RefreshControl, DeviceEventEmitter } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import NavigationBar from '../common/NavigationBar';
import DataRepository from '../expand/dao/DataRepository';
import RepositoryCell from '../common/RepositoryCell';
import LanguageDao, { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.LanguageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.state = {
      languages: []
    }
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {
    this.LanguageDao.fetch().then(res => {
      console.log(res);
      this.setState({ languages: res })
    })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { languages } = this.state;
    const languageViews = languages.map(item => (
      item.checked ? <PopularTab key={item.name} tabLabel={item.name} {...this.props} /> : null
    ));
    const content = languages.length > 0 ? (
      <ScrollableTabView
        style={{ flex: 1 }}
        tabBarBackgroundColor='#2196F3'
        tabBarInactiveTextColor='mintcream'
        tabBarActiveTextColor='white'
        tabBarUnderlineStyle={{ backgroundColor: '#e7e7e7', height: 2 }}
        renderTabBar={() => <ScrollableTabBar />}
      >
        {languageViews}
      </ScrollableTabView>
    ) : null;
    return (
      <View style={styles.container}>
        <NavigationBar
          title='最热'
          statusBar={{
            backgroundColor: '#2196F3'
          }}
        />
        {content}
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
    const url = this.genFetchUrl(this.props.tabLabel);
    this.dataRepository.fetchRepository(url)
      .then(res => {
        const items = res && res.items ? res.items : (res ? res : []);
        this.setState({ dataSource: items, isLoading: false });
        if (res && res.update_date && (!this.dataRepository.checkData(res.update_date))) {
          DeviceEventEmitter.emit('showToast', '数据过时')
          return this.dataRepository.fetchNetRepository(url)
        } else {
          DeviceEventEmitter.emit('showToast', '显示缓存数据')
        }
      })
      .then(res => {
        const { items } = res;
        if (!items || items.length === 0) return;
        this.setState({
          dataSource: items
        })
        DeviceEventEmitter.emit('showToast', '显示网络最新数据');
      })
      .catch(error => this.setState({ isLoading: false }))
  }

  genFetchUrl = (key) => URL + key + QUERY_STR;

  onSelect = (item) => {
    this.props.navigator.push({
      component: RepositoryDetail,
      params: {
        item,
        ...this.props
      }
    })
  }

  renderItem = (data) => <RepositoryCell
    onSelect={() => this.onSelect(data)}
    key={data.id} 
    data={data.item}
  />

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