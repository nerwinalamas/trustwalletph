// import * as Notifications from "expo-notifications";
// import { Platform } from "react-native";

// // Configure notifications
// export async function setupNotifications() {
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     console.log("Failed to get push token for push notification!");
//     return;
//   }

//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log("Push token:", token);

//   if (Platform.OS === "android") {
//     Notifications.setNotificationChannelAsync("default", {
//       name: "default",
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: "#FF231F7C",
//     });
//   }

//   return token;
// }

// // Handle incoming notifications
// export function registerNotificationHandlers() {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: true,
//       shouldShowBanner: true,
//       shouldShowList: true,
//     }),
//   });

//   // Handle notifications received while app is foregrounded
//   const subscription = Notifications.addNotificationReceivedListener(
//     (notification) => {
//       console.log("Notification received:", notification);
//     }
//   );

//   // Handle user tapping on notification
//   const responseSubscription =
//     Notifications.addNotificationResponseReceivedListener((response) => {
//       console.log("Notification tapped:", response);
//       // You could navigate to a specific screen here
//     });

//   return () => {
//     subscription.remove();
//     responseSubscription.remove();
//   };
// }
