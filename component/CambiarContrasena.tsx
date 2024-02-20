import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, SafeAreaView, Text, View, Alert, StyleSheet, Image, Dimensions, ImageBackground, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';
import tema from '../enviroments/tema.json'


var navigation_: any;
const CambiarContrasena = ({ navigation }: any) => {
    navigation_ = navigation;
    const [usuario, setUsuario] = useState({});
    const [password, setPassword] = useState({});

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisibleRe, setPasswordVisibleRe] = useState(false);


    const [modalState, setModalState] = React.useState(false);
    const openModal = () => {
        setModalState(true);
    }
    const closeModal = () => {
        setModalState(false);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const togglePasswordVisibilityRe = () => {
        setPasswordVisibleRe(!passwordVisibleRe);
    };

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
        const getUser = async () => {
            const suser: any = await AsyncStorage.getItem("usuario");
            if (!suser || suser == null) {
                navigation_.replace("Login");
                return;
            }
            setUsuario(JSON.parse(suser));
            return;
        };
        getUser();
    }, []);

    const enviarCliente = async () => {
        let nueva_contrasena = password?.pass;
        let nueva_contrasena_re = password?.pass_re;
        let user = usuario?.USUARIO;
        if ((nueva_contrasena == "" || !nueva_contrasena) || (nueva_contrasena_re == "" || !nueva_contrasena_re)) {
            password.mensaje = "Rellene todos los campos";
            password.terminar = false;
            openModal();
            return;
        }
        if (nueva_contrasena != nueva_contrasena_re) {
            password.mensaje = "Las contraseñas no son iguales";
            password.terminar = false;
            openModal();
            return;
        }

        const response = await fetch(api.url + '/app',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ key: api.key, type: "cambiarContracenaCliente", user: user, pass: nueva_contrasena }),
            });
        const data = await response.json();
        if (data.error) {
            password.mensaje = "Intentelo mas tarde";
            password.terminar = false;
            openModal();
            return;
        }
        password.mensaje = "Se cambio la contraseña correctamente";
        password.terminar = true;
        openModal();
    };

    const hanlechange = (obj_: any) => {
        password.error = '';
        password.tipo = 0;
        if (obj_.id === 'new_pass') {
            password.pass = obj_.text;
        }
        if (obj_.id === 'new_pass_re') {
            password.pass_re = obj_.text;
        }
        setPassword({ ...password });
    };
    const toBack = () => {
        if (password.terminar) {
            closeModal();
            navigation_.goBack();
        } else {
            closeModal();
        }
    }
    const cancelar = () => {
        navigation_.goBack();
    }
    const ModalPassword = () => {
        return <View key={'modal_password_md'} style={styles.container}>
            <Modal visible={modalState} animationType='slide' transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View>
                            <Text style={{ color: tema.active, textAlign: "center" }}>{password.mensaje}</Text>

                            <TouchableOpacity onPress={() => toBack()} style={{ marginTop: 10, justifyContent: "center", alignItems: "center", width: "100%", height: 40, backgroundColor: tema.primary, borderRadius: 5 }}>
                                <Text style={{ color: tema.text, fontWeight: "bold" }}>ACEPTAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    }
    return (
        <View style={{ position:"absolute",top:0,bottom:0,left:0,right:0}}>
            <IconComponent nameIcon='fondo_login' ></IconComponent>
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <View style={{ padding:"5%",width: "90%",backgroundColor:"rgba(0,0,0,0.5)", borderRadius:20}}>
                        <Text style={{textAlign:"center",color:tema.text,fontSize:20,fontWeight:'bold'}}>Cambiar Contraseña</Text>
                        <View>
                            <Text style={{ marginTop: 10, color: tema.text, fontWeight: 'bold' }}>Nueva Contraseña</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <TextInput secureTextEntry={!passwordVisible} value={usuario.new_pass} onChangeText={text => hanlechange({ text: text, id: "new_pass" })} placeholderTextColor={tema.placeholder} placeholder='Contraseña' style={(usuario.tipo == 2 ? styles.input_password_error : styles.input_password)} autoCapitalize='none' ></TextInput>
                                <TouchableOpacity onPress={togglePasswordVisibility} style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderColor: 'gray', borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, width: 50 }}>
                                    {
                                        passwordVisible ? <IconComponent nameIcon="eye" alto="35px" ancho="35px" ></IconComponent> :
                                            <IconComponent nameIcon="eyeClose" alto="35px" ancho="35px" ></IconComponent>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text style={{ marginTop: 10, color: tema.text, fontWeight: 'bold' }}>Repita Contraseña</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <TextInput secureTextEntry={!passwordVisibleRe} value={usuario.new_pass_re} onChangeText={text => hanlechange({ text: text, id: "new_pass_re" })} placeholderTextColor={tema.placeholder} placeholder='Contraseña' style={(usuario.tipo == 2 ? styles.input_password_error : styles.input_password)} autoCapitalize='none' ></TextInput>
                                <TouchableOpacity onPress={togglePasswordVisibilityRe} style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderColor: 'gray', borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, width: 50 }}>
                                    {
                                        passwordVisibleRe ? <IconComponent nameIcon="eye" alto="35px" ancho="35px" ></IconComponent> :
                                            <IconComponent nameIcon="eyeClose" alto="35px" ancho="35px" ></IconComponent>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => enviarCliente()} style={{ backgroundColor: tema.primary, borderRadius: 5, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 10 }}>
                                <Text style={{ color: tema.text, fontWeight: "bold" }}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => cancelar()} style={{ backgroundColor: tema.danger, borderRadius: 5, height: 40, justifyContent: 'center', alignItems: "center", marginTop: 10 }}>
                                <Text style={{ color: tema.text, fontWeight: "bold" }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{position:"absolute"}}>
                {ModalPassword()}
                </View>
        </View>
        
    )
};

const styles = StyleSheet.create({
    input_password: {
        flex: 1,
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        height: 50,
        backgroundColor: tema.background,
        color: tema.active,
        borderLeftColor: tema.primary,
        borderTopColor: tema.primary,
        borderBottomColor: tema.primary,
        borderRightColor: 'white'
    },
    input_password_error: {
        flex: 1,
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        height: 50,
        backgroundColor: tema.background,
        color: tema.active,
        borderLeftColor: "#f00",
        borderTopColor: "#f00",
        borderBottomColor: "#f00",
        borderRightColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        padding: 16,
        borderRadius: 8,
        position: 'relative',
        width: "90%",
        backgroundColor: tema.background,
        marginRight: "5%",
        marginLeft: "5%"
    }
});
export default CambiarContrasena;