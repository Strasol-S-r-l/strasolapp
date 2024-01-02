import React, { useEffect, useState } from 'react';
import { Text, View ,Image, Dimensions, StyleSheet} from 'react-native';
import tema from '../enviroments/tema.json'
const BarLeft = ( { titulo }: any) => {

    return( <View style={{...StyleSheet.absoluteFillObject,width:"30%"}}>
          <Image
            style={{
                flex: 1,
                width: null,
                height: null,
                resizeMode: 'stretch'
            }}
            source={require('./../images/bar_left.png')}
          />
          <View style={{position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height:Dimensions.get("window").height,
            width:"50%",
            zIndex: 1,flex: 1, }}>
            <Text style={{width: Dimensions.get('window').height-10,transform: [{ rotate: '90deg' }],fontSize: 24,fontWeight:"bold",color:tema.text }}>{titulo}</Text>
          </View>
        </View>
    )

};
export default BarLeft;