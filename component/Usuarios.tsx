import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const send = {
    key: api.key,
    TIPO: 0,
    ID: 0,
    type: "getUsuarios"
};

var navigation_: any;
const uniqueTimestamp = new Date().getTime() + '';

const Usuarios = ({ route, navigation }: any) => {
    const [data, setData] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                navigation.setOptions({ headerShown: false });
                const suser: any = await AsyncStorage.getItem("usuario");
                if (!suser || suser == null) {
                    navigation_.replace("Login");
                    return;
                }
                const usuario = JSON.parse(suser);
                send.TIPO = route?.params?.TIPO;
                send.ID = usuario.ID;

                const response = await fetch(api.url + '/app',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify(send),
                    });
                const data = await response.json();
                setData(data.data);
            } catch (error) {
                return { estado: "error", error };
            }
        }
        fetchData();
    }, []);

    const pintar = (usuario: any) => {
        return <View key={usuario.CI} style={{ ...styles.card, position: 'relative' }}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }}>
                <IconComponent nameIcon='fondoCardUsuario' alto='' ancho='' colors={{ color_2: "white", color_1: "#334477", opacity: "1", offset_1: "48%", offset_2: "50%" }}></IconComponent>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                <View style={{ width: '50%', padding: 10 }}>
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 15 }}
                        source={{ uri: api.url + "/imagesAdmin/" + usuario.CI + '?timestamp=' + uniqueTimestamp }}
                    />
                    <Text style={{ ...styles.texto, width: 100, textAlign: "center" }}>{usuario.CI}</Text>
                    <Text style={styles.texto}>{usuario.NOMBRE_COMPLETO}</Text>
                </View>
                <View style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <View style={{ left: "10%", flex: 1, minHeight: "10%", maxHeight: "33.33%", width: "84%", justifyContent: "center" }}>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => callUser(usuario.TELEFONO)}>
                            <Text style={{ textAlign: 'left', color: "skyblue" }}>{usuario.TELEFONO}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ left: "20%", flex: 1, maxHeight: "33.33%", width: "84%", justifyContent: "center" }}>
                        <Text style={{ textAlign: 'left', color: "skyblue" }}>{usuario.EMAIL}</Text>
                    </View>
                    <View style={{ left: "15%", flex: 1, maxHeight: "33.33%", width: "84%", justifyContent: "center" }}>
                        <Text style={{ textAlign: 'left', color: "black" }}>{usuario.SUCURSAL}</Text>
                    </View>
                </View>
                <View style={{ position: 'absolute', top: "11.5%", left: "49.3%", right: 0, bottom: 0, }}>
                    <IconComponent nameIcon="call" alto="20px" ancho="20px" colors={{ color_1: "#334477" }}></IconComponent>
                </View>
                <View style={{ position: 'absolute', top: "43.4%", left: "52%", right: 0, bottom: 0, }}>
                    <IconComponent nameIcon="iconGlobe" alto="25px" ancho="25px" colors={{ color_1: "#334477" }}></IconComponent>
                </View>
                <View style={{ position: 'absolute', top: "76.2%", left: "49%", right: 0, bottom: 0, }}>
                    <IconComponent nameIcon="iconGPS" alto="25px" ancho="25px" colors={{ color_1: "#334477" }}></IconComponent>
                </View>
            </View>
        </View>
    };
    const callUser = (telefono: any) => {
        Linking.openURL("tel:" + telefono)
            .then((supported) => {
                if (!supported) {
                    console.log('La aplicación de teléfono no está disponible en este dispositivo.');
                }
            })
            .catch((error) => {
                console.error('Error al intentar abrir la aplicación de teléfono:', error);
            });
    }
    const pintarMainContainer = () => {
        return <FlatList
            data={Object.values(data)}
            renderItem={({ item }) => pintar(item)}
            keyExtractor={item => item.ID}
        />

    }
    const toBack = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, position: "relative" }} >

            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <IconComponent nameIcon='fondo' alto='55px' ancho='55px' colors={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
            </View>
            <View style={{ flex: 1 }}>


                
                {data ? pintarMainContainer() : <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}><ActivityIndicator size={'large'} color={'white'} /></View>}
                <View style={{ position: 'absolute', top: 0,left:0,width:50,height:50 }}>
                    <TouchableOpacity onPress={() => toBack()}>
                        <IconComponent nameIcon="iconLeftCircle" alto="40px" ancho="40px" colors={{ color_1: "none" }}></IconComponent>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        marginTop: 15,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,

    },
    texto: {
        color: "#fff",
        paddingTop: 5
    },
});

export default Usuarios;