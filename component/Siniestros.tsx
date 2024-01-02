import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Dimensions, ImageBackground, Text, StyleSheet, Image, TouchableOpacity, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import BarFooter from './BarFooter';
import SiniestroView from './SiniestroView';
import { useIsFocused } from '@react-navigation/native';
import IconComponent from './assets/icons/IconComponent';

var navigation_: any;
var lazy_list = [];
const Siniestros = ({ route, navigation }: any) => {
    navigation_ = navigation;
    const [data, setData] = useState(null);
    useEffect(() => {
        navigation_.setOptions({ headerShown: false });

        const fetchData = async () => {
            try {
                const suser: any = await AsyncStorage.getItem("usuario");
                if (!suser || suser == null) {
                    navigation_.replace("Login");
                    return;
                }
                const usuario = JSON.parse(suser);
                let tipo = route?.params?.TIPO;
                const id_producto = route?.params?.ID;
                let all_item = true;
                if (!route?.params?.TIPO) {
                    tipo = 'All';
                }
                const response = await fetch(api.url + '/app',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify({ key: api.key, type: 'getSiniestros', ID: usuario.ID, TIPO: tipo, ID_PRODUCTO: id_producto, all_item }),
                    });
                const data = await response.json();
                if(data.data){
                    setData(data.data);
                }else{
                    setData([]);    
                }
                
               

            } catch (error) {
                return { estado: "error", error };
            }
        }
        fetchData();
    }, []);

    const pintarTodos = (siniestro:any) => {
        return <SiniestroView item={siniestro}></SiniestroView>
    };

    const paintView = () => {
        return <FlatList
                horizontal
                pagingEnabled
                data={data}
                renderItem={({item}) =>  pintarTodos(item)}
                keyExtractor={item => item.ID+"_ItemSiniestro"}
            />
    }
    return (
        <View style={{ flex: 1 ,position:"relative"}}>
          <View style={{ position: 'absolute',top:0,bottom:0,left:0,right:0 }}>
            <IconComponent nameIcon='fondo' alto='20px' ancho='20px' colors={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
          </View>
          {data ? (
            data.length > 0 ? (
              paintView()
            ) : (
              <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Text>No hay datos disponibles en este momento.</Text>
              </View>
            )
          ) : (
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          )}
          <BarFooter></BarFooter>
        </View>
      );
      
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    sub_title: {
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        textAlign: 'left',
        width: '65%'
    },
    container_line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'white',
        padding: 5
    },
    text_descrip: {
        color: 'white',
        textAlign: 'left',
        width: '65%'
    }
})
export default Siniestros;