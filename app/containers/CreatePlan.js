import React, { Component } from 'react'
import { StyleSheet, View, Image,ToastAndroid,AsyncStorage,TouchableOpacity } from 'react-native'
import { Root,Container, Header, Content, Item,Form, Input,Picker, Icon, Label,Button, Text  } from 'native-base';
import { connect } from 'react-redux'
import { createAction, NavigationActions } from '../utils'
import '../utils/constansts.js'

import Toast from 'react-native-root-toast';
import DatePicker from 'react-native-datepicker'


var options = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    maxWidth: 600,      // 加了这两句控制大小
    maxHeight: 600,     // 加了这两句控制大小  
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
@connect(({ app }) => ({ ...app }))
class CreatePlan extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
      title:'',
      content:'',
      planType:'',
      public:'',
      completeTime:"",
      wxOpenId:"oa3NY5IJrOtsOHGdvgFNBImm0T_o",
      paramText:''
    };
    this.submit = this.submit.bind(this)
	}
	static navigationOptions = {
    title: '创建春晨计',
    tabBarLabel: '创建',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />
    ),
  }
  componentDidMount(){

  }
  onValueChangeType(value) {
    this.setState({
      planType: value
    });
  }

onValueChangevisibleType(value) {
    this.setState({
      public: value
    });
  }

  submit(){
    const { navigate } = this.props.navigation;

    
    var param = {
      "wxOpenId":"oa3NY5IJrOtsOHGdvgFNBImm0T_o",
      "wxAvatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/GxSJeib3icTSZdzLs7WicBAibXrRuohCC5h4ey7uAcXonM7loGIPNFeqyklmicibRoX9k2jNGUfGUYIkQs6h0ATpcbPA/0",
      "nickName":"Colin",
      "timeStamp":"1521618284467",
      "sign":"t324096837982gghdlsjk1521618284467",
      "bannerImg":"http://p4v6ss0jq.bkt.clouddn.com/weixin/7fb651b3-657d-419e-b17f-731bbbcc3a30.png",
      ...this.state
    }
    fetch('https://wxapi.chunchenji.com/api/services/SCMS/planService/SavePlan', {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(param)
        })
    .then((response)=>{
      return response.json()
    })
    .then((json)=>{
        
        Toast.show(JSON.stringify(json))
        this.setState({
          paramText:JSON.stringify(json)
        })
        if(json.code ==1000){
          Toast.show('创建成功',{
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          })
          navigate('CreatePlanFinish',{
            id:json.content.planId
          })
        }else{
          Toast.show('创建失败',{
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
          })
        }

    })


  }

  render(){
  	return(
		<Container style={{backgroundColor:'#fff'}}>
        <Content style={{padding:20}}>
          <Form>
            <Item inlineLabel>
              <Label>名称</Label>
              <Input 
                placeholder="请输入名称"
                value={this.state.title}
                onChangeText={(text)=>this.setState({title:text})}
               />
            </Item>
            <Item inlineLabel >
              <Label>描述</Label>
              <Input 
                placeholder="请输入描述"
                value={this.state.content}
                onChangeText={(text)=>this.setState({content:text})}
                />
            </Item>
            <Item inlineLabel last>
              <Label>类型</Label>
              
                   <Picker
                   style={{width:'80%'}}
              mode="dropdown"
              placeholder="请选择类型"
              note={false}
              selectedValue={this.state.planType}
              onValueChange={this.onValueChangeType.bind(this)}
            >
            {
              constansts.type.map((row)=>(
                <Picker.Item label={row.text} value={row.value} />
              ))
            }
            </Picker>
              
            </Item>
            <Item inlineLabel>
              <Label>可见对象</Label>
              
                   <Picker
                   style={{width:'80%'}}
              mode="dropdown"
              placeholder="请选择可见对象"
              note={false}
              selectedValue={this.state.public}
              onValueChange={this.onValueChangevisibleType.bind(this)}
            >
            {
              constansts.visibleType.map((row)=>(
                <Picker.Item label={row.text} value={row.value} />
              ))
            }
            </Picker>
              
            </Item>
            <Item inlineLabel last>
              <Label>完成时间</Label>
              <DatePicker
        style={{width: '70%'}}
        date={this.state.completeTime}
        mode="date"
        placeholder="选择时间"
        format="YYYY-MM-DD"
        confirmBtnText="确定"
        cancelBtnText="取消"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            right: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            //marginLeft: 36
            
          }
        }}
        onDateChange={(date) => {this.setState({completeTime: date})}}
      />
            </Item>
          </Form>
         
          <View style={{marginTop:20}}>
              <Button block onPress={this.submit.bind(this)}>
                <Text>提交完成</Text>
              </Button>
          </View>
          <View>
              <Text>
                  {this.state.paramText}
              </Text>
          </View>
        </Content>
      </Container>
  	)
  }

}
const styles = StyleSheet.create({
icon:{
	width:32,
	height:32
}
})
export default CreatePlan;