import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import BarFooter from './BarFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import TextNotifier from './TextNotifier';



var navigation_:any;
const Automotor = ({navigation}:any) => {
    navigation_ = navigation;

    const [cliente, setCliente] = useState(null);
    const [data, setData] = useState(null);

    const [refresh,setRefresh] = useState(false);
    const recargarPagina =()=>{
        setRefresh(!refresh);
    };
    
    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
         
        getCliente()
    }, []);


    449

    const getRiesgoAutomotor = async() =>{
        try {

            const suser:any = await AsyncStorage.getItem("usuario");
            if(!suser || suser==null){
                navigation_.replace("Login");
                return;
            } 

            const usuario = JSON.parse(suser);
            console.log(usuario)
            setData(usuario);
          } catch (error) {
            return {estado:"error", error};
          }
    }

    const getCliente = async() =>{
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
                body: JSON.stringify({key:api.key, type:'getCliente', ID:usuario.ID_CLIENTES}),                                       
            });
            const data = await response.json();
            setCliente(data.data);

          } catch (error) {
            return {estado:"error", error};
          }
    }
    const changeCliente=(text:string, dato:string)=>{
        if(cliente){
            var cli = {...cliente}
            cli[dato] = text;
            console.log(cli)
            setCliente(cli);
        }
        
        
    };

    const paintCliente = () =>{
        if(cliente){
            console.log(cliente)
            if(cliente.TIPO==2) return paintClienteNatural();
            else  return paintClienteJuridico();
        }
    }
    const paintClienteNatural = () =>{
        return <>
        <ScrollView style={{height:500}}>
            <View>
                <View>
                    <Text style={styles.label}>Nombre completo</Text>
                </View>
                <View>
                    <Text>{cliente.NOMBRE_COMPLETO}</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text style={styles.label}>Apellidos</Text>
                </View>
                <View>
                    <Text>{cliente.PRIMER_APELLIDO} {cliente.SEGUNDO_APELLIDO}</Text>
                </View>
            </View>
            <Text>{JSON.stringify(cliente,null,"\r")}</Text>
        </ScrollView>
        </>
    }

    const paintClienteJuridico = () =>{
        return <>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Nit:</Text>
                </View>
                <View>
                    <Text>{cliente.NIT_CI}</Text>
                </View>
            </View>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Razon social:</Text>
                </View>
                <View>
                    <Text>{cliente.RAZON_SOCIAL}</Text>
                </View>
            </View>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Fecha de constitución:</Text>
                </View>
                <View>
                    <Text>{cliente.FECHA_CONSTITUCION}</Text>
                </View>
            </View>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Ciudad:</Text>
                </View>
                <View>
                    <Text>{cliente.CIUDAD}</Text>
                </View>
            </View>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Dirección:</Text>
                </View>
                <View>
                    <Text>{cliente.DIRECCION}</Text>
                </View>
            </View>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Teléfono:</Text>
                </View>
                <View>
                    <Text>{cliente.TELEFONO}</Text>
                </View>
            </View>
            <View style={styles.separador}>
                <View>
                    <Text style={styles.label}>Actividad económica:</Text>
                </View>
                <View>
                    <Text>{cliente.ACTIVIDAD_ECONOMICA}</Text>
                </View>
            </View>
            
        </>
    }
    


    navigation_ = navigation;
    return (
        <>
            <ScrollView style={{height: Dimensions.get('window').height }}>
                <ImageBackground 
                    source={require('../images/fondo.png')}
                    style={{height:Dimensions.get('window').height, width:'100%'}}>
                    <View style={{marginTop:20}}>
                        <Text style={styles.titulo}>Asegura tu vehículo</Text>
                    </View>
                    <View style={{marginTop:30}}>
                        <Image
                            style={{ height:150, width: "100%" }}
                            source={require('../images/automotor.png')}
                            resizeMode='stretch'
                        />
                    </View>
                    <View style={{marginTop:30}}>
                        <Text style={styles.titulo}>Verifica tu información</Text>
                        {cliente?paintCliente():<Text>Cargando</Text>}
                    </View>
                    <View style={{display:'flex', flexWrap:'wrap', flexDirection:'row', justifyContent:'center'}}>
                        <TouchableOpacity style={styles.botonSuccess}><Text style={{fontSize:18}}>Aceptar</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.botonDanger}><Text style={{fontSize:18}}>Volver</Text></TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
            <BarFooter></BarFooter>
        </>
    )
};

const styles = StyleSheet.create({
    botonDanger:{
        margin:15,
        padding:7,
        borderRadius:7,
        backgroundColor:'#ff000088',
        borderWidth: 1,
        borderColor:'#000000',
        textAlign:'center',
    },
    botonSuccess:{
        margin:15,
        padding:7,
        borderRadius:7,
        backgroundColor:'#00ff0088',
        borderWidth: 1,
        borderColor:'#000000',
        textAlign:'center',
    },
    titulo:{
        fontWeight:'bold',
        marginTop:5,
        fontSize:20,
        lineHeight: 24,
        color:'#fff',
        textAlign:'center',
    },
    label:{
        color:'#000',
        fontWeight:'bold'
    },
    texto:{
        marginTop:5,
        lineHeight: 24,
        color:'#fff'
    },
    enlace:{
        fontWeight:'bold',
        marginTop:5,
        lineHeight: 24,
        color:'skyblue'
    },
    line:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    separador: {
        marginTop:10,
        marginLeft:5
    },
});

export default Automotor;