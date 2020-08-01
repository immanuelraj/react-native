// import * as React from 'react';
// import BaseRoute from './routes/BaseRoute';

// export default function App() {
//   return (
//     <BaseRoute/>
//   );
// }

import React, { useEffect } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import {localnotificationservice} from './screens/localNotificationService'
import {fcmserive} from './screens/FCMService'

import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'

// export default class App extends Component {

//   constructor(props) {
//     super(props)
//     this.state = null;
//   };

//   async ComponentDidMount() {
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       // onRegister: function (token) {
//       //   console.log("TOKEN:", token);
//       // },

//       onNotification: function (notification) {
//         console.log("NOTIFICATION:", notification);
//       },
//     });
//   };
  
//   render() {
//     return (
//       <View>
//         <Text> textInComponent </Text>
//       </View>
//     )
//   }
// }


import BaseRoute from './routes/BaseRoute';

export default function App() {

  useEffect(() => {
    fcmserive.registerAppWithFCM()
    fcmserive.register(onRegister, onNotification, onOpenNotification)
    localnotificationservice.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister",token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification", notify)
      const options = {
        soundName: 'default',
        playSound: true,
      }
      localnotificationservice.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification",notify)
      alert("Open Notification: ",notify.body)
    }

    return () => {
      console.log("[App] unRegister" )
      fcmserive.unRegister()
      localNotificationService.unRegister()
    }

  }, [])

  return (
    <View style={styles.container}>
      <Text>React Native Fire Base</Text>
      <Button title="Touch me" onPress={() => localnotificationservice.cancelAllLocalNotifications()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})