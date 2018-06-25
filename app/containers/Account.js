import React, { Component } from 'react'
import { StyleSheet, View, Image,ToastAndroid,AsyncStorage,Picker } from 'react-native'
import { connect } from 'react-redux'
import Toast from 'react-native-root-toast';
import RadioModal from 'react-native-radio-master';

import { createAction, NavigationActions } from '../utils'

import { Root,Container, Header, Content,Body,ListItem, Item,CheckBox, Input, Icon, Label,Button, Text  } from 'native-base';
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import CheckboxList from 'react-native-wayne-checkboxlist'

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
var sexData = [{
  text:'男',
  value:'1',
  disabled:false
},
{
  text:'女',
  value:'0',
  disabled:false
}]
@connect(({ app }) => ({ ...app }))
class Account extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      username:'',
      password:'',
      sex:true,
      initId:'',
      initItem:'',
      language:'',
      avatarSource:'http://c.hiphotos.baidu.com/image/h%3D300/sign=e7ea61e75dda81cb51e685cd6267d0a4/4bed2e738bd4b31ccd851da88bd6277f9e2ff86c.jpg'
    };
    this._imagePicker = this._imagePicker.bind(this); // bind
    this.upload =  this.upload.bind(this)
  }
  static navigationOptions = {
    title: '登录',
    tabBarLabel: '登录',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/person.png')}
      />
    ),
  }

 uploadImage = (url,params) => {
        let formData = new FormData();
         for (var key in params){
             formData.append(key, params[key]);
         }
        let file = {uri: params.imgUrl, type: 'multipart/form-data', name: 'image.jpg'};
        formData.append("file", file);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        })
        .then((response) => response.text())
        .then((responseData)=> {
                console.log('uploadImage', responseData);
         })
   
}

upload(){
  let params = {
    Timestamp:234232,
    Sign:23431,
    wxOpenId:"oa3NY5IJrOtsOHGdvgFNBImm0T_o",
    imgUrl:'file:///storage/emulated/0/Pictures/eb645893-4c00-44a3-a9b4-a2116e955f7c.jpg'    //本地文件地址
  }
  this.uploadImage('https://wxapi.chunchenji.com/api/services/SCMS/commonService/UploadImg',params)
}


_imagePicker() {
    ImagePicker.showImagePicker(options,(res) => {
        if (res.didCancel) {  // 返回
            return
        } else {
            let source;  // 保存选中的图片
            source = {uri: 'data:image/jpeg;base64,' + res.data};
            let params = {
                  Timestamp:234232,
                  Sign:23431,
                  wxOpenId:"oa3NY5IJrOtsOHGdvgFNBImm0T_o",
                  imgUrl:res.uri    //本地文件地址
                }
                this.uploadImage('https://wxapi.chunchenji.com/api/services/SCMS/commonService/UploadImg',params)

            if (Platform.OS === 'android') {
                source = { uri: res.uri };
                
            } else {
                source = { uri: res.uri.replace('file://','') };
            }

            this.setState({
                avatarSource: source
            });
        }
    })
}




  gotoLogin = () => {
        this._fetchData();
        // Toast.show({
        //       text: this.state.username+'&'+this.state.password,
        //       position: 'bottom',
        //       buttonText: 'Okay'
        //     })

            // ToastAndroid.showWithGravity(
            // this.state.username+'&'+this.state.password, 
            // ToastAndroid.SHORT,
            // ToastAndroid.CENTER
            // );
           
    //this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }

  logout = () => {
    this.props.dispatch(createAction('app/logout')())
  }
  _fetchData(){
    fetch('http://rap2api.taobao.org/app/mock/4987/POST/login',{
      method:'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((response)=>response.json())
    .then((responseJson)=>{

      // Toast.show(responseJson.message, {
      //   duration: Toast.durations.LONG,
      //   position: Toast.positions.CENTER,
      //   shadow: true,
      //   animation: true,
      //   hideOnPress: true,
      //   delay: 0
      // });
        AsyncStorage.setItem('@MySuperStore:username', this.state.username);
        this.props.dispatch(NavigationActions.navigate({ routeName: 'My' }))
    })
  }
  onValueChangeRadio(id,item){
    this.setState({initId: id,initItem:item});Toast.show(id+'&'+item)
  }
  render() {
    const { login } = this.props
    return (
      <Root>
      <Container style={{backgroundColor:'#fff'}}>
        <Content style={styles.pad10}>

          <Item fixedLabel>
            <Icon active name='person' />
            <Label>用户名</Label>
            <Input 
            placeholder='请输入用户名'
            onChangeText={(text) => this.setState({username:text})}
            value={this.state.username}
            />
          </Item>

          <Item fixedLabel>
            <Icon active name='unlock' />
            <Label>密码</Label>
            <Input 
            secureTextEntry={true}
            placeholder='请输入密码'
            onChangeText={(text) => this.setState({password:text})}
            value={this.state.password}
            />
          </Item>
          <Item >
          <Label style={{width:140}}>性别</Label>
          
          <Picker
                style={{width:80}}
                selectedValue={this.state.sex}
                onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
                <Picker.Item label="男" value="1" />
                <Picker.Item label="女" value="0" />
              </Picker>
          
          
          </Item>

          <View style={{marginTop:20}}>
            <Button block onPress={this.gotoLogin}>
            <Text>登录</Text>
          </Button>
          </View>

          <View style={{marginTop:20}}>
            <Button block onPress={this._imagePicker}>
            <Text>选择图片</Text>
          </Button>
          </View>
          <View style={{marginTop:20}}>
            <Button block onPress={this.upload}>
            <Text>上传图片</Text>
          </Button>
          </View>
          <View>
              <Image source={{uri:this.state.avatarSource}} style={{width:100,height:200}} />
          </View>
            <View>
                <ListItem>
            <CheckBox checked={this.state.sex} onPress={(value)=>{ this.setState({sex:!this.state.sex})}} />
            <Body>
              <Text>Daily Stand Up</Text>
            </Body>
          </ListItem>
            </View>
          <View>
            <CheckboxList
            options={[
              {label:'Lorem ipsum dolor sit',value:'A'},
              {label:'Lorem ipsum',value:'B'},
              {label:'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',value:'C'},
              {label:'Lorem ipsum dolor sit amet, consetetur',value:'D'}
              ]}
              selectedOptions={['A','C']}
              onSelection={(option)=>alert(option + ' was selected!')}
        />
          </View>
          <View>
              
          </View>
          <View>
              <Text>
                {this.state.language}
              </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  pad10:{
    padding:10
  }
})

export default Account
