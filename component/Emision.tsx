import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image, TextInput, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Circle, G, Line, Rect, Svg, Text as SvgText, TSpan } from 'react-native-svg';
import Modelos from './Modelos';
import Marcas from './Marcas';
import PerilCliente from './PerilCliente';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import Automotor from './Automotor';
import Load from './Load';
import { Button } from 'react-native-share';
import { WebView } from 'react-native-webview';
import IconComponent from './assets/icons/IconComponent';
import BarLeft from './BarLeft';
import PerfilAutomotor from './PerfilAutomotor';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import Documentos from './Documentos';
import RNFS from 'react-native-fs';

var navigation_: any;
var aux_tipo = 1;
const Emision = ({ navigation }: any) => {
    navigation_ = navigation;
    const [state, setState] = React.useState({ porc_avance: 0, vigencia_inicial: new Date().toLocaleDateString() });
    const [tipoInfo, setTipoInfo] = React.useState(1);


    const cambiarPagina = (tipo: Int32) => {
        aux_tipo = tipo;
        setTipoInfo(4);
        setTimeout(sleepFunction, 1000);
    }
    const sleepFunction = () => {
        setTipoInfo(aux_tipo);
    };
    useEffect(() => {
        aux_tipo = 1;
        navigation_.setOptions({ headerShown: false });

        const init = async () => {
            let poliza = await AsyncStorage.getItem("poliza");
            state["poliza"] = JSON.parse(poliza);
            let cliente = await AsyncStorage.getItem("cliente");
            state["cliente"] = JSON.parse(cliente);
            let automotor = await AsyncStorage.getItem("automotor");
            state["automotor"] = JSON.parse(automotor);
            state["automotor"]["vigencia_inicial"] = state.vigencia_inicial;
            state["usuario"] = await AsyncStorage.getItem("usuario");
            state["usuario"] = JSON.parse(state["usuario"])
            setState({ ...state });
        };
        init();

    }, []);

    const emitir = async () => {


        let documentos = await AsyncStorage.getItem("documentos");
        if(documentos){
            documentos = JSON.parse(documentos);

            documentos = await Promise.all(
                documentos.map(async (obj) => {
                    if(obj.url){
                        obj["image"] = await RNFS.readFile(obj.url, 'base64');
                    }else {
                        obj = null;
                    }
                    return obj;
                })
            );
        } 


        fetch(api.url + '/app',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({
                    key: api.key,
                    type: 'emitir',
                    id_tomador: state.usuario.ID_CLIENTES,
                    cliente: state.cliente,
                    automotor: state.automotor,
                    poliza: state.poliza,
                    documentos:documentos
                }),
            }).then(async (response) => {
                const obj = await response.json();
                if (obj.estado === "error") {
                    state["error"] = obj.error;
                    state["emitiendo"] = false;
                    setState({ ...state });
                    return obj;
                }

                state["emitiendo"] = false;
                console.log(obj.data)

                let id = 0;
                if (obj?.data?.ID) {
                    id = obj?.data?.ID;
                } else {
                    id = obj?.data[0].ID;
                }


                state["dataClient"] = obj.data
                navigation_.replace("PerfilProducto", { ID: id });

                await AsyncStorage.removeItem("poliza");
                await AsyncStorage.removeItem("cliente");
                await AsyncStorage.removeItem("automotor");
                await AsyncStorage.removeItem("documentos");

                return;
            }).catch(e => {
                state["error"] = state.error + "";
                state["emitiendo"] = false;
                console.log(state)
                setState({ ...state });
                return;
            });

        state["emitiendo"] = true;
        setState({ ...state });
    };
    const limpiarDatos = () => {
        state["automotor"] = {};
        state["cliente"] = {};
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
        AsyncStorage.setItem("cliente", JSON.stringify(state["cliente"]));

        setState({ ...state });
    };
    const getEmitir = (porcentaje: any) => {

        if (state.error) {
            return <View style={{ alignItems: "center" }}>
                <ScrollView style={{ height: 50 }}>
                    <Text style={{ color: tema.danger }}>{state.error}</Text>
                </ScrollView>
                <TouchableOpacity
                    style={{
                        width: 100,
                        backgroundColor: tema.danger,
                        borderRadius: 5,
                        display: "flex",
                        marginTop: 10
                    }}
                    onPress={() => {
                        state["emitiendo"] = false;
                        delete state["error"];
                        setState({ ...state })
                    }}>
                    <Text style={{ color: tema.active, textAlign: "center", padding: 5 }}>Salir</Text>
                </TouchableOpacity>
            </View>
        }

        if (state["emitiendo"]) {
            return <View style={{ width: "100%", height: 200, display: "flex", position: "absolute", backgroundColor: "#00000000" }}>
                <WebView
                    originWhitelist={['*']}
                    source={{ uri: "https://ruddy.ibrokers.cloud/buster_drone/" }}
                    style={{
                        flex: 1,
                        backgroundColor: "#00000000"
                    }}>
                </WebView>
            </View>
        }

        if (porcentaje >= 100) {
            return (
                <View style={{ display: "flex", alignItems: "center" }}>
                    <TouchableOpacity style={styles.button3D} onPress={emitir}>
                        <Text style={styles.buttonText} >Emitir</Text>
                    </TouchableOpacity>

                </View>
            )
        }

        return <View>
            <Text>Pendiente...</Text>
        </View>
    }

    const getSvg = () => {

        let width = Dimensions.get('window').width * 0.8;
        let ini = 15;
        let medium = width / 2;
        let fin = width - 15;
        let anchoBarraPorcentaje = (width - 35) - (ini + 30);

        let porcentaje = getPorcentajeAvance();
        //let anchoBarrra = (ini + 30) + (anchoBarraPorcentaje * porcentaje) / 100;
        let anchoBarrra = ((width * 0.9) * porcentaje) / 100;


        return <View style={{ marginTop: 15 }}>
            <TouchableOpacity onPress={()=>limpiarDatos()} style={{height:20, marginRight:"5%",marginLeft:"5%",width:"90%" ,backgroundColor:tema.primary,borderRadius:10}}>
                <Text style={{textAlign:"center"}}>Borrar Datos</Text>
            </TouchableOpacity>
            <Svg width={width} height={Dimensions.get('window').height * 0.2}>

                <Line x1="5%" y1="15%" x2="90%" y2="15%" stroke={tema.primary + "55"} strokeWidth={6} />
                <Line x1="5%" y1="15%" x2={anchoBarrra} y2="15%" stroke={tema.primary} strokeWidth={6} />
                <SvgText fill={"white"} fontSize={12}><TSpan x={width - 60} y="10%">{porcentaje.toFixed(0)} %</TSpan></SvgText>
                <SvgText fill={"white"} fontSize={12}><TSpan x="20%" y="25%">Complete sus datos para la emision</TSpan></SvgText>

                <Line x1={ini} y1="45%" x2={fin} y2="45%" stroke={"white"} strokeWidth={2} />

                <Circle cx={medium - 120} cy="45%" r="11" stroke={"white"} fill={tema.primary} id="svgCircle1" />
                {aux_tipo == 1 ? <Circle cx={medium - 120} cy="45%" r="10" fill={"white"} id="svgCircle1" /> : <View></View>}
                <SvgText fill={aux_tipo == 1 ? tema.active : tema.text} fontSize={12}><TSpan x={medium - 120 - 3} y="47.5%">1</TSpan></SvgText>
                <SvgText fill={aux_tipo == 1 ? tema.text : tema.opaque} fontSize={12}><TSpan x={medium - 120 - 30} y="65%">Información</TSpan><TSpan x={medium - 120 - 20} y="75%">Personal</TSpan></SvgText>

                <Circle cx={medium} cy="45%" r="11" stroke={"white"} fill={tema.primary} id="svgCircle1" />
                {aux_tipo == 2 ? <Circle cx={medium} cy="45%" r="10" fill={"white"} /> : <View></View>}
                <SvgText fill={aux_tipo == 2 ? tema.active : tema.text} fontSize={12}><TSpan x={medium - 3} y="47.5%">2</TSpan></SvgText>
                <SvgText fill={aux_tipo == 2 ? tema.text : tema.opaque} fontSize={12}><TSpan x={medium - 40} y="65%">Información del</TSpan><TSpan x={medium - 20} y="75%">Vehículo</TSpan></SvgText>


                <Circle cx={medium + 120} cy="45%" r="11" stroke={"white"} fill={tema.primary} />
                {aux_tipo == 3 ? <Circle cx={medium + 120} cy="45%" r="10" fill={"white"} /> : <View></View>}
                <SvgText fill={aux_tipo == 3 ? tema.active : tema.text} fontSize={12}><TSpan x={medium + 120 - 3} y="47.5%">3</TSpan></SvgText>
                <SvgText fill={aux_tipo == 3 ? tema.text : tema.opaque} fontSize={12}><TSpan x={medium + 120 - 35} y="65%">Documentos</TSpan><TSpan x={medium + 120 - 25} y="75%">Respaldo</TSpan></SvgText>

                <Rect onPress={() => { cambiarPagina(1) }} x={0} y={0} width={width / 3} height={Dimensions.get('window').height * 0.2}></Rect>
                <Rect onPress={() => { cambiarPagina(2) }} x={width / 3} y={0} width={width / 3} height={Dimensions.get('window').height * 0.2}></Rect>
                <Rect onPress={() => { cambiarPagina(3) }} x={(width / 3) * 2} y={0} width={width / 3} height={Dimensions.get('window').height * 0.2}></Rect>

            </Svg>
        </View>
    };

    const getPorcentajeAvanceCliente = () => {
        let avance = 0;
        let total = 17;
        if (state?.cliente?.NIT_CI) {
            avance++;
        }
        if (state?.cliente?.TIPO_DOCUMENTO) {
            avance++;
        }
        if (state?.cliente?.LUGAR_EMISION_CI) {
            avance++;
        }
        if (state?.cliente?.NOMBRE_COMPLETO) {
            avance++;
        }
        if (state?.cliente?.PRIMER_APELLIDO) {
            avance++;
        }
        if (state?.cliente?.SEGUNDO_APELLIDO) {
            avance++;
        }
        if (state?.cliente?.CELULAR) {
            avance++;
        }
        if (state?.cliente?.FECHA_NACIMIENTO) {
            avance++;
        }
        if (state?.cliente?.SEXO) {
            avance++;
        }
        if (state?.cliente?.ESTADO_CIVIL) {
            avance++;
        }
        if (state?.cliente?.EMAIL) {
            avance++;
        }
        if (state?.cliente?.PAIS_RESIDENCIA) {
            avance++;
        }
        if (state?.cliente?.NACIONALIDAD) {
            avance++;
        }
        if (state?.cliente?.CIUDAD) {
            avance++;
        }
        if (state?.cliente?.DIRECCION) {
            avance++;
        }
        if (state?.cliente?.PROFESION) {
            avance++;
        }
        if (state?.cliente?.ACTIVIDAD_ECONOMICA) {
            avance++;
        }
        return avance * 100 / total;
    }

    const getPorcentajeAvanceAutomotor = () => {
        let avance = 0;
        let total = 11;
        if (state?.automotor?.marca?.ID) {
            avance++;
        }
        if (state?.automotor?.modelo?.ID) {
            avance++;
        }
        if (state?.automotor?.PLACA) {
            avance++;
        }
        if (state?.automotor?.NUMERO_MOTOR) {
            avance++;
        }
        if (state?.automotor?.CHASIS) {
            avance++;
        }
        if (state?.automotor?.COLOR) {
            avance++;
        }
        if (state?.automotor?.ANO) {
            avance++;
        }
        if (state?.automotor?.TRACCION) {
            avance++;
        }
        if (state?.automotor?.EXTRATERRITORIALIDAD) {
            avance++;
        }
        if (state?.automotor?.ZONA_CIRCULACION) {
            avance++;
        }
        if (state?.automotor?.ESTADO) {
            avance++;
        }
        return avance * 100 / total;
    }

    const getPorcentajeDocumentosRespaldo = () => {
        let avance = 1;
        let total = 1;

        return avance * 100 / total;
    }

    const getPorcentajeAvance = () => {
        let avance = getPorcentajeAvanceCliente();
        avance += getPorcentajeAvanceAutomotor();
        avance += getPorcentajeDocumentosRespaldo();

        return avance / 3;
    };

    const selectMarca = (marca: any) => {
        delete state?.selectMarca;
        delete state?.modelos;
        delete state?.automotor?.modelo;
        state["automotor"] = { ...state["automotor"], marca };
        setState({ ...state });
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
    };

    const selectModelo = (modelo: any) => {
        delete state.selectModelo;
        state["automotor"] = { ...state["automotor"], modelo };
        setState({ ...state });
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
    };

    const onChangeCliente = async (tipo: string, text: string) => {
        if (!state.cliente) {
            state["cliente"] = {};
        }
        state["cliente"][tipo] = text;
        AsyncStorage.setItem("cliente", JSON.stringify(state["cliente"]));
        setState({ ...state });
    };

    const getInfoPersonal = () => {
        if (state["emitiendo"]) {
            return <View>
                <View>
                    <Text style={styles.subtitle}>Emitiendo</Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', ...styles.observacion }}>
                        Estamos emitiendo su solicitud en linea, espere mientras la compañía de seguros responde.
                    </Text>
                </View>
            </View>

        }
        return <ScrollView style={{ marginTop: 15 }}>
            <PerilCliente navigation={navigation_} state={state} onChangeCliente={onChangeCliente} />
        </ScrollView>
    }


    const selectAno = (data: any) => {
        state["automotor"] = { ...state["automotor"], ANO: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
        setState({ ...state });
    };
    const selectTraccion = (data: any) => {
        state["automotor"] = { ...state["automotor"], TRACCION: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
        setState({ ...state });
    };
    const selectExtraterritorialidad = (data: any) => {
        state["automotor"] = { ...state["automotor"], EXTRATERRITORIALIDAD: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
        setState({ ...state });
    };
    const selectEstado = (data: any) => {
        state["automotor"] = { ...state["automotor"], ESTADO: data.value };
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
        setState({ ...state });
    };
    const changeAutomotor = (key: string, value: string) => {
        state["automotor"][key] = value;
        AsyncStorage.setItem("automotor", JSON.stringify(state["automotor"]));
        setState({ ...state });
    };

    const selectCameraChasis = (chasis: string) => {
        changeAutomotor("CHASIS", chasis)
    };
    const getInfoAutomotor = () => {
        return <ScrollView style={{ marginTop: 15 }}>
            <PerfilAutomotor navigation={navigation_} state={state} changeAutomotor={changeAutomotor} selectCameraChasis={selectCameraChasis} />
        </ScrollView>
    }
    const getInfoVehiculo = () => {
        if (state["emitiendo"]) {
            return <View>
                <View>
                    <Text style={styles.subtitle}>Emitiendo</Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', ...styles.observacion }}>
                        Estamos emitiendo su solicitud en linea, espere mientras la compañía de seguros responde.
                    </Text>
                </View>
            </View>

        }

        return <View style={{ marginTop: 15, backgroundColor: "red" }}>
            <View>
                <Text style={styles.subtitle}>Información del Vehículo</Text>
            </View>
            <Marcas state={state} selectMarca={selectMarca} />
            <Modelos state={state} selectModelo={selectModelo} />


            <Text style={styles.subtitle1}>Marca</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={state?.automotor?.marca?.DESCRIPCION}
                    placeholder='Pendiente...'
                    editable={false}
                />
            </View>
            <Text style={styles.subtitle1}>Modelo</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={state?.automotor?.modelo?.DESCRIPCION}
                    placeholder='Pendiente...'
                    editable={false}
                />
            </View>
            <Text style={styles.subtitle1}>Tipo</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={"Auto"}
                    placeholder='Pendiente...'
                    editable={false}
                />
            </View>
            <Text style={styles.subtitle1}>Motor cc.</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={((state?.automotor?.modelo?.MOTOR) ? (state?.automotor?.modelo?.MOTOR + "") : (""))}
                    placeholder='Pendiente...'
                    editable={false}
                />
            </View>
            <Text style={styles.subtitle1}>PLazas</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={((state?.automotor?.modelo?.PLAZAS) ? (state?.automotor?.modelo?.PLAZAS + "") : (""))}
                    placeholder='Pendiente...'
                    editable={false}
                />
            </View>
            <Text style={styles.subtitle1}>Placa</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    onChangeText={text => { changeAutomotor("PLACA", text) }}
                    style={styles.input}
                    value={(state?.automotor?.PLACA)}
                    placeholder='Pendiente...'
                />
            </View>
            <Text style={styles.subtitle1}>Motor Nro.</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    onChangeText={text => { changeAutomotor("NUMERO_MOTOR", text) }}
                    style={styles.input}
                    value={(state?.automotor?.NUMERO_MOTOR)}
                    placeholder='Pendiente...'
                />
            </View>
            <Text style={styles.subtitle1}>Chasis</Text>
            <View style={{ alignItems: 'flex-start' }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <TextInput
                        onChangeText={text => { changeAutomotor("CHASIS", text) }}
                        style={{ ...styles.input, marginLeft: 20, width: 320 }}
                        value={(state?.automotor?.CHASIS)}
                        placeholder='Pendiente...'
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation_.navigate("RecCamera", selectCameraChasis);
                        }}
                        style={{ width: 20, height: 20, marginLeft: 10 }}>
                        <IconComponent nameIcon="Camara" colors={{ color: "#000" }} ></IconComponent>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.subtitle1}>Color</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    onChangeText={text => { changeAutomotor("COLOR", text) }}
                    style={styles.input}
                    value={(state?.automotor?.COLOR)}
                    placeholder='Pendiente...'
                />
            </View>
            <Text style={styles.subtitle1}>Año</Text>
            <View style={{ alignItems: 'center' }}>
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
                    <Text style={{ color: tema.active, fontSize: 11 }}>{(state?.automotor?.ANO)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle1}>Traccion</Text>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => {
                        let aux = [];
                        let obj = { key: "4x2", value: "4x2" }
                        aux.push(obj);
                        obj = { key: "4x4", value: "4x4" }
                        aux.push(obj);
                        navigation_.navigate("Select", { data: aux, func: selectTraccion });
                    }}
                >
                    <Text style={{ color: tema.active, fontSize: 11 }}>{(state?.automotor?.TRACCION)}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle1}>Extraterritorialidad</Text>
            <View style={{ alignItems: 'center' }}>
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
                    <Text style={{ color: tema.active, fontSize: 11 }}>{(state?.automotor?.EXTRATERRITORIALIDAD)}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle1}>Zona de circulacion</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    onChangeText={text => { changeAutomotor("ZONA_CIRCULACION", text) }}
                    style={styles.input}
                    value={(state?.automotor?.ZONA_CIRCULACION)}
                    placeholder='Pendiente...'

                />
            </View>
            <Text style={styles.subtitle1}>Estado</Text>
            <View style={{ alignItems: 'center' }}>
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
                    <Text style={{ color: tema.active, fontSize: 11 }}>{(state?.automotor?.ESTADO)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle1}>Vigencia inicial</Text>
            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    value={(state.vigencia_inicial)}
                    placeholder='Pendiente...'
                    editable={false}
                />
            </View>
        </View>
    }
    const getInfoRespaldo = () => {

        if (state["emitiendo"]) {
            return <View>
                <View>
                    <Text style={styles.subtitle}>Emitiendo</Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center', ...styles.observacion }}>
                        Estamos emitiendo su solicitud en linea, espere mientras la compañía de seguros responde.
                    </Text>
                </View>
            </View>
        }

        return <View style={{ marginTop: 15, flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Documentos poliza={state.poliza} />
                <Text style={styles.subtitle} onPress={() => { navigation_.navigate("Test") }}>Test</Text>
            </View>
        </View>
    }


    return (
        <View style={{ position: 'absolute', width: "100%", height: Dimensions.get('window').height, backgroundColor: "rgba(68,125,209,1)" }}>
            <SafeAreaView style={{ position: "relative", height: "100%" }}>
                <IconComponent nameIcon='fondo_form' ></IconComponent>
                <View style={{ width: "80%", marginLeft: "20%", height: "20%" }}>
                    {getSvg()}
                </View>
                <View style={{ width: "80%", marginLeft: "20%", height: "60%" }}>

                    <View style={{ display: "flex" }}>
                        <Text style={{ color: "white", textAlign: "center" }}>
                            {
                                aux_tipo == 1 ? "Informacion Personal" : (aux_tipo == 2 ? "Informacion del Vehiculo" : "Documentacion de respaldo")
                            }
                        </Text>
                        <View style={{ backgroundColor: "gray", width: "100%", height: 2 }}></View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {

                            tipoInfo == 1 ? getInfoPersonal() : <></>
                        }
                        {
                            tipoInfo == 2 ? getInfoAutomotor() : <></>
                        }
                        {
                            tipoInfo == 3 ? getInfoRespaldo() : <></>
                        }
                        {
                            tipoInfo == 4 ? <Load></Load> : <></>
                        }
                    </View>
                    {getEmitir(getPorcentajeAvance())}
                </View>
                <View style={{ width: "100%", height: "20%" }}>
                    <Image
                        style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            resizeMode: 'stretch'
                        }}
                        source={require('./../images/foot.png')}
                    />
                </View>
            </SafeAreaView>
            <BarLeft titulo="Datos Personales"></BarLeft>
        </View>
    )
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
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15
    },
    subtitle1: {
        color: tema.primary,
        marginTop: 10,
        fontSize: 15,
        marginLeft: "5%"
    },
    input: {
        height: 30,
        borderWidth: 1,
        padding: 5,
        width: "90%",
        borderRadius: 5,
        color: tema.active,
        borderColor: tema.primary + "55",
        fontSize: 11
    },
    button3D: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: tema.primary, // Color de fondo del botón
        borderRadius: 5, // Bordes redondeados para un aspecto más suave
        margin: 10,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // Elevation para Android
        elevation: 8,
    },
    buttonText: {
        color: 'white', // Color del texto
        textAlign: 'center', // Alineación del texto
        fontWeight: 'bold', // Negrita para el texto
    },
});

export default Emision;