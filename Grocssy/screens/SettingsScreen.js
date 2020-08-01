import React, {Component} from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class SettingsScreen extends Component {

  state = {
    token:"",
  }

  constructor(props){
    super(props);
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
      this.props.navigation.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <Button title='Logout' onPress={this.logout}/>
      </View>
    );
  }
}
