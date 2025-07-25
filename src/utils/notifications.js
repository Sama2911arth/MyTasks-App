import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure notification handling for when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// 1. Function to request notification permissions
export async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        // Note: Project ID is now automatically configured in EAS builds
        // and for local development with Expo Go.
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

// 2. Function to schedule a notification for a task
export async function scheduleTaskNotification(task) {
    const trigger = new Date(Date.now() + 10 * 1000); // 10 seconds from now

    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: "🔔 Task Reminder!",
            body: `Don't forget to complete your task: ${task.text}`,
            data: { taskId: task.id },
        },
        trigger,
    });

    console.log(`Notification scheduled for task ${task.id} with identifier: ${identifier}`);
    return identifier;
}

// 3. Function to cancel a scheduled notification
export async function cancelNotification(notificationId) {
    if (!notificationId) return;
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log(`Cancelled notification with id: ${notificationId}`);
}