import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

export default class ViewUtils {
  static getLeftButton(callback) {
    return (
      <TouchableOpacity
        style={{ padding: 8 }}
        onPress={callback}
      >
        <Image style={{ width: 26, height: 26, tintColor: 'yellow' }} source={require('../../res/images/ic_arrow_back_white_36pt.png')} />
      </TouchableOpacity>
    )
  }
}