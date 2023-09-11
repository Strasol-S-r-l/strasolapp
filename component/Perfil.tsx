import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView,SafeAreaView, Text, View, Alert, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
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

    const pintarEjecutivoAtiende=()=>{
        if(!data) return <View></View>
        return <View style={styles.card}>
            <Text style={{textAlign:'center', fontWeight:'bold', color:'#fff', marginTop:20}}>Perfil</Text>
            <View style={{display:"flex", justifyContent:'center', alignItems:'center', marginTop:15}}>
                <Image 
                    style={{width:50, height:50, borderRadius:10}}
                    source={{uri: api.url+"/imagesAdmin/"+data.CI}}
                />
                <View style={styles.line}>
                    <Text style={styles.lineText}>Ci</Text>
                    <Text style={styles.lineText}>{data.CI}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Primer nombre</Text>
                    <Text style={styles.lineText}>{data.PRIMER_NOMBRE}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Segundo nombre</Text>
                    <Text style={styles.lineText}>{data.SEGUNDO_NOMBRE}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Primer apellido</Text>
                    <Text style={styles.lineText}>{data.PRIMER_APELLIDO}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Segundo apellido</Text>
                    <Text style={styles.lineText}>{data.SEGUNDO_APELLIDO}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Cargo</Text>
                    <Text style={styles.lineText}>{data.CARGO}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Usuario</Text>
                    <Text style={styles.lineText}>{data.USUARIO}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Email</Text>
                    <Text style={styles.lineText}>{data.EMAIL}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Telefono</Text>
                    <Text style={styles.lineText}>{data.TELEFONO}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.lineText}>Contrasena</Text>
                    <Text style={styles.lineText}>*****</Text>
                </View>
            </View>
        </View>
    };

    return (
        <View style={{height:Dimensions.get('screen').height}}>
             <ImageBackground 
                source={require('../images/fondoBlanco.jpeg')}
                style={{height:'100%', width:'100%'}}>
                <ScrollView>
                    {pintarEjecutivoAtiende()}
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
        //backgroundColor:'#fff',
        margin:5,
        padding:5,
        //borderRadius:5,
        borderColor:'#fff',
        borderBottomWidth:1
    },
    card:{
        marginTop:80,
        backgroundColor:'#000000aa', 
        padding:10, 
        paddingBottom:100
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