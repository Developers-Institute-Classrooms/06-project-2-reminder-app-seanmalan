import * as Notifications from "expo-notifications";

export async function schedulePushNotification(title, date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
    },
    trigger: date,
  });
}

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  }
  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }
}
