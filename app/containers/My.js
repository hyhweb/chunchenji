import React, { Component } from 'react'
import { StyleSheet, View, Image,ToastAndroid,AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast';


import { createAction, NavigationActions } from '../utils'

import { Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch,Thumbnail } from 'native-base';

@connect()
class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sumPlanData:{
        "total": 0,
        "completeCount": 0,
        "friendCount": 0,
        "messageCount": 0
      }
    };
  }
  static navigationOptions = {
    title: '我的',
    tabBarLabel: '我的',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />
    ),
  }
  _fatchData = () => {
    var param = {
      ...global.constansts.commonParam,
        "sumType": 99
      }
    fetch('http://wxapi.chunchenji.com/api/services/SCMS/planService/SumPlanByMe',{
      method:'post',
       headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(param)
    })
      // 转换成 Text  是为了当意外发生时,更容易锁定错误
      .then((response) => {
        this.setState({ refreshing: false });
        return response.json();
      }).then((responseText) => {
        let data = responseText.content;
        this.setState({ sumPlanData: data });
      }).catch((error) => {
        console.error(error);
      });
  }
  componentDidMount(){
       this._fatchData()
  }
  render(){
    const { navigate } = this.props.navigation;
    const {sumPlanData} = this.state;
    return(<Container>
        <Content>
        <View style={styles.container}>
            <View><Thumbnail large source={{uri: 'https://wx.qlogo.cn/mmopen/vi_32/GxSJeib3icTSZdzLs7WicBAibXrRuohCC5h4ey7uAcXonM7loGIPNFeqyklmicibRoX9k2jNGUfGUYIkQs6h0ATpcbPA/0'}} /></View>
             <View style={{padding:10}}><Text>Colin</Text></View>
        </View>
          <List>
            <ListItem icon style={{ marginLeft:0, paddingLeft: 10 }}
             onPress={()=>{
              navigate('MyPlanList')
            }}>
              <Left>
                <Icon name="rose" />
              </Left>
              <Body>
                <Text>我的春晨计</Text>
              </Body>
             <Right>
                <Text>全部{sumPlanData.total}|实现{sumPlanData.completeCount}</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon style={{ marginLeft:0, paddingLeft: 10 }} 
            onPress={()=>{
              navigate('FocusPlanList')
            }}>
              <Left>
                <Icon name="heart" />
              </Left>
              <Body>
                <Text>关注的春晨计</Text>
              </Body>
              <Right>
                <Text>{sumPlanData.friendCount}</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon style={{ marginLeft:0, paddingLeft: 10 }}
            onPress={()=>{
              navigate('LeaveMessageList')
            }}>
              <Left>
                <Icon name="chatbubbles" />
              </Left>
              <Body>
                <Text>留言的春晨计</Text>
              </Body>
              <Right>
                <Text>{sumPlanData.messageCount}</Text>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>)
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    marginBottom:20
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
export default My