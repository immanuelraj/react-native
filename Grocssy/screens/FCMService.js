import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'

class FCMSerive {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister)
    this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
  }

  registerAppWithFCM = async() => {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true)
    }
  }

  checkPermission = (onRegister) => {
    messaging().hasPermission()
    .then(enabled => {
      if(enabled) {
        this.getToken(onRegister)
      } else {
        this.requestPermission(onRegister)
      }
    }).catch(error => {
      console.log("[FCMService] permission is rejected", error)
    });
  }

  getToken = (onRegister) => {
    messaging().getToken()
    .then(fcmToken => {
      if(fcmToken) {
        onRegister(fcmToken)
      } else {
        console.log("[FCMSerive] user doesn't have a device token")
      }
    }).catch(error => {
      console.log("[FCMService] getTomen is rejected", error)
    });
  }

  requestPermission = (onRegister) => {
    messaging().requestPermission()
    .then(() => {
      this.getToken(onRegister)
    }).catch(error => {
      console.log("[FCMService] request permission is rejected", error)
    });
  }

  deleteToken = () => {
    console.log("[FCMService] deleteToken")
    messaging().deleteToken()
    .catch(error => {
      console.log("[FCMService] deleteToken is error", error)
    });
  }

  createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
    // When application is running, but in the background

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log("[FCMService] onNotificationOpenedApp caused app to open")
      if (remoteMessage) {
        const notification = remoteMessage.notification
        onOpenNotification(notification)
      }
    });

    //When an application is opened from quite state

    messaging().getInitialNotification()
    .then(remoteMessage => {
      console.log("[FCMService] getInitialNotification caused app to open")
      if (remoteMessage) {
        const notification = remoteMessage.notification
        onOpenNotification(notification)
      }
    })

    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log("[FCMService] A New FCM message is recived", remoteMessage)
      if (remoteMessage) {
        notification = remoteMessage.notification
        onNotification(notification)
      }
    })

    messaging().onTokenRefresh(fcmToken => {
      console.log("[FCMService] A New FCM token refresh", fcmToken)
      onRegister(fcmToken)
    })
  
  }

  unRegister = () => {
    this.messageListener()
  }

}

export const fcmserive = new FCMSerive()