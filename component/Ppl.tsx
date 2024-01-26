import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, View, ScrollView, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';

var navigation_:any;
const Ppl = ({navigation}:any) => {
    navigation_ = navigation;

    const [state, setState] = useState({});

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
        setState({gestion:new Date().getFullYear()})
    }, []);

    const getPrompt= async(prompt:string)=>{
        try {
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getProductos'}),
            });
            const data = await response.json();
            console.log();
        } catch (error) {
            return {estado:"error", error};
        }
    };

    const getRespuesta=(url:string)=>{

    };

    const getGestion=()=>{
        return <View style={{backgroundColor:'#fff', height:55, marginTop:10, padding:10 }}>
            <Text style={{textAlign:'center'}}>Gestion {state.gestion||""}</Text>
        </View>
    };

    return (
        <View style={{height:Dimensions.get('screen').height}}>
             <ImageBackground 
                source={require('../images/fondo_main.png')}
                style={{height:'110%', width:'100%'}}>
                <ScrollView>
                    <View style={{display:'flex', alignItems:'center', marginTop:10}}>
                        <Text style={{fontSize:25}}>Bienvenido</Text>
                    </View>
                    {getGestion()}
                </ScrollView>
            </ImageBackground>
        </View>
    )
};


export default Ppl;