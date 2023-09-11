import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View,Linking,Image} from 'react-native';
import ModalComponent from './ModalComponent';
import { useNavigation } from '@react-navigation/native';
import IconComponent from './assets/icons/IconComponent';
import api from '../enviroments/api.json'

const send = {
    key: api.key,
    type: "getEmpresa"
};
var razon_social = "";
var telefono = "";
var email = "";
var nit = "";

const uniqueTimestamp = new Date().getTime()+'';

const BarFooter = () => {
    //navegacion
    const navegation = useNavigation();

    const action = (nav: String) => {
        navegation.navigate(nav);
    }
    const actionJSON = (nav: String, obj: any) => {
        navegation.navigate(nav, obj);
        closeModal();
        closeModalUser();
        closeModalSiniestro();
    }

    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    const [modalVisibleUser, setModalVisibleUser] = useState(false);
    const openModalUser = () => {
        setModalVisibleUser(true);
    }
    const closeModalUser = () => {
        setModalVisibleUser(false);
    }
    
    const [modalVisibleSiniestro, setModalVisibleSiniestro] = useState(false);
    const openModalSiniestro = () => {
        setModalVisibleSiniestro(true);
    }
    const closeModalSiniestro = () => {
        setModalVisibleSiniestro(false);
    }

    const fetchData = async () => {
        try {
            const response = await fetch(api.url + '/app',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(send),
                });
            const data = await response.json();
            razon_social = data.data.RAZON;
            telefono = data.data.TELEFONO;
            email = data.data.EMAIL;
            nit = data.data.NIT;
            openModal();
        } catch (error) {
            return { estado: "error", error };
        }
    }

    const abrirCallModal = (modalVisible: any, closeModal: any) => {
        return <ModalComponent id_modal={'modal_siniestro_buscar'} visible={modalVisible} onClose={closeModal}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <IconComponent nameIcon='fondoCard'colors={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
                </View>
                <View style={{ position: 'absolute', top:"-35%", bottom: "115%", left: 0, right: 0  ,borderRadius:10}}>
                        <Image
                            style={{ width: '100%', height: '100%'}}
                            source={{ uri: api.url + "/perfilCia/" + nit + '_bar?timestamo='+uniqueTimestamp }}
                            resizeMode='stretch'
                        />
                </View>
                <View style={{ width: '100%', position:"relative"}}>
                    
                    <View style={{marginTop:5,marginBottom:5}}>
                        <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>Nombre: {razon_social}</Text>
                        <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' ,marginTop:5}}>Email: {email}</Text>
                        <TouchableOpacity onPress={() => callUser(telefono)}>
                            <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold',marginTop:5 }}>Telefono:  <Text style={{color:"skyblue"}}>{telefono}</Text></Text>
                        </TouchableOpacity>
                    </View>
                        

                </View>
            </ModalComponent>
    }
    const callUser = (telefono:any) => {
        Linking.openURL("tel:"+telefono)
            .then((supported) => {
                if (!supported) {
                    console.log('La aplicación de teléfono no está disponible en este dispositivo.');
                }
            })
            .catch((error) => {
                console.error('Error al intentar abrir la aplicación de teléfono:', error);
            });
    }
    const abrirUsuarioModal = (modalVisible: any, closeModal: any) => {
        return <View>
            <ModalComponent id_modal={'modal_siniestro_buscar'} visible={modalVisible} onClose={closeModal}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <IconComponent nameIcon='fondoCard' alto='100%' ancho='100%' colors={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
                </View>
                <TouchableOpacity style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: '#17594A', justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }} onPress={() => actionJSON('Usuarios', { TIPO: '2' })}>
                    <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>Comercial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: '#17594A', justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }} onPress={() => actionJSON('Usuarios', { TIPO: '1' })}>
                    <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>Siniestro</Text>
                </TouchableOpacity>
            </ModalComponent>
        </View>
    }
    const abrirSiniestroModal = (modalVisible: any, closeModal: any) => {
        return <View>
            <ModalComponent id_modal={'modal_siniestro_buscar'} visible={modalVisible} onClose={closeModal}>
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <IconComponent nameIcon='fondoCard' alto='100%' ancho='100%' colors={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
                </View>
                <TouchableOpacity style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: '#17594A', justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }} onPress={() => actionJSON('Siniestros', { TIPO: 'Abierto' })}>
                    <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>Siniestros Pendientes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: '#17594A', justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }} onPress={() => actionJSON('Siniestros', { TIPO: 'Cerrado' })}>
                    <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>Siniestros Cerrados</Text>
                </TouchableOpacity>
             
            </ModalComponent>
        </View>
    }
    return <View style={styles.footer}>
        <TouchableOpacity key={"btn_footer_ppl"} style={styles.item_footer} onPress={() => action('Ppl')}>
            <IconComponent nameIcon="iconPolizaFot" alto="35px" ancho="35px" colors={{ color_1: "gray" }}></IconComponent>
            <Text style={styles.text_footer}>Seguros</Text>
        </TouchableOpacity>

        <TouchableOpacity key={"btn_footer_siniestro"} style={styles.item_footer} onPress={() => openModalSiniestro()}>
            <IconComponent nameIcon="iconSiniestroFot" alto="35px" ancho="35px" colors={{ color_1: "gray" }}></IconComponent>
            <Text style={styles.text_footer}>Siniestro</Text>
        </TouchableOpacity>
        <View style={styles.item_footer}></View>
        <TouchableOpacity key={"btn_footer_call"} style={{ display: "flex", justifyContent: "center", borderColor: "#9A2A2A", borderWidth: 2, borderRadius: 50, position: 'absolute', height: "120%", top: "-20%", left: "38%", right: "38%", alignItems: "center", backgroundColor: "brown" }} onPress={() => fetchData()}>
            <IconComponent nameIcon="call" alto="50px" ancho="50px" colors={{ color_1: "white" }}></IconComponent>
            <Text style={{...styles.text_footer,color:"white"}}>Panico</Text>
        </TouchableOpacity>

        <TouchableOpacity key={"btn_footer_mapa"} style={styles.item_footer} onPress={() => action('Mapa')}>
            <IconComponent nameIcon="iconOficinaFot" alto="35px" ancho="35px" colors={{ color_1: "gray" }}></IconComponent>
            <Text style={styles.text_footer}>Oficinas</Text>
        </TouchableOpacity>

        <TouchableOpacity key={"btn_footer_contacto"} style={styles.item_footer} onPress={() => openModalUser()}>
            <IconComponent nameIcon="iconContactoFot" alto="35px" ancho="35px" colors={{ color_1: "gray" }}></IconComponent>
            <Text style={styles.text_footer}>Contacto</Text>
        </TouchableOpacity>
        {abrirCallModal(modalVisible, closeModal)}
        {abrirUsuarioModal(modalVisibleUser, closeModalUser)}
        {abrirSiniestroModal(modalVisibleSiniestro, closeModalSiniestro)}
    </View>
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#DFD7D5',
        height: '9.5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    item_footer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },
    text_footer: {
        color: '#5E5E5E',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    icon_footer: {
        textAlign: 'center'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgb(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8
    },
    inputBuscador: {
        height: 40,
        width: 300,
        backgroundColor: 'gray',
        borderColor: 'black',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        color: 'white',
        borderWidth: 1,
        fontSize: 20,
        padding: 5,
    },
    buttonBuscador: {
        height: 40,
        width: 40,
        backgroundColor: 'gray',
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        borderColor: 'black',
        borderEndWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    }
})
export default BarFooter;