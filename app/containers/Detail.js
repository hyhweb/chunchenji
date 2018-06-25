import React, { Component } from 'react'
import { StyleSheet, View, Image,Slider  } from 'react-native'
import { Container, Header, Content,Footer,Grid,Col, Card, CardItem,ListItem, Thumbnail, Input, Text, Button, Icon, Left, Body, Right,H1, H2, H3 } from 'native-base';
import { connect } from 'react-redux'

import Toast from 'react-native-root-toast';
import { NavigationActions } from '../utils'
import '../utils/constansts.js'
@connect()
class Detail extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      leaveMessage:'',
      detailInfo:{},
      messageList:[]
    };

  }
  static navigationOptions = {
    title: '详情',
  }
  _init(){
    var id = this.props.navigation.state.params.id;
    fetch('https://wxapi.chunchenji.com/api/services/SCMS/planService/GetList',{
      method:'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        planId:id,
        ...global.constansts.commonParam
      })
    })
    .then((response)=>(response.json()))
    .then((responseJson)=>{
      this.setState({
        detailInfo:responseJson.content[0]
      })
    })

  }
  _getLeaveMessage(){
    var id = this.props.navigation.state.params.id;
    fetch('https://wxapi.chunchenji.com/api/services/SCMS/messageService/GetList',{
      method:'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        planId:id,
        count: 10000,
        maxId: 0,
        ...global.constansts.commonParam
      })
    })
    .then((response)=>(response.json()))
    .then((responseJson)=>{
      this.setState({
        messageList:responseJson.content
      })
    })
  }

  _saveLeaveMessage(){


    if(this.state.leaveMessage == ""){
      Toast.show('留言不能为空',{
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          })
      return;
    }
    var id = this.props.navigation.state.params.id;
    fetch('http://wxapi.chunchenji.com/api/services/SCMS/messageService/Save',{
      method:'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        planId:id,
        content:this.state.leaveMessage,
        ...global.constansts.commonParam
      })
    })
    .then((response)=>(response.json()))
    .then((responseJson)=>{
      if(responseJson.code ==1000){

        Toast.show('提交成功',{
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          })
        this._getLeaveMessage()
      }
      
    })
  }
  componentDidMount(){
    this._init()
    this._getLeaveMessage()
  }
  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back())
  }

  render() {
    const { detailInfo, messageList } = this.state
    return (
      <Container style={styles.backgroundColor}>
        <Content>
          <View>
          <Image style={{height:250}} resizeMode="stretch" source={{uri:detailInfo.bannerImg}} />
          </View>
          <View style={{position:'relative'}}>
            <View style={{position:'absolute',top:-20,left:20}}>
              <Thumbnail  square source={{uri:detailInfo.wxAvatarUrl}} />
            <Text style={{position:'relative',top:-26,left:60}}>{detailInfo.nickName}</Text>
            </View>
          </View>
          <View style={{paddingTop:50,padding:20}}>
            <H3 >{detailInfo.title}</H3>
            <Text style={{paddingTop:10}} >{detailInfo.createdDate}|{detailInfo.planTypeName}</Text>
            <Text style={{paddingTop:10}} >{detailInfo.content}</Text>
            <Text style={{paddingTop:10}} >完成时间：{detailInfo.completeTime}</Text>
            <Text style={{paddingTop:10}} >完成情况：</Text>
            <View>
            <Slider disabled={false} minimumValue={1} maximumValue={100} step={1} value={detailInfo.progress}></Slider>
            </View>
            <Text style={{paddingTop:10}} >完成成果：</Text>
            <View>
                {
                  detailInfo.images && detailInfo.images.map((item,key)=>{
                    return (<View key={key} style={{marginTop:10,height:250}} >
                    <Image  resizeMode="stretch" source={{uri:item.imgUrl}} style={{height:250}}  />
                    </View>)
                  })
                }
            </View>
            <View style={{paddingBottom:20,paddingTop:20}}>
            <Grid>
              <Col>
                <Text>围观：{detailInfo.viewCount}</Text>
              </Col>
              <Col>
                <Text>点赞：{detailInfo.likeCount}</Text>
              </Col>
              <Col>
                <Text>关注：{detailInfo.friendCount}</Text>
              </Col>
            </Grid>
              
             
              
            </View>
            <View>
            <ListItem itemDivider>
              <Text>留言互动</Text>
            </ListItem>  
            {
              messageList && messageList.map((item,key)=>{
                return(<ListItem avatar  key={key}>
              <Left>
                <Thumbnail source={{ uri:item.wxAvatarUrl }} />
              </Left>
              <Body>
                <Text note>{item.nickName}</Text>
                <Text >{item.content}</Text>
              </Body>
            </ListItem>)
              })
            } 
            </View>
          </View>
        </Content>
        <Footer style={{backgroundColor:'#fff'}}>
        <Grid style={styles.flex}>
          <Col >
          <Input 
            placeholder='留言互动'
            onChangeText={(text) => this.setState({leaveMessage:text})}
            value={this.state.leaveMessage} />
          </Col>
          <Col style={{width:80}}>
          <Button small primary onPress={this._saveLeaveMessage.bind(this)}><Text>提交</Text></Button>
          </Col>
        </Grid>
          
        </Footer>
      </Container>
      
    )
  }
}

const styles = StyleSheet.create({
  backgroundColor:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Detail
