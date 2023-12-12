import React, {useEffect} from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import api from "../enviroments/api.json";
import tema from '../enviroments/tema.json'
import pj from "../package.json";
import BarLeft from './BarLeft';


const send = {
    key:api.key,
    type:"initApp" ,
    version:pj.version,
    appName:pj.name
};


var navigation_:any;
const Home = ({navigation}:any) => {

    navigation_ = navigation;

    useEffect(() => {
        //if(Platform.OS==="android") Immersive.setImmersive(true);
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
                    
                    if(data.estado="exito"){
                        navigation_.replace("Splash");
                        return;
                    }
                    await new Promise<void>(resolve => setTimeout(resolve, 10000));
                    fetchData();
                    return;
                    
                }
            } catch (error) {
                await new Promise<void>(resolve => setTimeout(resolve, 10000));
                fetchData();
            }
          }
          fetchData();
    });


    return (
        
        <SafeAreaView style={{ height: "110%", justifyContent: "center", alignItems: "center", backgroundColor: tema.background }}>
            {/*<LinearGradient style={{height:"100%", width:"100%", top:0, left:0, position:"absolute" }} colors={['#063c4c', '#0098c7', '#063c4c']} ></LinearGradient>*/}
            
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{display:"flex", flexWrap:"wrap", flexDirection:"row"}}>
                    <Text style={{ alignItems: 'center', fontWeight: 'bold', color: tema.primary, fontSize:35, fontStyle: "italic" }}>Insurance</Text>
                    <Text style={{ alignItems: 'center', fontWeight: 'bold', color: tema.active, fontSize:35, fontStyle: "italic" }}>Tech Bolivia</Text>
                </View>
                <View style={{height:160}}></View>
                {/*<Svg src={LogoServi} srcw={logoServiw} style={{ width: 50, height: 50, justifyContent: 'center', }} />*/}
                <View style={{height:160}}></View>
                <View style={{alignItems:'center', justifyContent:'center'}} >
                    <Image style={{width:100, height:100}} source={require('../images/logo.png')} />
                </View>
                <View style={{display:"flex", flexDirection:"row"}}>
                    <Text style={{ alignItems: 'center', color: tema.primary }}>Powerby.</Text>
                    <Text style={{ alignItems: 'center', color: tema.active }}>CoreBrokers</Text>
                </View>
            </View>

        </SafeAreaView>
    )
};

export default Home;