import React, { useEffect, useState,useLayoutEffect  } from 'react';
import { Text, View, Image, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import IconComponent from './assets/icons/IconComponent';
import Marcas from './Marcas';
import Modelos from './Modelos';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Subrogados from './Subrogados';

var navigation_: any;
const PerfilAutomotor = (props: any) => {
    navigation_ = props.navigation;
    const [state, setState] = React.useState(props.state);

    const selectMarca = (marca: any) => {
        delete props.state?.selectMarca;
        delete props.state?.modelos;
        delete props.state?.automotor?.modelo;
        props.state["automotor"] = { ...props.state["automotor"], marca };
        props.state["automotor"]["vigencia_inicial"] = props?.state?.vigencia_inicial;
        props.selectMarcaModelo(marca);
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
    };

    const selectSubrogatario = (subrogatario: any) => {
        props.state["automotor"] = { ...props.state["automotor"], subrogatario };
        props.selectMarcaModelo(subrogatario);
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
    };
    const selectSubrogatarioMonto = (monto: any) => {
        props.state["automotor"] = { ...props.state["automotor"], monto_subrogado: monto };
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));

    };
    const selectModelo = (modelo: any) => {
        delete props.state.selectModelo;
        props.state["automotor"] = { ...props.state["automotor"], modelo };
        props.selectMarcaModelo(modelo);
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
    };
    const selectAno = (data: any) => {
        props.changeAutomotor("ANO", data.value);
        //props.state["automotor"] = { ...props.state["automotor"], ANO: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
        setState({ ...props.state });
    };
    const selectTraccion = (data: any) => {
        props.changeAutomotor("TRACCION", data.value);
        //props.state["automotor"] = { ...props.state["automotor"], TRACCION: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
        setState({ ...props.state });
    };
    const selectExtraterritorialidad = (data: any) => {
        props.changeAutomotor("EXTRATERRITORIALIDAD", data.value);
        //props.state["automotor"] = { ...props.state["automotor"], EXTRATERRITORIALIDAD: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
        setState({ ...props.state });
    };
    const selectZona = (data: any) => {
        props.changeAutomotor("ZONA_CIRCULACION", data.value);
        //props.state["automotor"] = { ...props.state["automotor"], EXTRATERRITORIALIDAD: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
        setState({ ...props.state });
    };
    const selectEstado = (data: any) => {
        props.changeAutomotor("ESTADO", data.value);
        AsyncStorage.setItem("automotor", JSON.stringify(props.state["automotor"]));
        setState({ ...props.state });
    };

    return (<View style={{ flex: 1 }}>
        <Subrogados state={props.state} selectSubrogatario={selectSubrogatario} selectSubrogatarioMonto={selectSubrogatarioMonto} />
        <View style={{ borderBottomWidth: 1, borderBottomColor: tema.opaque, margin: 10, alignItems: 'center' }}>
            <Text style={{ color: tema.text }}>Informacion del automotor</Text>
        </View>
        <Marcas state={props.state} selectMarca={selectMarca} />
        <Modelos state={props.state} selectModelo={selectModelo} />
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props.state?.automotor?.marca?.DESCRIPCION ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_descrip_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_descrip_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    style={styles.input}
                    value={props.state?.automotor?.marca?.DESCRIPCION}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Marca'
                    editable={false}
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props.state?.automotor?.modelo?.DESCRIPCION ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_modelo_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_modelo_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    value={props.state?.automotor?.modelo?.DESCRIPCION}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Modelo'
                    editable={false}
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props.state?.automotor?.modelo?.TIPO_VEHICULO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_tipo_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_tipo_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    style={styles.input}
                    value={props.state?.automotor?.modelo?.TIPO_VEHICULO}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Tipo'
                    editable={false}
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.modelo?.MOTOR ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_motor_cc_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_motor_cc_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    style={styles.input}
                    value={((props?.state?.automotor?.modelo?.MOTOR) ? (props?.state?.automotor?.modelo?.MOTOR + "") : (""))}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Motor cc.'
                    editable={false}
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.modelo?.PLAZAS ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_plazas_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_plazas_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    style={styles.input}
                    value={((props?.state?.automotor?.modelo?.PLAZAS) ? (props?.state?.automotor?.modelo?.PLAZAS + "") : (""))}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Plazas'
                    editable={false}
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.PLACA ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_placa_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_placa_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    onChangeText={text => { props.changeAutomotor("PLACA", text) }}
                    style={styles.input}
                    value={(props?.state?.automotor?.PLACA)}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Placa'
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.NUMERO_MOTOR ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_num_motor_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_num_motor_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    onChangeText={text => { props.changeAutomotor("NUMERO_MOTOR", text) }}
                    style={styles.input}
                    value={(props?.state?.automotor?.NUMERO_MOTOR)}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Motor Nro.'
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.CHASIS ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_chasis_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_chasis_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <View style={{ display: "flex", flexDirection: "row" }}>
                    <TextInput
                        onChangeText={text => { props.changeAutomotor("CHASIS", text) }}
                        style={{ ...styles.input, }}
                        value={(props?.state?.automotor?.CHASIS)}
                        placeholderTextColor={tema.placeholder}
                        placeholder='Chasis'
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation_.navigate("RecCamera", props.selectCameraChasis);
                        }}
                        style={{ width: 40, height: 40, padding: 5 }}>
                        <IconComponent nameIcon="Camara" colors={{ color: "#000" }} ></IconComponent>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.COLOR ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_color_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_calor_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    onChangeText={text => { props.changeAutomotor("COLOR", text) }}
                    style={styles.input}
                    value={(props?.state?.automotor?.COLOR)}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Color...'
                />
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.ANO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_descrip_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_descrip_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        let anos = [];
                        for (let i = 2000; i < 2030; i++) {
                            let obj = {
                                key: i + "",
                                value: i + ""
                            }
                            anos.push(obj);
                        }
                        navigation_.navigate("Select", { data: anos, func: selectAno });
                    }}
                >
                    {props?.state?.automotor?.ANO ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.automotor?.ANO)}</Text> : <Text style={{ color: tema.placeholder, fontSize: 11 }}>Año</Text>}

                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.TRACCION ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_descrip_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_descrip_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        let aux = [];
                        let obj = { key: "4x2", value: "4x2" }
                        aux.push(obj);
                        obj = { key: "4x4", value: "4x4" }
                        aux.push(obj);
                        navigation_.navigate("Select", { data: aux, func: selectTraccion });
                    }}>
                    {props?.state?.automotor?.TRACCION ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.automotor?.TRACCION)}</Text> : <Text style={{ color: tema.placeholder, fontSize: 11 }}>Traccion</Text>}
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.EXTRATERRITORIALIDAD ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_extrat_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_extrat_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        let aux = [];
                        let obj = { key: "Si", value: "Si" }
                        aux.push(obj);
                        obj = { key: "No", value: "No" }
                        aux.push(obj);
                        navigation_.navigate("Select", { data: aux, func: selectExtraterritorialidad });
                    }}
                >
                    {props?.state?.automotor?.EXTRATERRITORIALIDAD ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.automotor?.EXTRATERRITORIALIDAD)}</Text> : <Text style={{ color: tema.placeholder, fontSize: 11 }}>Extraterritorialidad</Text>}
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.ZONA_CIRCULACION ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_zona_cir_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_zona_cir_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                {/*<TextInput
                    onChangeText={text => {  props.changeAutomotor("ZONA_CIRCULACION", text) }}
                    style={styles.input}
                    value={(props?.state?.automotor?.ZONA_CIRCULACION)}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Zona de Circulacion'

                />*/}
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        let list = [];
                        Object.keys(props.state["parametricas"]["zona_circulacion"]).map((key) => {
                            let obj = {
                                key:props.state["parametricas"]["zona_circulacion"][key],
                                value:props.state["parametricas"]["zona_circulacion"][key]
                            } 
                            list.push(obj);
                        });
                        navigation_.navigate("Select", { data: list, func: selectZona });
                    }}>
                    {props?.state?.automotor?.ZONA_CIRCULACION ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.automotor?.ZONA_CIRCULACION)}</Text> : <Text style={{ color: tema.placeholder, fontSize: 11 }}>Zona de Circulacion</Text>}
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.automotor?.ESTADO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_estado_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_estado_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        let aux = [];
                        let obj = { key: "Nuevo", value: "Nuevo" }
                        aux.push(obj);
                        obj = { key: "Usado", value: "Usado" }
                        aux.push(obj);
                        navigation_.navigate("Select", { data: aux, func: selectEstado });
                    }}
                >
                    {props?.state?.automotor?.ESTADO ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.automotor?.ESTADO)}</Text> : <Text style={{ color: tema.placeholder, fontSize: 11 }}>Estado</Text>}
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", height: 50, marginBottom: 10 }}>
            {props?.state?.vigencia_inicial ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_vigenc_inicial_auto", color: tema.succes }}></IconComponent> : <IconComponent nameIcon='border_input' data={{ id: "sv_txt_vigenc_inicial_auto", color: tema.danger }}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    style={styles.input}
                    value={(props?.state?.vigencia_inicial)}
                    placeholder='Vigencia inicial'
                    placeholderTextColor={tema.placeholder}
                    editable={false}
                />
            </View>
        </View>
    </View>
    )

};
const styles = StyleSheet.create({
    subtitle1: {
        color: tema.background,
        marginTop: 10,
        fontSize: 15,
        marginLeft: "5%"
    },
    input: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 10,
        color: tema.text,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderColor: tema.primary,
        fontSize: 11
    },
});
export default PerfilAutomotor;