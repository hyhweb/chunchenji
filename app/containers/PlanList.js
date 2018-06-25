import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Alert, ListView, FlatList } from 'react-native'
import { Root, Container, Header, Content,  Button, ActionSheet, Toast, List, ListItem, Thumbnail, Text, Body, Icon,ScrollableTab, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux'
import { createAction, NavigationActions } from '../utils'
import DataList from './DataList'

@connect()
class PlanList extends Component {
  dataContainer = [];

  constructor(props) {
    super(props);

    this.state = {
      sourceData: [],
      refreshing: false

    }
  }
  static navigationOptions = {
    title: '春晨计',
    tabBarLabel: '春晨计',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    )
  }
  
  render() {
    return ( 
    <Container>
        <View hasTabs />
        <Tabs  initialPage={2}  renderTabBar={()=> <ScrollableTab  />}>
          <Tab  textStyle={{color:'#fff'}} heading="生活">
            <DataList 
            navigation={this.props.navigation}
             type="1"></DataList>
          </Tab>
          <Tab textStyle={{color:'#fff'}} heading="事业">
           <DataList 
           navigation={this.props.navigation}
            type="2"></DataList>
          </Tab>
          <Tab  textStyle={{color:'#fff'}} heading="学习">
            <DataList 

            navigation={this.props.navigation}
             type="3"></DataList>
          </Tab>
          <Tab  textStyle={{color:'#fff'}} heading="读书">
           <DataList navigation={this.props.navigation} type="4"></DataList>
          </Tab>
          <Tab  textStyle={{color:'#fff'}} heading="旅游">
            <DataList navigation={this.props.navigation} type="5"></DataList>
          </Tab>
        </Tabs>
      

      </Container>
    );
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
  imgWH:{
    width:50,
    height:50
  }
})


export default PlanList

