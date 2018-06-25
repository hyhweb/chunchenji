import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, View, Image, Alert, ListView, FlatList } from 'react-native'
import { Root, Container, Header, Content, Button, ActionSheet, Toast, List, ListItem, Thumbnail, Text, Body, Icon } from 'native-base';
import { connect } from 'react-redux'
import { NavigationActions } from '../../utils'
import '../../utils/constansts.js'
@connect(({ app }) => ({ ...app }))
class planDataList extends Component {
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
        source={require('../../images/house.png')}
      />
    )
  }
  _fatchData(){
     var param = {
      ...global.constansts.commonParam,
        wxOpenId:undefined,
        "count": 5,
        "maxId": (this.state.sourceData.length == 0?0:this.state.sourceData[this.state.sourceData.length-1].planId),
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

        this.setState({ refreshing: false });
        return response.json();

      }).then((responseText) => {
        let arrData = responseText.content;
        let arrList = [];
         arrList = this.state.sourceData.concat(arrData)

        this.setState({ sourceData: arrList,  refreshing: false });
        // console.log(this.state);

      }).catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
   
    // 初始化数据
    this._fatchData()
  }
  
  /**
   * 此函数用于为给定的item生成一个不重复的Key。
   * Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。
   * 若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标
   *
   * @param item
   * @param index
   * @private
   */
  _keyExtractor = (item, index) => index;

  /**
   * 使用箭头函数防止不必要的re-render；
   * 如果使用bind方式来绑定onPressItem，每次都会生成一个新的函数，导致props在===比较时返回false，
   * 从而触发自身的一次不必要的重新render，也就是FlatListItem组件每次都会重新渲染。
   *
   * @param id
   * @private
   */
  _onPressItem(id,navigate){
   // navigate('Detail', {
   //              id: id,
   //              callback: (data) => {
   //               // this.setState({childState: data})
   //              }
   //            })
     // this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
  }
  // 下拉刷新
  _renderRefresh = () => {
    this.setState({ refreshing: true }) //开始刷新
    //这里模拟请求网络，拿到数据，3s后停止刷新
    setTimeout(() => {
      alert('没有可刷新的内容！')

      this.setState({ refreshing: false });
    }, 3000);
  }

  // 上拉加载更多
  _onEndReached = () => {
     //alert(this.state.type)
    this._fatchData()
  }

  _renderItem = ({ item }) => {
    return ( <FlatListItem  navigation={this.props.navigation}  key={item.planId} id={item.planId}  des={item.content} img={item.bannerImg}  title = { item.title } />);
  }
  render() {
        
    return ( 
     <View>
    <FlatList  ref = { ref => this.flatList = ref } 
      data = { this.state.sourceData }

      keyExtractor = { this._keyExtractor } 
      renderItem = { this._renderItem }
      // 决定当距离内容最底部还有多远时触发onEndReached回调；数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
      onEndReachedThreshold = { 0.1 }
      // 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用
      onEndReached = { this._onEndReached } 
      refreshing = { this.state.refreshing } 
      onRefresh = { this._renderRefresh }
      // 是一个可选的优化，用于避免动态测量内容；+50是加上Header的高度
      getItemLayout = {
        (data, index) => ({ length: 40, offset: (40 + 1) * index + 50, index }) }
      />
</View>
    );
  }
}



export default planDataList

var styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  }
})

class FlatListItem extends React.PureComponent {
	constructor(props) {
	  super(props);
	  this.state = {};
	}
  _onPress = () => {
    const {navigate}=this.props.navigation
    navigate('Detail',{
      id:this.props.id
    })
    };

  render() {
    return (
      <ListItem  style={{ marginLeft:0, paddingLeft: 10 }} onPress={this._onPress} >
              <Thumbnail  square size={180} source={{uri:this.props.img}} />
              <Body>
                <Text>{this.props.title}</Text>
                <Text note>{this.props.des}</Text>
              </Body>
            </ListItem>
      
    );
  }
}
