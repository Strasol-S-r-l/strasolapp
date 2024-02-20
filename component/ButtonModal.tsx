import React, { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View } from 'react-native';
import ModalComponent from './ModalComponent';
import IconComponent from './assets/icons/IconComponent';

const ButtonModal = ({ list_seg, id_key }:any) => {

    //modal
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }
    const pintarSeguimiento = (seguimientos: any) => {
        if (seguimientos === null) {
            return <Text>No tiene Seguimientos</Text>
        }
        if (!seguimientos) {
            return <Text>No tiene Seguimientos</Text>
        }
        if (seguimientos.length === 0) {
            return <Text>No tiene Seguimientos</Text>
        }
        let array = [];
        if (typeof seguimientos === 'string') {
            seguimientos = JSON.parse(seguimientos);
        } 
        
        for (var i = 0; i < seguimientos.length; i++) {
            let seguimiento = seguimientos[i];
            array.push(
                <View key={id_key + '_modal_content_item' + i} style={{ borderBottomWidth: 1, borderColor:"white", paddingTop: 5, paddingBottom: 5 }}>
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>{'Seguimiento de ' + getFechaLiteral(seguimiento.FECHA)} a las {getHoraLiteral(seguimiento.FECHA)}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>NOMBRE :</Text>
                    <Text style={{ color: 'white' }}>{seguimiento.USUARIO || ''}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>ESTADO :</Text>
                    <Text style={{ color: 'white' }}>{seguimiento.ESTADOS_CERRADOS || ''}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>FECHA :</Text>
                    <Text style={{ color: 'white' }}>{getFechaLiteral(seguimiento.FECHA)}</Text>
                </View>
                <View>
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>OBSERVACION :</Text>
                    <Text style={{ color: 'white' }}>{seguimiento.OBSERVACION || ''}</Text>
                </View>
            </View>
            )
        }
        return array

    }

    const abrirModalSeguros = (modalVisible: any, closeModal: any, seguimiento: any) => {
        return <View key={id_key + '_modal_container'} >
            <ModalComponent key={id_key + '_modal_body'} visible={modalVisible} onClose={closeModal} id_modal={id_key} >
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                    <IconComponent nameIcon='fondoCard'colors={{ color_1: "#BBEEAA", color_2: "#334477" }}></IconComponent>
                </View>
                <ScrollView style={{ maxHeight: 400 }}>
                    {pintarSeguimiento(seguimiento)}
                </ScrollView>
            </ModalComponent>
        </View>
    }
    return (list_seg && <View>
        {
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', borderRadius: 5, alignItems: 'center', justifyContent: 'center',backgroundColor:'#17594A' }} onPress={() => openModal()}>
                <Text style={{ color: 'white' }}>Ver Detalle</Text>
            </TouchableOpacity>
        }
        {
            abrirModalSeguros(modalVisible, closeModal, list_seg)
        }
    </View>)

};

const getFechaLiteral = (fecha: any) => {
    if (!fecha || fecha == '') {
        return ''
    }
    var fechaLit = new Date(fecha).toLocaleDateString("en-GB")
    var array = fechaLit.split('/');
    switch (array[1]) {
        case '01':
            array[1] = 'Enero';
            break;
        case '02':
            array[1] = 'Febrero';
            break;
        case '03':
            array[1] = 'Marzo';
            break;
        case '04':
            array[1] = 'Abril';
            break;
        case '05':
            array[1] = 'Mayo';
            break;
        case '06':
            array[1] = 'Junio';
            break;
        case '07':
            array[1] = 'Julio';
            break;
        case '08':
            array[1] = 'Agosto';
            break;
        case '09':
            array[1] = 'Septiembre';
            break;
        case '10':
            array[1] = 'Octubre';
            break;
        case '11':
            array[1] = 'Noviembre';
            break;
        case '12':
            array[1] = 'Diciembre';
            break;
    }
    return array[0] + ' de ' + array[1] + ' ' + array[2]
}
const getHoraLiteral = (fecha: any) => {
    var fechaLit = new Date(fecha);
    const hours = fechaLit.getHours();
    const minutes = fechaLit.getMinutes();
    const seconds = fechaLit.getSeconds();
    
    let hora = hours+'';
    let minuto = minutes+'';
    let segundo = seconds+'';
    let aux = "PM";
    if(hours < 10){
        hora = '0'+hours;
        aux = 'AM';
    }
    if(minutes < 10){
        minuto = '0'+minutes;
    }
    if(seconds < 10){
        segundo = '0'+seconds;
    }

    return hora +":"+minuto+' '+aux;
}
export default ButtonModal;