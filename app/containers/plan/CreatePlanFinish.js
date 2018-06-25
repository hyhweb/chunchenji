import React ,{Component} from 'react'
import { StyleSheet } from 'react-native'
import {Root,Container, Header, Content,Body,View,Text, ListItem, Item,CheckBox, Input, Icon, Label,Button  } from 'native-base';
import { createAction, NavigationActions } from '../../utils'

class CreatePlanFinish extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}
  static navigationOptions = {
    title: '创建成功',
  }
	render(){
		 const { navigate,state } = this.props.navigation;

		return(
			<Root >
				<Container>
					<Content style={{backgroundColor:'#fff',padding:20}}>
						<View style={styles.flex}>
							<Icon name='md-checkmark-circle-outline' style={{fontSize: 60, color: 'green'}} />
							<Text>
								创建成功
							</Text>
							
						</View>
						<View style={styles.marginT20}>
							<Button rounded  block onPress={()=>{
								navigate('Detail',{
									id:state.params.id
								})
							}}>
								<Text>查看详情</Text>
							</Button>
						</View>
						<View style={styles.marginT20}>
							<Button rounded  light block onPress={()=>{
								navigate('CreatePlan')
							}}>
								<Text>继续创建</Text>
							</Button>
						</View>
					</Content>
				</Container>
			</Root>
		)
	}
}
const styles = StyleSheet.create({
	flex:{
		flex:1,
		alignItems: 'center',
   		justifyContent: 'center',
	},
	marginT20:{
		marginTop:20
	}
})
export default CreatePlanFinish