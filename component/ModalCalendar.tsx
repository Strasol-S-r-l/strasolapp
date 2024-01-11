import React, { useCallback, useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet, View, Modal, Button, Text } from 'react-native';
import IconComponent from './assets/icons/IconComponent';
import tema from '../enviroments/tema.json'
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

const ModalCalendar = (props: any) => {
    const [stateDate, setStateData] = React.useState(new Date());
    const [stateDateInicial, setStateDataInicial] = React.useState(props.fecha_inicial);
    
    useEffect(() => {
        setStateDataInicial(props.fecha_inicial);
        verificarFecha();
    }, [props.fecha_inicial]);

    const [modalVisibleMes, setModalVisibleMes] = React.useState(false);
    const openModalMes = useCallback(() => {
        setModalVisibleMes(true);
    }, []);

    const closeModalMes = useCallback(() => {
        setModalVisibleMes(false);
    }, []);

    const [modalVisibleAno, setModalVisibleAno] = React.useState(false);
    const openModalAno = useCallback(() => {
        setModalVisibleAno(true);
    }, []);

    const closeModalAno = useCallback(() => {
        setModalVisibleAno(false);
    }, []);

    const getMesesText = () => {
        return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    };

    const getDiasText = () => {
        return ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    };

    const getMesesActual = () => {
        let mes = getMesesText();
        return mes[stateDate.getMonth()];
    };

    const getAnoActual = () => {
        let ano = stateDate.getFullYear();
        return ano;
    };

    const mesesText = getMesesText();
    const mesesActual = getMesesActual();
    const anoActual = getAnoActual();

    const paintCalendar = () => {
        return <View>
            <View>
                <View style={{ display: "flex", alignContent: "center", alignItems: "center", width: "100%" }}>
                    <TouchableOpacity style={{ width: "100%" }} onPress={() => openModalAno()}>
                        <Text style={{ color: tema.active, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>{anoActual}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => cambiarMes(false)}>
                        <IconComponent nameIcon='arrowLeft' colors={{ color_1: tema.active }} alto={50} ancho={50}></IconComponent>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openModalMes()}>
                        <Text style={{ color: tema.active }}> {mesesActual}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => cambiarMes(true)}>
                        <IconComponent nameIcon='arrowRight' colors={{ color_1: tema.active }} alto={50} ancho={50}></IconComponent>
                    </TouchableOpacity>
                </View>
            </View>
            {paintHead()}
            {paintBody()}
        </View>
    };
    const paintHead = () => {
        const dias = getDiasText();

        return (
            <View style={{ width: "100%", flexDirection: "row", backgroundColor: tema.primary, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                {dias.map((element, index) => (
                    <View key={`day_${index}`} style={{ width: "14.28%" }}>
                        <Text style={{ textAlign: "center", color: tema.text }}>{element.substring(0, 2)}</Text>
                    </View>
                ))}
            </View>
        );
    };
    const paintBody = () => {
        let year = stateDate.getFullYear();
        let month = stateDate.getMonth() - 1;
        let lastDayOfMonth = new Date(year, month + 2, 0);
        let numberOfDays = lastDayOfMonth.getDate();
        let dia = stateDate.getDay()
        let container_item = [];
        let container = [];
        let count_days = 1;
        let year_inicial;
        let month_inicial;
        let day_inicial;
        try {
            year_inicial = stateDateInicial.getFullYear();
            month_inicial = stateDateInicial.getMonth() - 1;
            day_inicial = stateDateInicial.getDate();  
        } catch (error) {
            return<View></View>;
        }
        
        for (let index = 0; index < numberOfDays; index++) {
            if ((index % 7) == 0) {
                container.push(<View key={"semana_" + index} style={{ width: "100%", display: "flex", flexDirection: "row" }}>{container_item}</View>);
                container_item = [];
            }
            if (dia <= index) {
                let dia_seleccionado = count_days;
                if (year_inicial == year && month_inicial == month && count_days == day_inicial) {
                    container_item.push(<TouchableOpacity onPress={() => selectDayCalendar(dia_seleccionado)} key={"btn_item_body" + index} style={{ width: "14.28%", backgroundColor: "cyan" }}><View><Text style={{ textAlign: "center", color: tema.active }}>{count_days + ""}</Text></View></TouchableOpacity>);
                } else {
                    container_item.push(<TouchableOpacity onPress={() => selectDayCalendar(dia_seleccionado)} key={"btn_item_body" + index} style={{ width: "14.28%" }}><View><Text style={{ textAlign: "center", color: tema.active }}>{count_days + ""}</Text></View></TouchableOpacity>);

                }
                count_days++;
            } else {
                numberOfDays++;
                container_item.push(<View key={"dia_null_" + index} style={{ width: "14.28%" }}></View>);
            }
        }
        if (container.length > 0) {
            container.push(<View key={"semana_final"} style={{ width: "100%", display: "flex", flexDirection: "row" }}>{container_item}</View>);
            container_item = [];
        }
        return <View key={"body_calendar_completo"} style={{ display: 'flex', borderColor: tema.opaque, borderWidth: 1 }}>
            {container}
        </View>
    };
    const verificarFecha = () => {
        try {
            if (props.fecha_inicial) {
                let date = new Date(props.fecha_inicial);
                setStateData(new Date(date.getFullYear(), date.getMonth(), 1));
                setStateDataInicial(date);
            } else {
                let date = new Date();
                setStateData(new Date(date.getFullYear(), date.getMonth(), 1));
                setStateDataInicial(date);
            }
        } catch (error) {
            setStateData(new Date());
            setStateDataInicial(new Date());
        }
    };
    const cambiarMes = (tipo): any => {
        let year = stateDate.getFullYear();
        let month = stateDate.getMonth();
        if (tipo) {
            let date = new Date(year, month + 1, 1);
            setStateData(date);
        } else {
            let date = new Date(year, month - 1, 1);
            setStateData(date);
        }
    };
    const cambiarMesManual = (mes: Int32): any => {
        let year = stateDate.getFullYear();
        let date = new Date(year, mes, 1);
        setStateData(date);
        closeModalMes();
    };
    const cambiarAnoManual = (ano: Int32): any => {
        let month = stateDate.getMonth();
        let date = new Date(ano, month, 1);
        setStateData(date);
        closeModalAno();
    };
    const selectDayCalendar = (dia: Int32) => {
        let select_date = new Date(stateDate.getFullYear(), stateDate.getMonth(), dia);
        setStateDataInicial(select_date);
        let json = {fecha:select_date};
        props.onChangeDate("FECHA_NACIMIENTO", json.fecha);
        props.closeModal();
    }
    const ModalMes = () => {
        let array_left = [];
        let array_right = [];
        for (let index = 0; index < mesesText.length / 2; index++) {
            const element = mesesText[index];
            array_left.push(<View key={"containar_select_mes_" + index} style={{ width: "95%" }}>
                <TouchableOpacity key={"btn_select_mes_" + index} style={{ height: 40, margin: 5, width: "100%", borderColor: tema.opaque, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => cambiarMesManual(index)}>
                    <Text style={{ color: tema.active }}>{element}</Text>
                </TouchableOpacity>
            </View>);
        }
        for (let index = mesesText.length / 2; index < mesesText.length; index++) {
            const element = mesesText[index];
            array_right.push(<View key={"containar_select_mes_" + index} style={{ width: "95%" }}>
                <TouchableOpacity key={"btn_select_mes_" + index} style={{ height: 40, margin: 5, width: "100%", borderColor: tema.opaque, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => cambiarMesManual(index)}>
                    <Text style={{ color: tema.active }}>{element}</Text>
                </TouchableOpacity>
            </View>);
        }
        return <View key={props.id_modal + '_mes_md'} style={styles.container}>
            <Modal visible={modalVisibleMes} animationType='fade' transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ display: "flex", width: "100%", justifyContent: "center", flexDirection: "row" }}>
                            <View style={{ width: "50%", justifyContent: "center", alignItems: 'center' }}>
                                {array_left}
                            </View>
                            <View style={{ width: "50%", justifyContent: "center", alignItems: 'center' }}>
                                {array_right}
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity key={props.id_modal + '_mes_md_close_btn'} onPress={closeModalMes} style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: tema.danger, justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }}>
                                <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>CERRAR</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    };
    const ModalAno = () => {
        let date = new Date();
        let ano_aux = 0;
        let count = 100;
        let array = [];
        ano_aux = date.getFullYear();
        if(props?.fecha_nacimiento){
            ano_aux = date.getFullYear();
            for (let index = 0; index < count; index++) {
                array.push({key:ano_aux,value:ano_aux});
                ano_aux--;
             }
        }else{
            ano_aux = date.getFullYear()-100;
            for (let index = 0; index < count; index++) {
                array.push({key:ano_aux,value:ano_aux});
                ano_aux++;
            }
        }
       
        return <View key={props.id_modal + '_ano_md'} style={styles.container}>
            <Modal visible={modalVisibleAno} animationType='fade' transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{backgroundColor:tema.primary,width:"100%",justifyContent:"center",height:20,alignItems:"center",borderTopLeftRadius:10,borderTopRightRadius:10}}>
                            <Text style={{color:tema.text}}>Selecione un año</Text>
                        </View>
                        <View style={{ display: "flex", width:"100%",height:"80%",justifyContent: 'center',alignItems:"center"}}>
                            <FlatList
                                data={array}
                                renderItem={itemAno}
                                keyExtractor={(item) => item.key}
                                pagingEnabled
                            />
                        </View>
                        <View>
                            <TouchableOpacity key={props.id_modal + '_ano_md_close_btn'} onPress={closeModalAno} style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: tema.danger, justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }}>
                                <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>CERRAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    };
    const itemAno = ({ item }: any) => {
        return<View style={{width:"100%",minWidth:"100%",justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity key={"btn_select_ano_" + item.key} style={{ width: 120,height:60, borderColor: tema.opaque, borderTopWidth: 1,borderBottomWidth:1, justifyContent: 'center', alignItems: 'center' }} onPress={() => cambiarAnoManual(item.key)}>
                <Text style={{ color: tema.active }}>{item.value}</Text>
            </TouchableOpacity>
        </View> 
            
    }

    return <View key={props.id_modal + '_md_date'} style={styles.container}>
        <Modal visible={props.modalVisible} animationType='fade' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View>
                        {stateDateInicial? paintCalendar(): <></>}
                    </View>
                    <View>
                        <TouchableOpacity key={props.id_modal + '_md_close_btn'} onPress={props.closeModal} style={{ margin: 5, padding: 5, borderRadius: 5, height: 45, backgroundColor: tema.danger, justifyContent: 'center', shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, shadowOpacity: 0.3 }}>
                            <Text style={{ textAlign: "center", color: 'white', fontWeight: 'bold' }}>CERRAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        {ModalMes()}
        {ModalAno()}
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
        borderRadius: 20,
        backgroundColor: tema.background,
        marginLeft: "5%",
        marginRight: "5%",
        width: "90%",
        maxHeight:"60%",
        position: 'relative'
    }
})
export default ModalCalendar;