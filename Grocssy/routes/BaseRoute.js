import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import { NavigationContainer, HeaderBackButton } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { State } from 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();


function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="Profile" component={ProfileScreen} />
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => (
          <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
          </SettingsStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Order">
        {() => (
          <HomeStack.Navigator>
            <HomeStack.Screen name="Order" component={HomeScreen} />
            <HomeStack.Screen name="Order Details" options={{ tabBarVisible:false }} component={DetailsScreen} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const BaseRoute = () => {

  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(async() => {
  //     try {
  //       token = await AsyncStorage.getItem('userToken');
  //       setUserToken(token);
  //       setLoading(false);
  //     } catch(e) {
  //       console.log(e);
  //     }
  //   }, []);

  useEffect(() => {
    async function setToken() {
      try {
        token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
        setLoading(false);
      } catch(e) {
        console.log(e);
      }
    }  
  
    setToken();
  }, []);

  
  if(loading) {
    if (userToken) {
      return <SplashScreen />;
    }
    else {
      return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
  }

  return (
    <NavigationContainer>
    { userToken !== null ? (
      <SettingsStack.Navigator screenOptions={{headerShown: false,}}>
        <SettingsStack.Screen name="Home1" component={HomeTabs}/>
        <SettingsStack.Screen name="Login" component={LoginScreen}/>
      </SettingsStack.Navigator>) :  
      <SettingsStack.Navigator screenOptions={{headerShown: false,}}>
        <SettingsStack.Screen name="Splash" component={SplashScreen}/>
        <SettingsStack.Screen name="Login" component={LoginScreen}/>
        <SettingsStack.Screen name="Home1" component={HomeTabs}/>
      </SettingsStack.Navigator>
    }
    </NavigationContainer>
  );
};

export default BaseRoute;