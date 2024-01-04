import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconComponent from './assets/icons/IconComponent';
import ModalCalendar from './ModalCalendar';

var navigation_: any;
const PerilCliente = (props: any) => {
    navigation_ = props.navigation;
    const [state, setState] = React.useState(props.state);
    const [stateDataCliente, setStateData] = React.useState(props.state);
    const [stateLoad, setStateLoad] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    useEffect(() => {
        getStateDataClient();
    }, []);

    const getStateDataClient = async () => {
        try {
            const response = await fetch(api.url + '/app',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ key: api.key, type: 'getDataClient' }),
                });
            const obj = await response.json();

            if (obj.estado === "error") {
                return obj;
            }
            setStateData({dataClient:obj.data});
        } catch (error) {
            return { estado: "error", error };
        }
    }

    const getCliente = async (key: string, valor: string) => {
        setStateLoad(true);
        try {
            const response = await fetch(api.url + '/app',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ key: api.key, type: 'getCliente', key_dato: key, valor }),
                });
            const obj = await response.json();
            if (obj.estado === "error") {
                await setTimeout(() => {
                    getCliente(key, valor);
                }, 5000);
                return obj;
            }
            if(!obj.data){
                props.state["cliente"] = {};
                props.state["cliente"].NIT_CI = valor;
                AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
                setState({...props});
                props.onChangeCliente("NIT_CI", valor);
            }else{
                obj.data[key] = valor;
                props.state["cliente"] = obj.data;
                AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
                setState({...props});
                props.onChangeCliente("NIT_CI", valor);
            }
            setStateLoad(false);
        } catch (error) {
            props.state["cliente"].NIT_CI = "";
            setStateLoad(false);
            return { estado: "error", error };
        }
    }
    const loadPage =()=>{
        return <View style={{flex:1,height:Dimensions.get('window').height*0.4,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:"rgba(0,0,0,0.0)"}}>
            <Load></Load>
        </View>
    }
    const selectTipoDoc = (data: any) => {
        props.onChangeCliente("TIPO_DOCUMENTO", data.key)
        props.state["cliente"]["TIPO_DOCUMENTO"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectExtencion = (data: any) => {
        props.onChangeCliente("LUGAR_EMISION_CI", data.key)
        props.state["cliente"]["LUGAR_EMISION_CI"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectGenero = (data: any) => {
        props.onChangeCliente("SEXO", data.key)
        props.state["cliente"]["SEXO"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectECivil = (data: any) => {
        props.onChangeCliente("ESTADO_CIVIL", data.key)
        props.state["cliente"]["ESTADO_CIVIL"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectNacionalidad = (data: any) => {
        props.onChangeCliente("NACIONALIDAD", data.key)
        props.state["cliente"]["NACIONALIDAD"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectPaisResidencia = (data: any) => {
        props.onChangeCliente("PAIS_RESIDENCIA", data.key)
        props.state["cliente"]["PAIS_RESIDENCIA"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };

    const selectCiudadResidencia = (data: any) => {
        props.onChangeCliente("CIUDAD", data.key)
        props.state["cliente"]["CIUDAD"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectProfesion = (data: any) => {
        props.onChangeCliente("PROFESION", data.key)
        props.state["cliente"]["PROFESION"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };
    const selectActividadEconomica = (data: any) => {
        props.onChangeCliente("ACTIVIDAD_ECONOMICA", data.key)
        props.state["cliente"]["ACTIVIDAD_ECONOMICA"] = data.value;
        AsyncStorage.setItem("cliente", JSON.stringify(props.state["cliente"]));
        setState({ ...props });
    };

    if (!state.cliente) state["cliente"] = {};

    return  <View style={{flex:1}}>
        <View style={{ position: "relative", width: "100%", height: 50,marginBottom:5}}>
            {props?.state?.cliente?.NIT_CI ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_num_doc" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_num_doc" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("NIT_CI", text) }}
                    value={(props?.state?.cliente?.NIT_CI)}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Nro. de documento'
                    blurOnSubmit={true}
                    onBlur={refs => { getCliente("NIT_CI", refs._dispatchInstances.memoizedProps.value) }}
                />
            </View>
        </View>
        {stateLoad ? loadPage():<View>
        <View style={{  position: "relative", width: "100%", height: 50,marginBottom:5}}>
            <View style={{ position: "relative", width: "100%", height: 50,marginBottom:5 }}>
                {props.state?.cliente?.TIPO_DOCUMENTO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_tipo_doc" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_tipo_doc" ,color:tema.danger}}></IconComponent>}
                <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                            if (!stateDataCliente?.dataClient) {
                                //getStateDataClient()
                                return;
                            }
                            let tipoDocs: any = [];
                            Object.values(stateDataCliente["dataClient"]["TIPO_DOCUMENTO_CLIENTE"]).map((tipo_doc) => {
                                let obj = {
                                    key: tipo_doc.ID + "_tipo_documento",
                                    value: tipo_doc.DESCRIPCION + ""
                                }
                                tipoDocs.push(obj);
                            });

                            navigation_.navigate("Select", { data: tipoDocs, func: selectTipoDoc });
                        }}
                    >
                    {(props.state?.cliente?.TIPO_DOCUMENTO) ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props.state?.cliente?.TIPO_DOCUMENTO)}</Text>: <Text style={{ color: tema.placeholder, fontSize: 11 }}>Tipo Documento</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 ,marginBottom:5}}>
            {props?.state?.cliente?.LUGAR_EMISION_CI ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_ext" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_ext" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente?.dataClient) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente?.dataClient["REGIONALES"]).map((tipo_doc) => {
                            let obj = {
                                key: tipo_doc.ID + "_emision_ci",
                                value: tipo_doc.ACRONIMO + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectExtencion });
                    }}
                >
                    {(props?.state?.cliente?.LUGAR_EMISION_CI) ? <Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.LUGAR_EMISION_CI)}</Text>: <Text style={{ color: tema.placeholder, fontSize: 11 }}>Lugar Emision</Text>}
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 ,marginBottom:5 }}>
            {props?.state?.cliente?.PRIMER_NOMBRE ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_nombre" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_nombre" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("PRIMER_NOMBRE", text) }}
                    value={props?.state?.cliente?.PRIMER_NOMBRE}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Primer Nombre'
                />
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 ,marginBottom:5 }}>
            {props?.state?.cliente?.SEGUNDO_NOMBRE ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_nombre" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_nombre" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("SEGUNDO_NOMBRE", text) }}
                    value={props?.state?.cliente?.SEGUNDO_NOMBRE}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Segundo Nombre'
                />
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50, marginBottom:5 }}>
            {props?.state?.cliente?.PRIMER_APELLIDO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_ap_paterno" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_ap_paterno" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("PRIMER_APELLIDO", text) }}
                    value={props?.state?.cliente?.PRIMER_APELLIDO}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Apellido Paterno'
                />
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 , marginBottom:5}}>
            {props?.state?.cliente?.SEGUNDO_APELLIDO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_ap_materno" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_ap_materno" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("SEGUNDO_APELLIDO", text) }}
                    value={props?.state?.cliente?.SEGUNDO_APELLIDO}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Apellido Materno'
                />
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50, marginBottom:5 }}>
            {props?.state?.cliente?.CELULAR? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_num_cel" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_num_cel" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("CELULAR", text) }}
                    value={props?.state?.cliente?.CELULAR}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Número de Celular'
                />
            </View>
        </View>
        <TouchableOpacity onPress={() => openModal()}>
        <View style={{ position: "relative", width: "100%", height: 50, marginBottom:5 }} >
            {props?.state?.cliente?.FECHA_NACIMIENTO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_fecha_nac" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_fecha_nac" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', display:'flex',flexDirection:'row',alignItems:"center",top: '5%', left: '5%', width: '90%', height: '90%' }}>                
                <TextInput
                    style={{...styles.input,backgroundColor:"red"}}
                    onChangeText={text => { props.onChangeCliente("FECHA_NACIMIENTO", text) }}
                    value={props?.state?.cliente?.FECHA_NACIMIENTO}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Fecha de Nacimiento'
                />
                <IconComponent nameIcon='iconCalendar' colors={{color_1:tema.active}} ancho={24} alto={24}></IconComponent>
            </View>
        </View>
        </TouchableOpacity>
        <View style={{ position: "relative", width: "100%", height: 50 ,marginBottom:5}}>
            {props?.state?.cliente?.SEXO ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_genero" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_genero" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente?.dataClient) {
                            return;
                        }
                        let arr: any = [];

                        arr.push({ key: "1", value: "MASCULINO" });
                        arr.push({ key: "2", value: "FEMENINO" });


                        navigation_.navigate("Select", { data: arr, func: selectGenero });
                    }}
                >
                    {props?.state?.cliente?.SEXO ?<Text style={{ color: tema.text, fontSize: 11 }}>{props?.state?.cliente?.SEXO}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Sexo</Text> }
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50, marginBottom:5 }}>
            {props?.state?.cliente?.ESTADO_CIVIL ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_estado_civil" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_estado_civil" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente["dataClient"]) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente["dataClient"]["ESTADO_CIVIL"]).map((oob) => {
                            let obj = {
                                key: oob.ID + "_estado_civil",
                                value: oob.DESCRIPCION + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectECivil });
                    }}
                >
                    {props?.state?.cliente?.ESTADO_CIVIL ?<Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.ESTADO_CIVIL)}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Estado Civil</Text> }
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50, marginBottom:5 }}>
            {props?.state?.cliente?.EMAIL ? <IconComponent nameIcon='border_input' data={{ id: "txt_correo" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "txt_correo" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("EMAIL", text) }}
                    value={props?.state?.cliente?.EMAIL}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Correo Electrónico'
                />
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 , marginBottom:5}}>
            {props?.state?.cliente?.NACIONALIDAD ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_nacionalidad" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_nacionalidad" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente["dataClient"]) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente["dataClient"]["NACIONALIDADES"]).map((oob) => {
                            let obj = {
                                key: oob.ID + "_nacionalidad",
                                value: oob.NACION + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectNacionalidad });
                    }}
                >
                    {props?.state?.cliente?.NACIONALIDAD ?<Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.NACIONALIDAD)}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Nacionalidad</Text> }
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50,marginBottom:5 }}>
            {props?.state?.cliente?.PAIS_RESIDENCIA ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_pais" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_pais" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente["dataClient"]) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente["dataClient"]["NACIONALIDADES"]).map((oob) => {
                            let obj = {
                                key: oob.ID + "_pais_residencia",
                                value: oob.NOMBRE + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectPaisResidencia });
                    }}
                >
                    {props?.state?.cliente?.PAIS_RESIDENCIA ?<Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.PAIS_RESIDENCIA)}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Pais Residencia</Text> }
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50,marginBottom:5 }}>
            {props?.state?.cliente?.CIUDAD ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_ciudad" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_ciudad" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente["dataClient"]) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente["dataClient"]["CIUDADES"]).map((oob) => {
                            let obj = {
                                key: oob.ID + "_ciudad",
                                value: oob.DESCRIPCION + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectCiudadResidencia });
                    }}
                >
                    {props?.state?.cliente?.CIUDAD ?<Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.CIUDAD)}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Ciudad</Text> }
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 ,marginBottom:5}}>
            {props?.state?.cliente?.DIRECCION ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_direccion" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_direccion" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TextInput
                    style={styles.input}
                    onChangeText={text => { props.onChangeCliente("DIRECCION", text) }}
                    value={props?.state?.cliente?.DIRECCION}
                    placeholderTextColor={tema.placeholder}
                    placeholder='Dirección'
                />
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50,marginBottom:5 }}>
            {props?.state?.cliente?.PROFESION ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_profecion" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_profecion" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente["dataClient"]) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente["dataClient"]["PROFESIONES"]).map((oob) => {
                            let obj = {
                                key: oob.ID + "_profesion",
                                value: oob.DESCRIPCION + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectProfesion });
                    }}
                >
                   {props?.state?.cliente?.PROFESION ?<Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.PROFESION)}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Profesion</Text> }
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: "relative", width: "100%", height: 50 , marginBottom:5}}>
            {props?.state?.cliente?.ACTIVIDAD_ECONOMICA ? <IconComponent nameIcon='border_input' data={{ id: "sv_txt_ac_economica" ,color:tema.succes}}></IconComponent>:<IconComponent nameIcon='border_input' data={{ id: "sv_txt_ac_economica" ,color:tema.danger}}></IconComponent>}
            <View style={{ position: 'absolute', top: '5%', left: '5%', width: '90%', height: '90%' }}>

                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        if (!stateDataCliente["dataClient"]) {
                            return;
                        }
                        let arr: any = [];
                        Object.values(stateDataCliente["dataClient"]["ACTIVIDADES"]).map((oob) => {
                            let obj = {
                                key: oob.ID + "_actividad_economica",
                                value: oob.DESCRIPCION + ""
                            }
                            arr.push(obj);
                        });

                        navigation_.navigate("Select", { data: arr, func: selectActividadEconomica });
                    }}
                >
                    {props?.state?.cliente?.ACTIVIDAD_ECONOMICA ?<Text style={{ color: tema.text, fontSize: 11 }}>{(props?.state?.cliente?.ACTIVIDAD_ECONOMICA)}</Text>:<Text style={{ color: tema.placeholder, fontSize: 11 }}>Actividad Economica</Text> }
                </TouchableOpacity>
            </View>
        </View>
        </View>}
        <ModalCalendar modalVisible={modalVisible} closeModal={closeModal} fecha={new Date()} id_modal={"date"}></ModalCalendar>
    </View>

};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        height: 150,
        width: 150,
        borderRadius: 15,
        padding: 5,
        borderWidth: 1
    },
    observacion: {
        marginTop: 25,
        color: tema.opaque,
        fontSize: 11
    },
    subtitle: {
        color: tema.primary,
        marginTop: 14,
        fontSize: 11,
        marginLeft: "5%"
    },
    input: {
        flex: 1,
        justifyContent:"center",
        paddingLeft:10,
        color: tema.text,
        backgroundColor: "transparent",
        borderRadius: 5,
        borderColor: tema.primary,
        fontSize: 11
    },
});

export default PerilCliente;