import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import Logs from './Logs';

var navigation_:any;
const Test = ({navigation}:any) => {
    navigation_ = navigation;
    

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
    }, []);

    return (
        <View style={{position:'absolute', width:"100%",height:Dimensions.get('window').height}}>
            <SafeAreaView style={{height:"100%", backgroundColor:tema.background}}>
                <Logs navigation={navigation_}/>
            </SafeAreaView>
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width:"100%",
        textAlign:'center',
        borderRadius:10,
        color:tema.active,
        borderColor:tema.primary
        
      },
});

export default Test;