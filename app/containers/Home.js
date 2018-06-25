import React, { Component } from 'react'
import { StyleSheet, View, Image, Alert,ListView,FlatList } from 'react-native'

import {Root, Container, Header, Content,Button, ActionSheet,Toast,List, ListItem, Thumbnail, Text, Body,Icon } from 'native-base';

import { connect } from 'react-redux'


import { NavigationActions } from '../utils'
var productList = [
      {
        title:'淼鑫猪肚鸡',
      text:'[中心城]双人管饱喵A餐，提供免费WiFi',
      url:'http://p0.meituan.net/200.0/deal/84b9499ff25010f80d64de6fee315a2a113094.jpg'
    },
      {
        title:'淼鑫猪肚鸡',
      text:'[中心城]双人管饱喵A餐，提供免费WiFi',
      url:'http://p0.meituan.net/200.0/deal/84b9499ff25010f80d64de6fee315a2a113094.jpg'
    },
      {
        title:'淼鑫猪肚鸡',
      text:'[中心城]双人管饱喵A餐，提供免费WiFi',
      url:'http://p0.meituan.net/200.0/deal/84b9499ff25010f80d64de6fee315a2a113094.jpg'
    },
      {
        title:'淼鑫猪肚鸡',
      text:'[中心城]双人管饱喵A餐，提供免费WiFi',
      url:'http://p0.meituan.net/200.0/deal/84b9499ff25010f80d64de6fee315a2a113094.jpg'
    },
      {
        title:'淼鑫猪肚鸡',
      text:'[中心城]双人管饱喵A餐，提供免费WiFi',
      url:'http://p0.meituan.net/200.0/deal/84b9499ff25010f80d64de6fee315a2a113094.jpg'
    }
]
var BUTTONS = [
  { text: "Option 0", icon: "american-football", iconColor: "#2c8ef4" },
  { text: "Option 1", icon: "analytics", iconColor: "#f42ced" },
  { text: "Option 2", icon: "aperture", iconColor: "#ea943b" },
  { text: "Delete", icon: "trash", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
@connect()
class Home extends Component {
  constructor(props) {
    super(props);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows([
          {title:'11111',url:require('../images/house.png')},
          {title:'11111',url:require('../images/house.png')},
           {title:'11111',url:require('../images/house.png')},
            {title:'11111',url:require('../images/house.png')}
          ]),
        datas:[
          {key:1,title:'11111',url:require('../images/house.png')},
          {key:2,title:'222',url:require('../images/house.png')},
           {key:3,title:'333',url:require('../images/house.png')},
            {key:4,title:'444',url:require('../images/house.png')}
          ],
         clicked:''
      };
  }
  static navigationOptions = {
    title: '首页',
    tabBarLabel: '首页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    )
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  render() {
    return (
      <Root>
        <Container>
        <Content >

        <View>
        <FlatList
        numColumns ={2}
          data={this.state.datas}
          renderItem={({item}) => <View><Text>{item.title}</Text><Image style={styles.imgWH}  source={item.url}></Image></View>}
          keyExtractor={(item, index) => item.key}
           onEndReachedThreshold={0.1}
           onEndReached={(info) => {
                            alert("滑动到底部了");
                        } }
          refreshing={false}
          onRefresh={(distanceFromEnd)=>{
            alert('正在刷新中.... ');
          }}
        />
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item) => <View><Text>{item.title}</Text><Image style={styles.imgWH}  source={item.url}></Image></View>}
        />
        


          <List >

          {
            productList.map((item,key)=>{
              return <ListItem key={key}  style={{ marginLeft:0, paddingLeft: 10 }}>
              <Thumbnail  square size={180} source={{uri:item.url}} />
              <Body>
                <Text>{item.title}</Text>
                <Text note>{item.text}</Text>
              </Body>
            </ListItem>
            }
            )

          }
            
          </List>

          <View style={{padding:10}}>
            <Button
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Testing ActionSheet"
              },
              buttonIndex => {
                let text = BUTTONS[buttonIndex].text;
                Alert.alert(
                'Alert Title',
                text,
                [
                  {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: '确定', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
                this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}
          >
            <Text>Actionsheet tip</Text>
          </Button>
                
          </View>
</Content>
      </Container>
      </Root>
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
  imgWH:{
    width:50,
    height:50
  }
})

export default Home

