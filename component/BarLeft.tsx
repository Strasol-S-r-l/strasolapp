import React, { useEffect, useState } from 'react';
import { Text, View ,Image, Dimensions, StyleSheet} from 'react-native';

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
            justifyContent: 'center',
            alignItems: 'flex-start',
            width:"50%",
            height:Dimensions.get("window").height,
            zIndex: 1,}}>
            <Text style={{transform: [{ rotate: '90deg' }],fontSize: 18,fontWeight:"bold",color:"white"}}>{titulo}</Text>
          </View>
        </View>
    )

};
export default BarLeft;