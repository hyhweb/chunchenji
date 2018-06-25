import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon,Right } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  },
  {
    text: 'Card One2',
    name: 'One2',
    image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
  }
];
export default class DeckSwiperExample extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      dataList:[],
      refreshing:false
    };
  }

    _fatchData = () => {
         var param = {
      ...global.constansts.commonParam,
        "count": 5,
        "maxId": (this.state.dataList.length == 0?0:this.state.dataList[this.state.dataList.length-1].planId),
      }
    fetch('http://wxapi.chunchenji.com/api/services/SCMS/planService/GetList',{
      method:'post',
       headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(param)
    })
      // 转换成 Text  是为了当意外发生时,更容易锁定错误
      .then((response) => {
        return response.json();
      }).then((responseText) => {
        let arrData = responseText.content;
        let arrList = [];
         arrList = this.state.dataList.concat(arrData)
        this.setState({ dataList: arrList,  refreshing: false });

        // console.log(this.state);

      }).catch((error) => {
        console.error(error);
      });
  }
  _renderItem(item){

  }
  componentDidMount() {
   
    // 初始化数据
    this._fatchData()
  }
  render() {
    return (
      <Container>
        <View style={{padding:10}}>
        {
          this.state.dataList.length !=0 &&
          <DeckSwiper
            dataSource={this.state.dataList}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri:item.wxAvatarUrl}} />
                    <Body>
                      <Text>{item.title}{item.planId}</Text>
                      <Text note>{item.content}</Text>
                    </Body>
                  </Left>
                </CardItem>
            <CardItem cardBody>
              <Image source={{uri:item.bannerImg}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Text>名称</Text>
              <Text>围观{item.viewCount}</Text>

            </CardItem>
               <CardItem>



               <Left>
                  <Text>围观{item.viewCount}</Text>
                
              </Left>
              <Body>
                  <Text>点赞{item.likeCount}</Text>
               
              </Body>
              <Right>
               
                <Text>关注{item.friendCount}</Text>
              </Right>


               </CardItem>
              </Card>
            }
          />
        }
          
        </View>
      </Container>
    );
  }
}