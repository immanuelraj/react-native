import React, {Component} from 'react';
import { Button, View, Text , TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class LoginScreen extends Component {

  state = {
    token:"",
  }

  constructor(props){
    super(props);
  }

  onSubmit = async () => {
    try {
      this.setState({token: '123abc'})
      await AsyncStorage.setItem('userToken', this.state.token)
      const value = await AsyncStorage.getItem('userToken')
      console.log(value)
      if (value != null) {
        this.props.navigation.navigate('Home1')
      }
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Username</Text>
      <TextInput
        value={this.state.username}
        onChange={val=> this.setState({username: val})}/>
      <Text>Password</Text>
      <TextInput 
        value={this.state.password}
        onChange={val=> this.setState({password: val})}/>
      <Button title='Login' onPress={this.onSubmit}/>
      <Button title='Logout' onPress={this.logout}/>
      <Text>Login Screen</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back Screen</Text>
        </TouchableOpacity>
    </View>
    );
  }
}