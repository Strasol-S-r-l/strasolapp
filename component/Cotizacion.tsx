import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurrencyInput from 'react-native-currency-input';
import Load from './Load';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconComponent from './assets/icons/IconComponent';
import Svg, { G, Path } from 'react-native-svg';
import BarLeft from './BarLeft';


var navigation_: any;
const Cotizacion = ({ navigation }: any) => {
    navigation_ = navigation;
    const [value, setValue] = React.useState(10000.00);
    const [state, setState] = React.useState({ tipoPago: 1 });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });

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

        return <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
                state.polizas.map((cia, key) => {
                    let prima = state.tipoPago == 1 ? cia.PRIMA_CONTADO : cia.PRIMA_CREDITO;
                    if (prima <= 0) return;
                    return <View key={key} style={{
                        borderWidth: 1,
                        borderColor: tema.primary,
                        padding: 10,
                        margin: 5,
                        borderRadius: 15,
                        marginBottom: 5,
                        marginTop: 15,
                        width: 185,
                    }}>
                        <TouchableOpacity style={{ height: 200 }} onPress={() => { pressPoliza(cia) }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', height: 100 }} >
                                <Image
                                    key={'images_' + cia.NIT}
                                    style={{ width: "100%", height: "100%", borderRadius: 15, resizeMode: 'contain' }}
                                    source={{ uri: api.url + '/perfilCia/' + cia.NIT + '_bar' }} />
                            </View>
                            <View style={{ margin: 1 }}>
                                <Text style={{ color: tema.active }}>{cia.NUMERO_POLIZA}</Text>
                                <Text style={{ color: tema.active }}>Tasa: {cia.PORCENTAJE_TASA_REFERENCIAL} %</Text>
                                <Text style={{ color: tema.active, fontSize: 20 }}>Prima anual</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <View style={{
                                    borderWidth: 1,
                                    backgroundColor: (prima == max ? tema.danger : (prima == min ? tema.succes : tema.warning)),
                                    width: 150, borderRadius: 10, alignItems: 'flex-end'
                                }}>
                                    <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold' }}>{prima.toFixed(2)} $us</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                })
            }
        </View>
    };

    if (!state.usuario) {
        return <><Text style={{ color: "black" }}>Cargando...</Text></>;
    }

    return (
        <View style={{ position:'relative', width: Dimensions.get("window").width, height: Dimensions.get('window').height ,padding:0,margin:0}}>
            <SafeAreaView style={{ height: "100%"}}>
                <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", shadowColor: tema.danger, shadowOffset: { width: 2, height: 1 }, alignItems: "center", borderColor: tema.primary, borderWidth: 1 }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                        <View>
                            <Image
                                style={{ width: 50, height: 50, borderRadius: 10 }}
                                source={{ uri: api.url + "/imagesAdmin/" + state.usuario.CI }}
                            />
                        </View>
                        <View>
                            <Text style={{ color: tema.primary }}>{state.usuario.USUARIO}</Text>
                            <Text style={{ color: tema.primary }}>{(state.usuario.PRIMER_NOMBRE || "") + " " + (state.usuario.SEGUNDO_NOMBRE || "") + " " + (state.usuario.PRIMER_APELLIDO || "") + " " + (state.usuario.SEGUNDO_APELLIDO || "")}</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={toggleDrawer}>
                            <Svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" >
                                <G>
                                    <Path id="Vector" d="M5 17H19M5 12H19M5 7H19" stroke="gray" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </G>
                            </Svg>
                        </TouchableOpacity>
                    </View>

    </View>
                <View style={{ position: 'relative' }}>
                   {isDrawerOpen && (
                        <View style={styles.drawer}>
                            <TouchableOpacity onPress={toggleDrawer}>
                                <Text>Cerrar Barra Lateral</Text>
                            </TouchableOpacity>
                            
                    <View style={{ display: 'flex' ,flexDirection: "row"}}>
                        <View style={{
                            width: 50,
                            height: 50,
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: tema.danger,
                                    borderRadius: 5,
                                    display: "flex",
                                    width: 50,
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
                            <TouchableOpacity
                                style={{
                                    backgroundColor: tema.warning,
                                    borderRadius: 5,
                                    display: "flex",
                                    width: 50,
                                    height: 50,
                                    marginRight: 5
                                }}
                                onPress={async () => {
                                    navigation_.navigate("Productos");
                                }}
                            >
                                <Text style={{ color: tema.active, textAlign: "center", padding: 5 }}>Certificados</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    display: "flex",
                                    width: 50,
                                    height: 50,
                                    marginRight: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    navigation_.navigate("RecCamera")
                                }}
                            >
                                <View style={{ width: 30, height: 30 }}>
                                    <IconComponent nameIcon='Camara' colors={{ color: tema.primary }}></IconComponent>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                        </View>
                    )}
                    <ScrollView>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ height: 90, marginTop: 30, width: "90%", borderRadius: 15 }}>
                                <Text key={"0"} style={{ fontSize: 30, color: tema.primary, textAlign: 'center', marginTop: 10 }} >Cotización de prima</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ color: tema.opaque, fontSize: 11 }}>Ingrese el valor comercial de su Vehículo en </Text>
                                <Text style={{ color: tema.primary, fontSize: 11 }}>$us</Text>
                            </View>

                            <View style={{ margin: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                <CurrencyInput
                                    style={styles.input}
                                    value={value}
                                    onChangeValue={setValue}
                                    delimiter=","
                                    separator="."
                                    precision={0}
                                    placeholder='Coloque el Valor Asegurado'
                                />
                            </View>

                        </View>
                        <View>
                            <Text style={{ marginTop: 20, color: tema.opaque, fontSize: 11, textAlign: 'center' }}>Seleccione su forma de pago</Text>
                        </View>
                        <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-evenly', }}>
                            <TouchableOpacity
                                onPress={changeContado}
                                style={{
                                    borderWidth: state.tipoPago == 1 ? 1 : 0,
                                    borderColor: tema.primary,
                                    padding: 10,
                                    borderRadius: 10,
                                    width: (Dimensions.get('window').width / 2) - 25
                                }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ width: 60, height: 60 }} source={require('../images/cash.png')} />
                                </View>
                                <View>
                                    <Text style={{ color: tema.active, textAlign: 'center' }}>Contado</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={changeCredito}
                                style={{
                                    borderWidth: state.tipoPago == 2 ? 1 : 0,
                                    borderColor: tema.primary,
                                    padding: 10,
                                    borderRadius: 10,
                                    width: (Dimensions.get('window').width / 2) - 25
                                }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={{ width: 60, height: 60 }} source={require('../images/credito.png')} />
                                </View>
                                <View>
                                    <Text style={{ color: tema.active, textAlign: 'center' }}>Crédito</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center', marginTop: 25, color: tema.opaque, fontSize: 11 }}>Seleccione la póliza de su conveniencia</Text>
                            {getCotizaciones()}
                        </View>
                    </ScrollView>
                </View>
                
            </SafeAreaView>
            <BarLeft titulo="HOLA MUNDO"></BarLeft>
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
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