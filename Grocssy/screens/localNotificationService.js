import PushNotification from 'react-native-push-notification'
import { Vibration } from 'react-native';
import { not } from 'react-native-reanimated';


class localNotificationService {
    configure = (onOpenNotification) => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
              console.log("TOKEN:", token);
            },
           
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
              console.log("NOTIFICATION:", notification);
              if (!notification?.data) {
                  return
              }
              notification.userInteraction = true;
              onOpenNotification(notification.data);
            },

            popInitialNotification: true,

            requestPermissions:true,
        });
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options= {}) => {
        PushNotification.localNotification({
            ...this.buildAndroidNotification(id, title, message, data, options),
            title: title || '',
            message: message || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            Vibration: options.Vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data,

        }
    }

    cancelAllLocalNotifications = () => {
        PushNotification.cancelAllLocalNotifications();
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[localNotificationService] removeDeliveredNotificationByID", notificationId)
        PushNotification.cancelLocalNotifications({id:'${notificationId}'})
    }

}

export const localnotificationservice = new localNotificationService()