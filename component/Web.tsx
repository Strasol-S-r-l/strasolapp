import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {  View,} from 'react-native';
import WebView from 'react-native-webview';
const Web = (props:any) => {
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title:"Volver a Seguros Bolivia", headerStyle: {backgroundColor: '#000'}, headerTintColor: '#fff', });
  },[]);

  return (
    <View style={{ width: "100%", height: "100%",}}>
      <WebView style={{ width: "100%", height: "100%"}}
      source={{ uri: route.params.url }}>

      </WebView>
    </View>
  )

};

export default Web;