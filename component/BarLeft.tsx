import React, { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BarLeft = (props: any) => {
  const navigation = useNavigation();

  const toBack = () => {
    navigation.replace("Cotizacion");
  };
  const action = (text:String) => {
    navigation.replace(text);
  };
  return (<SafeAreaView style={{ ...StyleSheet.absoluteFillObject, width: "30%", flexDirection: 'row' }}>
    <Image
      style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'stretch'
      }}
      source={require('./../images/bar_left.png')}
    />
    <SafeAreaView style={{
      ...StyleSheet.absoluteFillObject,
      left: 0,
      height: Dimensions.get("window").height,
      width: "50%",
      flexDirection: 'column',
      zIndex: 2
    }}>

                    
      {props?.back ? <SafeAreaView style={{...StyleSheet.absoluteFillObject,alignItems:'center',marginBottom:50}}>
                        <TouchableOpacity style={{ zIndex: 1, top:0 }} onPress={() => toBack()}>
                            <IconComponent nameIcon='arrowLeft' colors={{ color_1: "white" }} alto={50} ancho={50} ></IconComponent>
                        </TouchableOpacity>
                    </SafeAreaView>: 
                    <SafeAreaView style={{...StyleSheet.absoluteFillObject,alignItems:'center',marginBottom:50}}>
                      <TouchableOpacity style={{ zIndex: 1, top:0 ,alignItems:'center'}} onPress={() => action("Menu")}>
                      <IconComponent nameIcon='hamburgerIcon' colors={{ color_1: "white" }} alto={50} ancho={50} ></IconComponent>
                    </TouchableOpacity>
                </SafeAreaView>
      }
      <SafeAreaView style={{ flex: 1,justifyContent:'center',display:'flex',top: 50,alignItems: "center"}}>
        <Text style={{width: Dimensions.get('window').height*0.9, transform: [{ rotate: '90deg' }], fontSize: 24, fontWeight: "bold", color: tema.text }}>{props.titulo}</Text>
      </SafeAreaView>
    </SafeAreaView>
  </SafeAreaView>
  )

};
export default BarLeft;