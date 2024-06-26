import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrencyInput from 'react-native-currency-input';
import Load from './Load';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarLeft from './BarLeft';
import IconComponent from './assets/icons/IconComponent';
import Publicidad from './Publicidad';


var navigation_: any;
var cont = 0;
const Cotizacion = ({ navigation }: any) => {
    navigation_ = navigation;
    const [value, setValue] = React.useState(10000.00);
    const [cuotas, setCuotas] = React.useState(1);
    const [state, setState] = React.useState({ tipoPago: 1 });

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        if (!isEnabled) {
            changeCredito();
        } else {
            changeContado();
        }
        setIsEnabled((previousState) => !previousState);
    };
    useEffect(() => {
        navigation_.setOptions({ headerShown: false });

        //no borrar porque se fregan los documentos 

        const getUser = async () => {
            const suser: any = await AsyncStorage.getItem("usuario");
            if (!suser || suser == null) {
                navigation_.replace("Login");
                return;
            }
            state["usuario"] = JSON.parse(suser);
            fetchData(state["usuario"].ID_CLIENTES);
            return;
        };

        const fetchData = async (id_cliente) => {
            try {

                const response = await fetch(api.url + '/app',
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', },
                        body: JSON.stringify({ key: api.key, type: 'getProductosVenta', id_cliente: id_cliente }),
                    });
                const obj = await response.json();
                
                if (obj.estado === "error") {
                    return obj;
                }
                if (obj.data) {
                    state["polizas"] = obj.data;
                } else {
                    state["polizas"] = [];
                }
                setState({ ...state });
            } catch (error) {
                return { estado: "error", error };
            }
        }
        getUser()
    }, []);

    const changeContado = () => {
        state.tipoPago = 1;
        setCuotas(1);
        setState({ ...state });
    }
    const changeCredito = () => {
        state.tipoPago = 2;
        setCuotas(5);
        setState({ ...state });
    }

    const addPrimas = () => {
        state["min_contado"] = 0;
        state["max_contado"] = 0;
        state["min_credito"] = 0;
        state["max_credito"] = 0;

        state.polizas.map((cia) => {
            cia["PRIMA_CONTADO"] = value * (cia.PORCENTAJE_TASA_REFERENCIAL / 100);
            cia["PRIMA_CREDITO"] = ((value * (cia.PORCENTAJE_TASA_REFERENCIAL / 100)) * 100) / (100 - cia.PORCENTAJE_FINANCIAMIENTO);

            if (state["min_contado"] > cia["PRIMA_CONTADO"]) state["min_contado"] = cia["PRIMA_CONTADO"];
            if (state["min_credito"] > cia["PRIMA_CREDITO"]) state["min_credito"] = cia["PRIMA_CREDITO"];

            if (state["max_contado"] < cia["PRIMA_CONTADO"]) state["max_contado"] = cia["PRIMA_CONTADO"];
            if (state["max_credito"] < cia["PRIMA_CREDITO"]) state["max_credito"] = cia["PRIMA_CREDITO"];
        });

    };

    const pressPoliza = async (poliza: any) => {
        poliza["valor_asegurado"] = value;
        await AsyncStorage.removeItem("documentos");
        await AsyncStorage.setItem("poliza", JSON.stringify(poliza));
        await AsyncStorage.setItem("cuotas", cuotas + "");
        navigation_.navigate("Emision");
    };

    const verSlip = async (id_cabe: any) => {
        //console.log(id_cabe);
        navigation_.navigate("SlipMadre", {id_cabe:id_cabe});

    };


    const getCotizaciones = () => {

        if (!state.polizas) return <Load />

        addPrimas();

        let min = 0;
        let max = 0;

        if (state.tipoPago == 1) {
            //contado
            state.polizas = state.polizas.sort((a, b) => { return a.PRIMA_CONTADO > b.PRIMA_CONTADO ? 1 : -1 });
            min = state.min_contado;
            max = state.max_contado;
        } else {
            //credito
            state.polizas = state.polizas.sort((a, b) => { return a.PRIMA_CREDITO > b.PRIMA_CREDITO ? 1 : -1 });
            min = state.min_credito;
            max = state.max_credito;
        }
            return <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignContent: "center", justifyContent: "center", }}>
            {

                state.polizas.map((cia, key) => {


                    if (cia.TIPO_PAGO_INTEGRACION === "CONTADO" && state.tipoPago !== 1) return;
                    if (cia.TIPO_PAGO_INTEGRACION === "CREDITO" && state.tipoPago == 1) return;

                    let prima = state.tipoPago == 1 ? cia.PRIMA_CONTADO : cia.PRIMA_CREDITO;

                    if (prima < 1) return;

                    return <View key={key} style={{
                        borderColor: tema.primary,
                        borderRadius: 15,
                        marginBottom: 25,
                        width: 210,
                    }}>
                        <View style={{ height: 250, width: "100%" }}>
                            <View style={{ borderWidth: 1, justifyContent: "center", borderRadius: 10 ,backgroundColor: "rgba(34,68,119,0.5)" }}>
                                <View style={{ alignItems: 'center', marginTop:5, justifyContent: 'center', height: 100 }} >
                                    <Image
                                        key={'images_' + cia.NIT}
                                        style={{ width: "100%", height: 100, borderRadius: 9, borderBottomLeftRadius:0, borderBottomRightRadius:0, resizeMode: 'contain' }}
                                        source={{ uri: api.url + '/perfilCia/' + cia.NIT + '_bar' }} />
                                </View>
                                <View >
                                    <Text style={{ color: tema.text, textAlign: "center" }}>{cia.NUMERO_POLIZA}</Text>
                                    <Text style={{ color: tema.text, textAlign: "center" }}>Tasa: {cia.PORCENTAJE_TASA_REFERENCIAL} %</Text>
                                    <Text style={{ color: tema.text, textAlign: "center", fontSize: 20 }}>Prima anual</Text>
                                </View>
                                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
                                    <TouchableOpacity
                                        onPress={() => { pressPoliza(cia) }}
                                    >
                                        <Image style={{ width: 40, height: 40, marginLeft:20 }} source={require('../images/buy.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { verSlip(cia.ID_CABE) }}
                                    >
                                        <Image style={{ width: 40, height: 40, marginRight:20 }} source={require('../images/slip.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <View style={{marginBottom:8}}>
                                        <Text style={{ marginRight:10, textAlign: 'center', fontSize: 25, color: (prima == max ? "rgba(153,0,0,0.5)" : (prima == min ? "rgba(0,102,51,0.5)" : "rgba(255,255,0,0.5)")), fontWeight: 'bold' }}> $us {prima.toFixed(2)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                })
            }
        </View>
    };

    if (!state.usuario) {
        return <View style={{ position: "relative", width: "100%", height: "100%" }}>
            <IconComponent nameIcon='fondo_load' ></IconComponent>
            <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: "20%" }}>
                <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ width: "80%", color: tema.primary, fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Seguros</Text>
                </View>
                <Text style={{ width: "80%", color: "black", fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Bolivia</Text>
            </View>
            <View style={{ width: "100%", height: "30%", justifyContent: 'center', alignContent: "center", alignItems: "center" }}>
                <Image style={{ width: 60, height: 60 }} source={require('../images/load.gif')} />
            </View>
        </View>;
    }

    return (
        <View style={{ position: 'relative', width: Dimensions.get("window").width, height: Dimensions.get('window').height, padding: 0, margin: 0, backgroundColor: tema.background }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            <SafeAreaView style={{ height: "100%" }}>
                <View style={{ alignItems: 'center', height: "20%", width: "80", marginLeft: "20%" }}>
                    <View style={{ width: "90%", margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CurrencyInput
                            style={{ ...styles.input, backgroundColor: "rgb(240,240,240)", borderColor: tema.primary, borderWidth: 2 }}
                            value={value}
                            onChangeValue={setValue}
                            delimiter=","
                            separator="."
                            precision={0}
                            placeholder='Coloque el Valor Asegurado'
                        />
                        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: tema.text, fontSize: 11 }}>Ingrese el valor comercial de su Vehículo en </Text>
                            <Text style={{ color: tema.primary, fontSize: 11 }} onPress={() => {
                                cont++;
                                if (cont >= 20) {
                                    cont = 0;
                                    navigation_.navigate("Ppl");
                                }
                            }}>$us</Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", justifyContent: "center", display: "flex", flexDirection: "row", position: 'relative', alignItems: "center" }}>
                        <View>
                            <Text style={{ color: tema.opaque, fontSize: 11, textAlign: 'center' }}>Seleccione su forma de pago</Text>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                                <View>
                                    <Text style={{ color: isEnabled ? tema.opaque : tema.text }}>Contado</Text>
                                    <Text style={{ color: !isEnabled ? tema.opaque : tema.text }}>Credito</Text>
                                </View>
                            </View>
                        </View>

                        {isEnabled ? <View style={{ position: 'absolute', right: 20, bottom: 0 }}>
                            <Text>Cuotas</Text>
                            <CurrencyInput
                                style={{ height: 40, width: 50, backgroundColor: "white", borderRadius: 10, borderWidth: 2, borderColor: tema.primary, color: tema.active, textAlign: 'center' }}
                                value={cuotas}
                                onChangeValue={setCuotas}
                                delimiter=","
                                separator="."
                                precision={0}
                                placeholder='Cuota'
                            />
                        </View> : <></>}
                    </View>
                </View>
                <View style={{ alignItems: 'center', height: "60%", width: "80%", marginLeft: "20%" }}>
                    <Text style={{ textAlign: 'center', marginTop: 5, marginBottom: 5, color: tema.opaque, fontSize: 11 }}>Seleccione la póliza de su conveniencia</Text>
                    <ScrollView>
                        <View>
                            {getCotizaciones()}
                        </View>
                    </ScrollView>
                </View>
                <BarLeft titulo={"Cotizacion de Prima en Linea"} />
                <View style={{ width: "100%", height: "20%", }}>
                    <Publicidad />
                </View>
            </SafeAreaView>

        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        width: "100%",
        textAlign: 'center',
        borderRadius: 10,
        color: tema.active,
        borderColor: tema.primary

    },
    drawer: {
        width: 200,
        height: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 3,
        padding: 10,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
});

export default Cotizacion;