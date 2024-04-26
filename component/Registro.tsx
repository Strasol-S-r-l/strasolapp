import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, SafeAreaView, Text, View, Alert, StyleSheet, Image, Dimensions, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';
import Load from './Load';
import { setReadable } from 'react-native-fs';
import ModalCalendar from './ModalCalendar';


const Registro = () => {
    const [state, setState] = useState({});
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });

    }, []);

    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }
    const onChangeDate = async (key: string, value: Date) => {

        state["fecha_nacimiento"] = value;
        console.log(state)
        setState({ ...state });
    };

    const dateFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    };

    const onchange = (key: string, value: string) => {

        if (!state[key]) state[key] = "";
        state[key] = value;
        setState({ ...state });
    };

    const getDateFormated = (date: String) => {
        try {
            if (!date || date == null) {
                return ""
            }
            let fecha = new Date(date);
            let format = new Intl.DateTimeFormat('es-ES', dateFormatOptions).format(fecha);
            return format;
        } catch (error) {
            return "";
        }
    };

    const registro = async () => {
        setLoad(true);
        const response = await fetch(api.url + '/app',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ key: api.key, type: "registro", data: state }),
            });
        const data = await response.json();

        setLoad(false);

        if (data.estado == "error") {
            let error = {};
            error[data["error"]] = true;
            setError({ ...error });
            return;
        }

        setError(false);
        navigation.navigate("Login");

        console.log(data)
    };

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <IconComponent nameIcon='fondo_login' ></IconComponent>
            <ScrollView style={{ marginTop: 20 }}>
                <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: "15%" }}>
                    <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ width: "100%", color: tema.primary, fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, textAlign: 'center' }}>Regístrate</Text>
                    </View>
                    <View>
                        <Text style={{ color: tema.text, fontSize: 15, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>
                            Si usted ya se encuentra registrado ingrese
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("RecuperarPass")
                            }}>
                                <Text style={{ color: tema.primary, fontSize: 15, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, textAlign: 'center' }}> aquí </Text>
                            </TouchableOpacity>
                            para recuperar su contraseña.
                        </Text>
                    </View>
                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["ci"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Ci</Text>
                        <View>
                            <TextInput placeholderTextColor={tema.placeholder} placeholder='Carnet de identidad' onChangeText={text => onchange("ci", text)} style={error["ci"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                        </View>

                    </View>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["usuario"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Usuario</Text>
                        <TextInput placeholderTextColor={tema.placeholder} placeholder='Ingrese un nombre de usuario' onChangeText={text => onchange("usuario", text)} style={error["usuario"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                    </View>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["correo"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Correo</Text>
                        <TextInput placeholderTextColor={tema.placeholder} placeholder='...@...' onChangeText={text => onchange("correo", text)} style={error["correo"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                    </View>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["primer_nombre"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Primer Nombre</Text>
                        <TextInput placeholderTextColor={tema.placeholder} placeholder='Primer Nombre' onChangeText={text => onchange("primer_nombre", text)} style={error["primer_nombre"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                    </View>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["segundo_nombre"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Segundo Nombre</Text>
                        <TextInput placeholderTextColor={tema.placeholder} placeholder='Segundo Nombre' onChangeText={text => onchange("segundo_nombre", text)} style={error["segundo_nombre"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                    </View>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["primer_apellido"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Primer Apellido</Text>
                        <TextInput placeholderTextColor={tema.placeholder} placeholder='Primer Apellido' onChangeText={text => onchange("primer_apellido", text)} style={error["primer_apellido"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                    </View>
                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["segundo_apellido"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Segundo Apellido</Text>
                        <TextInput placeholderTextColor={tema.placeholder} placeholder='Segundo Apellido' onChangeText={text => onchange("segundo_apellido", text)} style={error["segundo_apellido"] ? styles.inputError : styles.input} autoCapitalize='none'></TextInput>
                    </View>

                    <View style={{ width: "80%" }}>
                        <Text style={{ marginTop: 10, color: error["segundo_apellido"] ? tema.danger : tema.text, fontWeight: 'bold' }}>Fecha de nacimiento</Text>
                        <View style={{ ...styles.input }}>
                            <TouchableOpacity onPress={() => openModal()}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: 'center', height: '100%' }}>
                                    <TextInput
                                        style={{ width: '88%', color: tema.active }}

                                        value={state["fecha_nacimiento"] ? getDateFormated(state["fecha_nacimiento"]) : ""}
                                        placeholderTextColor={tema.placeholder}
                                        placeholder='__/__/____'
                                        editable={false}
                                    />
                                    <IconComponent nameIcon='iconCalendar' colors={{ color_1: tema.placeholder }} ancho={24} alto={24}></IconComponent>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        load ? <Load /> : (
                            <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={registro} style={styles.input_button}>
                                    <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Registro</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={{...styles.input_button,backgroundColor:tema.danger,borderColor:tema.danger}}>
                                    <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        )

                    }
                </View>
                <View style={{ height: 50 }}></View>
            </ScrollView>
            <ModalCalendar onChangeDate={onChangeDate} fecha_nacimiento={true} modalVisible={modalVisible} closeModal={closeModal} fecha_inicial={new Date() + "".substring(0, 10)} id_modal={"date"} navigation={navigation} key={"fecha_nacimiento"} ></ModalCalendar>
        </KeyboardAvoidingView>
    )
};

export default Registro;

const styles = StyleSheet.create({
    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        backgroundColor: tema.background,
        color: tema.active,
        borderColor: tema.primary,
    },
    inputError: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        backgroundColor: tema.background,
        color: tema.active,
        borderColor: tema.danger,
    },
    input_button: {
        width: "80%",
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        display: "flex",
        justifyContent: "center",
        backgroundColor: tema.primary,
        borderColor: tema.primary,

    },
});