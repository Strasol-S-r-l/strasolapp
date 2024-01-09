import React, { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';
import { useNavigation } from '@react-navigation/native';

const BarLeft = (props:any) => {
  const navigation = useNavigation();

  const toBack = () => {
    navigation.goBack();
  };
  return (<View style={{ ...StyleSheet.absoluteFillObject, width: "30%", flexDirection: 'row' }}>
    <Image
      style={{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'stretch'
      }}
      source={require('./../images/bar_left.png')}
    />
    <View style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      height: Dimensions.get("window").height,
      width: "50%",
      flexDirection: 'column',
      zIndex: 2
    }}>
      {props?.back ? <TouchableOpacity style={{ alignSelf: 'flex-end', top: 5, zIndex: 1 , position:'absolute'}} onPress={()=>toBack()}>
        <IconComponent nameIcon='arrowLeft' colors={{ color_1: "white" }} alto={50} ancho={50} ></IconComponent>
      </TouchableOpacity>:<></>}
      <Text style={{ width: Dimensions.get('window').height - 10,top:props?.back ? 55:5 , transform: [{ rotate: '90deg' }], fontSize: 24, fontWeight: "bold", color: tema.text }}>{props.titulo}</Text>
    </View>
  </View>
  )

};
export default BarLeft;