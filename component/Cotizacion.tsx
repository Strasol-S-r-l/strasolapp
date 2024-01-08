import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView, ImageBackground, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrencyInput from 'react-native-currency-input';
import Load from './Load';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { G, Path } from 'react-native-svg';
import BarLeft from './BarLeft';
import IconComponent from './assets/icons/IconComponent';
import Splash from './Splash';


var navigation_: any;
const Cotizacion = ({ navigation }: any) => {
    navigation_ = navigation;
    const [value, setValue] = React.useState(10000.00);
    const [state, setState] = React.useState({ tipoPago: 1 });

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        if (isEnabled) {
            { changeCredito }
        } else {
            { changeContado }
        }
        setIsEnabled((previousState) => !previousState);
    };
    useEffect(() => {
        navigation_.setOptions({ headerShown: false });

        //no borrar porque se fregan los documentos
        
        const getUser = async () => {
            await AsyncStorage.removeItem("documentos")
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
                state["polizas"] = obj.data;

                setState({ ...state });
            } catch (error) {
                return { estado: "error", error };
            }
        }
        getUser()
    }, []);

    const changeContado = () => {
        state.tipoPago = 1;
        setState({ ...state });
    }
    const changeCredito = () => {
        state.tipoPago = 2;
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
        navigation_.navigate("Emision");
        poliza["valor_asegurado"] = value;
        await AsyncStorage.setItem("poliza", JSON.stringify(poliza));
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
                    let prima = state.tipoPago == 1 ? cia.PRIMA_CONTADO : cia.PRIMA_CREDITO;
                    if (prima <= 0) return;
                    return <View key={key} style={{
                        borderColor: tema.primary,
                        borderRadius: 15,
                        marginBottom: 25,
                        width: 210,
                    }}>
                        <TouchableOpacity style={{ height: 200, width: "100%" }} onPress={() => { pressPoliza(cia) }}>
                            <View style={{ borderWidth: 1, justifyContent: "center", borderRadius: 10, backgroundColor: "rgba(34,68,119,0.5)" }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center', height: 100, padding: 5 }} >
                                    <Image
                                        key={'images_' + cia.NIT}
                                        style={{ width: "100%", height: "100%", borderRadius: 15, resizeMode: 'contain' }}
                                        source={{ uri: api.url + '/perfilCia/' + cia.NIT + '_bar' }} />
                                </View>
                                <View >
                                    <Text style={{ color: tema.text, textAlign: "center" }}>{cia.NUMERO_POLIZA}</Text>
                                    <Text style={{ color: tema.text, textAlign: "center" }}>Tasa: {cia.PORCENTAJE_TASA_REFERENCIAL} %</Text>
                                    <Text style={{ color: tema.text, textAlign: "center", fontSize: 20 }}>Prima anual</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <View style={{
                                    borderWidth: 1,
                                    backgroundColor: (prima == max ? "rgba(153,0,0,0.5)" : (prima == min ? "rgba(0,102,51,0.5)" : "rgba(255,255,0,0.5)")),
                                    width: 210, borderRadius: 10
                                }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: 'white', fontWeight: 'bold' }}>{prima.toFixed(2)} $us</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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
                    <Text style={{ width: "80%", color: tema.primary, fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Insurance<Text style={{ marginTop: 10, color: "black", fontSize: 45, fontWeight: 'bold' }}>Tech</Text> </Text>
                </View>
                <Text style={{ width: "80%", color: "black", fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Bolivia</Text>
            </View>
            <View style={{ width: "100%", height: "30%", justifyContent: 'center', alignContent: "center", alignItems: "center" }}>
                <Image style={{ width: 60, height: 60 }} source={require('../images/load.gif')} />
            </View>
        </View>;
    }

    return (
        <View style={{ position: 'relative', width: Dimensions.get("window").width, height: Dimensions.get('window').height, padding: 0, margin: 0, backgroundColor: "rgba(68,125,209,1)" }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            <SafeAreaView style={{ height: "100%" }}>
                <View style={{ alignItems: 'center', height: "20%", width: "80", marginLeft: "20%" }}>
                    <View style={{ width: "90%", margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CurrencyInput
                            style={styles.input}
                            value={value}
                            onChangeValue={setValue}
                            delimiter=","
                            separator="."
                            precision={0}
                            placeholder='Coloque el Valor Asegurado'
                        />
                        <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ color: tema.text, fontSize: 11 }}>Ingrese el valor comercial de su Vehículo en </Text>
                            <Text style={{ color: tema.primary, fontSize: 11 }}>$us</Text>
                        </View>
                    </View>
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
                </View>
                <View style={{ alignItems: 'center', height: "60%", width: "80", marginLeft: "20%" }}>
                    <Text style={{ textAlign: 'center', marginTop: 5, marginBottom: 5, color: tema.opaque, fontSize: 11 }}>Seleccione la póliza de su conveniencia</Text>
                    <ScrollView>
                        <View>
                            {getCotizaciones()}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ width: "100%", height: "20%", backgroundColor: tema.background }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: tema.danger,
                            borderRadius: 5,
                            display: "flex",
                            width: "100%",
                            height: 50,
                            marginRight: 5
                        }}
                        onPress={async () => {
                            await AsyncStorage.removeItem("usuario");
                            navigation_.replace("Splash");
                        }}
                    >
                        <Text style={{ color: tema.active, textAlign: "center", padding: 5 }}>Salir</Text>
                    </TouchableOpacity>
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
            <BarLeft titulo="Cotizacion de Prima en Linea"></BarLeft>
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