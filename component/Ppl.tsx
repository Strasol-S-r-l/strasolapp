import React, { useEffect, useState } from 'react';
import { Text,ScrollView, View, StyleSheet, ActivityIndicator, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import BarFooter from './BarFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import PplView from './PplView';
import IconComponent from './assets/icons/IconComponent';

var navigation_:any;
const Ppl = ({navigation}:any) => {
    navigation_ = navigation;

    const [data, setData] = useState(null);

    const [refresh,setRefresh] = useState(false);
    const recargarPagina =()=>{
        setRefresh(!refresh);
    };
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
            setData(data);
          } catch (error) {
            return {estado:"error", error};
          }
        }
        fetchData();
    }, []);


    const productos=()=>{
        const list_views = [];
        for(let i = 0;i < data?.polizas?.length;i++){
            data.polizas[i].TIPO = 'Poliza';
            list_views.push(data?.polizas[i])
        }
        for(let i = 0;i < data?.certificados?.length;i++){
            data.certificados[i].TIPO = 'Certificado';
            list_views.push(data?.certificados[i])
        }
        for(let i = 0;i < data?.aplicaciones?.length;i++){
            data.aplicaciones[i].TIPO = 'Aplicacion';
            list_views.push(data?.aplicaciones[i])
        }
        return <FlatList
            horizontal
            pagingEnabled
            data={list_views}
            renderItem={({item}) =>  pintarTodos(item)}
            keyExtractor={item => item.ID+"_ItemPPL"}
        />

    };
    const pintarTodos = (item:any) => {
        return <PplView tipo={item.TIPO} item={item}></PplView>
    };

    navigation_ = navigation;
    return (
            <View style={{width:"100%",height:"100%" ,position:"relative"}}>
                <View style={{position:'absolute',top:0,bottom:0,left:0,right:0}}> 
                    <IconComponent nameIcon='fondo' alto='20px' ancho ='20px' colors={{color_1:"#BBEEAA",color_2:"#334477"}}></IconComponent>
                </View>
                {data?productos():<View style={{flex:1, width:'100%', justifyContent:'center', alignItems:'center' ,backgroundColor:'rgba(0,0,0,0.7)'}}><ActivityIndicator size={'large'} color={'white'}/></View>}
                <BarFooter></BarFooter>
            </View>
    )
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000000aa', 
        width:'100%',
        height:'100%',
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    producto: {
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        textShadowColor:'#000',
        textShadowOffset: {width: 1, height: 3},
        textShadowRadius: 10
    },
    titulo:{
        fontWeight:'bold',
        marginTop:5,
        lineHeight: 24,
        color:'#fff'
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
    }
});

export default Ppl;