import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert, ListView, FlatList, RefreshControl } from 'react-native'

import { Root, Container, Header, Content, Button, ActionSheet, Toast, List, ListItem, Thumbnail, Text, Body, Icon } from 'native-base';
import LoadMoreFooter from './LoadMoreFooter'
import { connect } from 'react-redux'
@connect()
class ListVidewDemo extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      products: [
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') }
      ],
      dataSource: ds.cloneWithRows([
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') }
      ])
    }
  }
  _onRefresh() {
    this.setState({
      products: [
        { title: '222', url: require('../images/house.png') },
        { title: '3333', url: require('../images/house.png') },
        { title: '444', url: require('../images/house.png') },
        { title: '555', url: require('../images/house.png') },
        { title: '6666', url: require('../images/house.png') },
        { title: '777', url: require('../images/house.png') }
      ]
    })
  }
  _toEnd() {
    this._loadMoreData();
  }
  _loadMoreData() {
    var data = this.state.products;
    this.setState({
      products: data.concat([
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') },
        { title: '11111', url: require('../images/house.png') }
      ])
    })

  }
  _renderFooter() {
    return <LoadMoreFooter / >
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ( <ListView style = { styles.listViewContent } dataSource = { ds.cloneWithRows(this.state.products) } renderRow = {
        (item) => < View > < Text > { item.title } < /Text><Image style={styles.imgWH}  source={item.url}></Image > < /View>}
        onEndReached = { this._toEnd.bind(this) }
        onEndReachedThreshold = { 10 }
        renderFooter = { this._renderFooter.bind(this) }
        enableEmptySections = { true }
        refreshControl = { <RefreshControl
          refreshing = { false }
          onRefresh = { this._onRefresh.bind(this) }
          tintColor = "gray"
          colors = {
            ['#ff0000', '#00ff00', '#0000ff'] }
          progressBackgroundColor = "gray" / >
        }
        />

      )
    }


  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    icon: {
      width: 32,
      height: 32,
    },
    imgWH: {
      width: 50,
      height: 50
    }
  })
  export default ListVidewDemo
