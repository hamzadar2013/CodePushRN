import React, { useEffect } from 'react';
import {
  AppState,
  Button,
  SafeAreaView,
  Text,

} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import codePush from "react-native-code-push";
import CodePush from "react-native-code-push";
import {
  checkNotifications,
  requestNotifications,
} from "react-native-permissions";

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE, 
  updateDialog: {
    title: "Update available",
    optionalUpdateMessage:
      "An update is available. Would you like  to install it?",
    mandatoryUpdateMessage:
      "An update is available and needs to be installed. Your app will refresh after the update is complete.",
    optionalIgnoreButtonLabel: "Later",
    optionalInstallButtonLabel: "Install",
  },
};

function App(): React.JSX.Element {


  const checkNotificationPermission = async () => {
    if (true) {
      checkNotifications().then(({ status, settings }) => {
        if (status == "granted") {
          messagingRequest();
        } else if (status == "denied") {
          requestNotifications(["alert", "sound"]).then(
            ({ status, settings }) => {
              if (status == "granted") {
                messagingRequest();
              }
            }
          );
        }
      });
    }
  };
  async function messagingRequest() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToke=async ()=>{
    try {
    
      const token = await messaging().getToken()
      console.log('FCM Token:', token); 
    } catch (error) {
      console.log("error:", error);
      
    }
 

    
  }

  useEffect(()=>{
    checkNotificationPermission();
getToke()
  },[])
 
  return (
    <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
   <Text>Hamza Dar Code Push Test</Text>
   <Button  onPress={()=>{}} title='Click me'/>
    </SafeAreaView>
  );
}


export default codePush(codePushOptions)( App);
