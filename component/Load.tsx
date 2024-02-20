import React from 'react';
import { Image, View } from 'react-native';

const Load = () => {
   
    return (
        <View style={{alignItems:'center', marginTop:35}}>
            <Image style={{width:40, height:40}} source={require('../images/load.gif')} />
        </View>
    )
};

export default Load;