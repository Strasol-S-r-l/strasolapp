import React, {useEffect, useState} from 'react';
import { ScrollView,SafeAreaView, Text, View, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import api from "../enviroments/api.json";
import Immersive from 'react-native-immersive';


const send = {
    key:api.key,
    type:"getEmpresa" 
};


var navigation_:any;
const Home = ({navigation}:any) => {

    navigation_ = navigation;

    useEffect(() => {
        if(Platform.OS==="android") Immersive.setImmersive(true);
        navigation.setOptions({headerShown: false});
        const fetchData = async () => {
            try {
                const response = await fetch(api.url+'/app', 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',},
                    body: JSON.stringify(send),                                       
                });
                const data = await response.json();
                if(data) {
                    navigation_.replace("Ppl");
                    return;
                }else{  
                    await new Promise<void>(resolve => setTimeout(resolve, 10000));
                    fetchData();
                }
            } catch (error) {
                await new Promise<void>(resolve => setTimeout(resolve, 10000));
                fetchData();
            }
          }
          fetchData();
    });

    
    return (
        
        <SafeAreaView style={{ height: "110%", justifyContent: "center", alignItems: "center" }}>
            <LinearGradient style={{height:"100%", width:"100%", top:0, left:0, position:"absolute" }} colors={['#063c4c', '#0098c7', '#063c4c']} ></LinearGradient>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#fff', fontSize:30, fontStyle: "italic" }}>Universal Brokers S.A.</Text>
                <View style={{height:160}}></View>
                {/*<Svg src={LogoServi} srcw={logoServiw} style={{ width: 50, height: 50, justifyContent: 'center', }} />*/}
                <Text style={{ alignItems: 'center', fontWeight: 'bold', color: '#fff', fontSize:25 }}>Bienvenido</Text>
                <Text style={{ alignItems: 'center', color: '#fff' }}>Conectando con los servidores...</Text>
                <View style={{height:160}}></View>
                <View >
                    <Text style={{ alignItems: 'center', color: '#fff' }}>Power by. iBrokers</Text>
                </View>
            </View>

        </SafeAreaView>
    )
};

export default Home;