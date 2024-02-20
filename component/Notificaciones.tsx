import React, { useEffect, useState }  from 'react';
import { SafeAreaView, Text, ScrollView, View, Image, Button, TouchableOpacity, Alert } from 'react-native';
import tema from '../enviroments/tema.json';

const send = {
    key:"lakey",
    type:"getUsuarios" 
};

const notificar=()=>{
    Alert.alert("Notificacion");
};

var navigation_:any;
const Notificaciones = ({navigation}:any) => {
   
    navigation_ = navigation;
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => notificar()}
                style={{backgroundColor:tema.buttons, margin:5, padding:5, borderRadius:5, }}
                >
                <Text style={{textAlign:"center"}}>Notificar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default Notificaciones;