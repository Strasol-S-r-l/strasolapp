import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView,SafeAreaView, Text, View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'


var navigation_:any;
const Perfil = ({navigation}:any) => {
    navigation_ = navigation;
    const [data, setData] = useState(null);

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
         
        const fetchData = async () => {
          try {

            const suser:any = await AsyncStorage.getItem("usuario");
            if(!suser || suser==null){
                navigation_.replace("Login");
                return;
            } 

            const usuario = JSON.parse(suser);

            console.log(usuario)

            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getProductos', ID:usuario.ID}),                                       
            });
            const data = await response.json();
            setData(usuario);
          } catch (error) {
            return {estado:"error", error};
          }
        }
        fetchData();
    }, []);

    const pintarVideos=()=>{
        if(!data) return <View></View>
        return <View style={styles.card}>
            <Text style={{textAlign:'center', fontWeight:'bold', color:'#fff', marginTop:20}}>Videos</Text>
            
        </View>
    };

    return (
        <View style={{height:Dimensions.get('screen').height}}>
             <ImageBackground 
                source={require('../images/fondoBlanco.jpeg')}
                style={{height:'100%', width:'100%'}}>
                <ScrollView>
                    {pintarVideos()}
                </ScrollView>
            </ImageBackground>
        </View>
    )
};




const styles = StyleSheet.create({
    titulo:{
        textAlign:'center',
        marginTop:10,
        fontSize:14,
        fontWeight:'bold'
    },
    texto:{
        color:"#fff"
    },
    dato:{
        display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:15
    },
    plan_pago:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between',
        margin:5,
        padding:5,
        borderColor:'#fff',
        borderBottomWidth:1
    },
    card:{
        marginTop:40,
        backgroundColor:'#000000aa', 
        padding:10, 
        paddingBottom:30
    },
    line:{
        marginTop:15,
        borderBottomColor:'#fff',
        borderBottomWidth:1,
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        width:'100%'
    },
    lineText:{
        color:'#fff'
    }
});
export default Perfil;