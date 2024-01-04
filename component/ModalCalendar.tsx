import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet, View, Modal, Button, Text } from 'react-native';
import IconComponent from './assets/icons/IconComponent';
import tema from '../enviroments/tema.json'

const ModalCalendar = ({ modalVisible, closeModal, fecha, id_modal }: any) => {
    const [setateDate, setStateData] = React.useState(new Date());

    const getMesesText = () => {
        return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    };

    const getDiasText = () => {
        return ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    };

    const getDias = () => {
        const lastDayOfMonth = setateDate;
        const numberOfDays = lastDayOfMonth.getDate();
        setateDate.getDay()
        return ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    };

    const paintCalendar = () => {
        return <View>
            <View>
                <View>

                </View>
                <View>
                    <TouchableOpacity onPress={()=>cambiarMes(true)}>
                        <Text>izquierda</Text>        
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>cambiarMes(false)}>
                        <Text>derecha</Text>        
                    </TouchableOpacity>
                </View>
            </View>
            {paintHead()}
            {paintBody()}
        </View>
    };
    const paintHead = () => {
        let dias = getDiasText();
        let container = [];
        for (let index = 0; index < dias.length; index++) {
            const element = dias[index];
            container.push(<View style={{ backgroundColor: "blue", width: "14.28%" }}><Text style={{ textAlign: "center" }}>{element.substring(0, 2)}</Text></View>);
        }
        return <View style={{ width: "100%", display: 'flex', flexDirection: "row", backgroundColor: "red", }}>
            {container}
        </View>
    };
    const paintBody = () => {
        let year = setateDate.getFullYear();
        let month = setateDate.getMonth();
        let lastDayOfMonth = new Date(year, month, 0);
        let numberOfDays = lastDayOfMonth.getDate();
        let dia = setateDate.getDay()

        let container_item = [];
        let container = [];
        let count_days = 1;

        for (let index = 0; index < numberOfDays; index++) {
            if (dia <= index) {
                const element = count_days;
                container_item.push(<View style={{ backgroundColor: "blue", width: "14.28%" }}><Text style={{ textAlign: "center" }}>{element + ""}</Text></View>);
                count_days++;
            }else{
                numberOfDays++;
                container_item.push(<View style={{ backgroundColor: "blue", width: "14.28%" }}></View>);
            }
            if((index%7)==0 && index != 0){
                container.push(<View style={{ backgroundColor: "yellow", width: "100%" ,display:"flex",flexDirection:"row"}}>{container_item}</View>);
                container_item = [];
            }
        }
        if(container.length > 0){
            container.push(<View style={{ backgroundColor: "yellow", width: "100%" ,display:"flex",flexDirection:"row"}}>{container_item}</View>);
            container_item = [];
        }
        return <View>
            <View style={{ display: 'flex' }}>
                {container}
            </View>
        </View>
    };
    const verificarFecha = () => {
        try {
            fecha = new Date(fecha);
            setStateData(fecha);
        } catch (error) {

        }
    };
    const cambiarMes = (tipo):any => {
        try {
            let year = setateDate.getFullYear();
            let month = setateDate.getMonth();
            if(tipo){
                let date = new Date(year, month+1, 1);
                setStateData(date);
            }else{
                let date = new Date(year, month-1 , 1);
                setStateData(date);
            }
        } catch (error) {

        }
    };
    const cambiarAno = () => {
        try {
            fecha = new Date(fecha);
            setStateData(fecha);
        } catch (error) {

        }
    };
    return <View key={id_modal + '_md'} style={styles.container}>
        <Modal visible={modalVisible} animationType='slide' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View>
                        {paintCalendar()}
                    </View>
                    <View>
                        <TouchableOpacity key={id_modal + '_md_aceptar_btn'} onPress={closeModal} style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: tema.active, justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }}>
                            <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>ACEPTAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity key={id_modal + '_md_close_btn'} onPress={closeModal} style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: tema.danger, justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }}>
                            <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>CERRAR</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    </View>
};

const styles = StyleSheet.create({
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
        position: 'relative'
    }
})
export default ModalCalendar;