import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

const NAVBAR_HEIGHT_ANDROID = 50;
const NAVBAR_HEIGHT_IOS = 44;
const STATUS_BAR_HEIGHT = 20;
const StatusBarShape = {
  backgroundColor: PropTypes.string,
  barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
  hidden: PropTypes.bool
}

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      hide: false
    }
  }

  static propTypes = {
    title: PropTypes.string,
    titleView: PropTypes.element,
    hide: PropTypes.bool,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    statusBar: PropTypes.shape(StatusBarShape)
  }

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false
    }
  }

  render() {
    const { titleView, title, leftButton, rightButton } = this.props;

    const status = (<View style={[styles.statusBar, this.props.statusBar]}>
      <StatusBar {...this.props.statusBar} />
    </View>)
    const thisTitleView = titleView ? titleView : <Text style={styles.title}>{title}</Text>
    const content = (<View style={styles.navBar}>
      {leftButton}
      <View style={styles.titleViewContainer}>{thisTitleView}</View>

      {rightButton}
    </View>);
    return (
      <View style={[styles.container, this.props.style]}>
        {status}
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#2196F3'
  },
  navBar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAVBAR_HEIGHT_IOS : NAVBAR_HEIGHT_ANDROID,
    flexDirection: 'row'
  },
  titleViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,

  }
})