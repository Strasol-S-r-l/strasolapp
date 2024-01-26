import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, SafeAreaView, Text, View, Alert, StyleSheet, Image, Dimensions, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';
import Load from './Load';


var navigation_: any;
const Perfil = ({ navigation }: any) => {
    navigation_ = navigation;
    const [data, setData] = useState(null);

    const navegation = useNavigation();

    const action = (nav: String) => {
        navegation.navigate(nav);
    }

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

                const response = await fetch(api.url + '/app',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify({ key: api.key, type: 'getProductos', ID: usuario.ID }),
                    });
                const data = await response.json();
                setData(usuario);
            } catch (error) {
                return { estado: "error", error };
            }
        }
        fetchData();
    }, []);

    const toBack = () => {
        navigation_.goBack();
    }
    const pintarEjecutivoAtiende = () => {
        return <View style={styles.card}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#fff', marginTop: 20 }}>Perfil</Text>
            <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginTop: 15, width: "90%", marginLeft: "5%", marginRight: "5%" }}>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                    source={{ uri: api.url + "/imagesAdmin/" + data.CI }}
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
                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: "100%", height: 40, alignItems: "center", borderBottomWidth: 1, borderColor: "white" }}>
                    <Text style={styles.lineText}>Contraseña</Text>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 10, borderColor: "white", width: "auto", padding: 3 }} onPress={() => action("CambiarContrasena")}>
                            <Text style={{ color: tema.text }}>Cambiar Contraseña</Text>
                        </TouchableOpacity>
                    </View>
                </View>
               
                <TouchableOpacity onPress={() => toBack()} style={{ backgroundColor: tema.danger, borderRadius: 5, height: 40, width: "100%", justifyContent: 'center', alignItems: "center", marginTop: 15 }}>
                    <Text style={{ color: tema.text, fontWeight: "bold" }}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>
    };

    return (
        <View style={{ height: Dimensions.get('screen').height }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            {
                data ? 
                <ScrollView>
                    {pintarEjecutivoAtiende()}
                </ScrollView>
                :<View style={{width:"100%",height:"100%", justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)"}}><Load></Load></View>
            }
        </View>
    )
};




const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold'
    },
    texto: {
        color: "#fff"
    },
    dato: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15
    },
    plan_pago: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:'#fff',
        margin: 5,
        padding: 5,
        //borderRadius:5,
        borderColor: '#fff',
        borderBottomWidth: 1
    },
    card: {
        width:"90%",
        marginLeft:"5%",
        marginRight:"5%",
        borderRadius:20,
        marginTop: 80,
        backgroundColor: '#000000aa',
        padding: 10,
        paddingBottom: 100
    },
    line: {
        marginTop: 15,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    lineText: {
        color: '#fff'
    }
});
export default Perfil;