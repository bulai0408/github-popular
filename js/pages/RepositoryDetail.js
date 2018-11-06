import React from 'react';
import { View, Text, StyleSheet, WebView, TextInput, DeviceEventEmitter } from 'react-native';

import NavigationBar from '../common/NavigationBar';
import ViewUtils from '../util/ViewUtils';

class RepositoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.item.item.html_url,
      title: this.props.item.item.full_name,
      text: '',
      canGoBack: false,
    }
  }

  go = () => {
    this.setState({
      url: this.state.text
    })
  }

  goBack = () => {
    if (this.state.canGoBack) {
      this.web_view.goBack();
    } else {
      DeviceEventEmitter.emit('showToast', '到顶了');
    }
  }

  onNavigationStateChange = (e) => {
    this.setState({
      canGoBack: e.canGoBack
    })
  }

  onBack = () => {
    if (this.state.canGoBack) {
      this.web_view.goBack();
    } else {
      this.props.navigator.pop();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.state.url}
          style={{ backgroundColor: '#6495ED' }}
          leftButton={ViewUtils.getLeftButton(this.onBack)}
        />
        {/* <View style={styles.row}>
          <Text onPress={this.goBack} style={styles.tips} >返回</Text>
          <TextInput style={styles.input} onChangeText={text => this.setState({ text })} />
          <Text onPress={this.go} style={styles.tips} >前往</Text>
        </View> */}
        <WebView
          source={{ uri: this.state.url }}
          onNavigationStateChange={this.onNavigationStateChange}
          ref={ref => this.web_view = ref}
          startInLoadingState={true}
        />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    margin: 2
  },
  tips: {
    fontSize: 20
  }
});

export default RepositoryDetail;