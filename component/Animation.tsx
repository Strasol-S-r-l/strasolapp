import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Load from './Load';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import { WebView } from 'react-native-webview';

var navigation_:any;
const Animation = ({navigation}:any) => {
    navigation_ = navigation;
    const [state, setState] = React.useState();
    

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
         
        /*const fetchData = async () => {
          try {

            
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getProductosVenta'}),
            });
            const obj = await response.json();
            
            if(obj.estado === "error"){
                return obj;
            }
            state["polizas"] = obj.data;
            
            setState({...state});
          } catch (error) {
            return {estado:"error", error};
          }
        }*/
        //fetchData();


    }, []);

    return (
        <View style={{position:'absolute', width:"100%",height:Dimensions.get('window').height}}>
            <SafeAreaView style={{height:"100%", backgroundColor:tema.background}}>
                <ScrollView>
                    <WebView 
                        originWhitelist={['*']}
                        source={{uri:"https://ruddy.ibrokers.cloud/buster_drone/"}} 
                        style={{ flex: 1, width:"100%", height:Dimensions.get("window").height }}
                        />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
};


export default Animation;