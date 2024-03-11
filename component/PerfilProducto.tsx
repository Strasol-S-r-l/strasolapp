import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions } from 'react-native';
import Share from 'react-native-share';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import Load from './Load';
import IconComponent from './assets/icons/IconComponent';
import BarLeft from './BarLeft';
import { SafeAreaView } from 'react-native-safe-area-context';

var navigation_: any;
const PerfilProducto = ({ route, navigation }: any) => {
    navigation_ = navigation;

    const [state, setState] = React.useState({});

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
        const init = async () => {
            const response = await fetch(api.url + '/app',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ key: api.key, type: 'getProducto', tipo: "Certificado", ID: route.params.ID }),
                });

            const obj = await response.json();

            if (obj.estado === "error") {
                state["certificado"] = obj;
                setState({ ...obj });
                return;
            }

            state["certificado"] = obj.data;
            setState({ ...state });
        };
        init();
    }, []);

    const getCliente = () => {
        return <View style={{ marginTop: 10 }}>
            <View style={styles.containerTittle}>
                <Text style={{ color: tema.text, fontWeight: 'bold' }}>ASEGURADO</Text>
            </View>

            {
                state?.certificado?.TOMADOR ?
                    <View>
                        <View><Text style={{ fontWeight: "bold", color: tema.text }}>Tomador:</Text></View>
                        <View style={{ marginLeft: 10, marginRight: 10 }}>
                            {
                                state?.certificado?.TOMADOR.map((tomador, i) => {
                                    return <View key={"container_tomador_item" + i} style={{ marginLeft: 10, marginRight: 10 }}>
                                        <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                                            <Text>Nombre:</Text>
                                            <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{tomador?.NOMBRE_COMPLETO}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                                            <Text>CI/NIT:</Text>
                                            <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{tomador?.NIT_CI_COMPLETO ? tomador?.NIT_CI_COMPLETO : "-*-"}</Text>
                                        </View>
                                        <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                                            <Text>Telefono:</Text>
                                            <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{tomador?.TELEFONO ? tomador?.TELEFONO : "-*-"}</Text>
                                        </View>
                                    </View>
                                })
                            }
                        </View>
                    </View> : <></>
            }
            {state?.certificado?.NOMBRE_SUBROGADO ?
                <View>
                    <View><Text style={{ fontWeight: "bold", color: tema.text }}>Subrogado:</Text></View>
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                        <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                            <Text>Nombre:</Text>
                            <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state?.certificado?.NOMBRE_SUBROGADO}</Text>
                        </View>
                        <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                            <Text>Valor Subbrogado:</Text>
                            <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state?.certificado?.MONTO_SUBROGADO ? state?.certificado?.MONTO_SUBROGADO : "0"}</Text>
                        </View>
                    </View>
                </View> : <></>
            }
            <View>
                <View><Text style={{ fontWeight: "bold", color: tema.text }}>Asegurado:</Text></View>
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                        <Text style={{ width: "60%" }}>Documento de Identidad:</Text>
                        <Text style={{ color: tema.text, width: "40%", textAlign: "right" }}>{state.certificado.CLIENTE.NIT_CI}{state.certificado.CLIENTE.LUGAR_EMISION_CI}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                        <Text>Nombre:</Text>
                        <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.CLIENTE.NOMBRE_COMPLETO}</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                        <Text>Telefono:</Text>
                        <TouchableOpacity
                            onPress={openWhatsAppChat}>
                            <Text style={{ color: tema.primary, textDecorationLine: 'underline' }}>{state.certificado.CLIENTE.CELULAR}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    }

    const getPlanPagos = () => {
        return <View style={{ marginTop: 10 }}>
            <View style={styles.containerTittle}>
                <Text style={{ color: tema.text, fontWeight: 'bold' }}>PLAN DE PAGOS</Text>
            </View>
            {
                state.certificado.PLAN_PAGOS.map((cuota, i) => {
                    return <View key={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                        <Text style={{ color: tema.text, marginLeft: 10 }}> {i + 1}</Text>
                        <Text style={{ color: tema.text }}>{cuota.FECHA_PAGO}</Text>
                        <Text style={{ color: tema.text }}>$us. {cuota.PRIMA}</Text>
                        <Text style={{ color: tema.text, marginRight: 10 }}>{cuota.ESTADO_PAGO == 1 ? "Pendiente" : "Pagada"}</Text>
                    </View>
                })
            }
        </View>

    }

    const sharePdf = (titulo: string, url: string) => {
        let message = "*" + titulo + "*";
        message += "\n\n";
        message += "*Poliza #*: " + state.certificado.NUMERO_POLIZA.trim();
        message += "\n";
        message += "*Certificado #*: " + state.certificado.NUMERO_CERTIFICADO.trim();
        message += "\n";
        message += "*Marca*: " + state.certificado.AUTOMOTOR.MARCA.trim();
        message += "\n";
        message += "*Modelo*: " + state.certificado.AUTOMOTOR.MODELO.trim();
        message += "\n";
        message += "*Placa*: " + state.certificado.DATO_ADICIONAL.trim();
        message += "\n";
        message += "*Prima*: $us. " + state.certificado.PRIMA.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        message += "\n\n";
        message += "Descargue su documento ⬇️\n";
        message += url;
        Share.open({
            title: titulo,
            message
            //type: 'application/pdf',
        });
    }

    const getDoc = (title: string, doc: any) => {
        if (!doc) return null;

        return <TouchableOpacity
            onPress={() => {
                sharePdf(title, doc)
            }}
        >
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    style={{ width: 60, height: 60 }}
                    source={require('../images/pdf.webp')}
                />
                <Text style={{ color: tema.text }}>{title}</Text>
            </View>
        </TouchableOpacity>

    };

    const getDocs = () => {
        let emision = state?.certificado?.EMISION;

        if (!emision) return <></>


        emision = JSON.parse(emision);


        if (emision.sDocumentsEmi) {
            return <View style={{ marginTop: 10 }}>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                    {
                        Object.values(emision.sDocumentsEmi).map((doc) => {
                            return <TouchableOpacity
                                onPress={() => {
                                    sharePdf(doc.sDescript, doc.sUrlFile)
                                }}
                                key={doc.sUrlFile}
                            >
                                <View style={{ display: 'flex', alignItems: 'center' }}>
                                    <Image
                                        style={{ width: 60, height: 60 }}
                                        source={require('../images/pdf.webp')}
                                    />
                                    <Text style={{ color: tema.text }}>{doc.sDescript}</Text>
                                </View>
                            </TouchableOpacity>
                        })
                    }

                </View>
            </View>
        }
        if (emision.certificado) {
            return <View style={{ marginTop: 10 }}>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {getDoc("Certificado", emision.certificado)}
                    {getDoc("Anexo de Subrogación", emision.anexo_subrogacion)}
                </View>
            </View>
        }


        return <></>
    }

    const getAutomotor = () => {
        return <View style={{ marginTop: 30 }}>
            <View style={styles.containerTittle}>
                <Text style={{ color: tema.text, fontWeight: 'bold' }}>MATERIA ASEGURADA</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Marca</Text>
                <Text style={{ color: tema.text, width: "50%" }}>{state.certificado.AUTOMOTOR.MARCA.trim()}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Modelo</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.MODELO.trim()}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Placa</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.DATO_ADICIONAL}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Año</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.ANO}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Tipo</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.TIPO.trim()}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Color</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.COLOR}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Plazas</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.PLAZAS}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Motor Cc.</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.MOTOR}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Chasis Nro.</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.CHASIS}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Motor Nro.</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.NUMERO_MOTOR}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Trancción</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.TRACCION}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Extraterritoriedad</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.EXTRATERRITORIALIDAD}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Zona de circulación</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.ZONA_CIRCULACION}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Ubicar</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.UBICAR}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.text, width: "50%" }}>Uso</Text>
                <Text style={{ color: tema.text, width: "50%", textAlign: "right" }}>{state.certificado.AUTOMOTOR.USO}</Text>
            </View>
        </View>
    }

    const getDatosCertificado = () => {
        return <View style={{ marginTop: 30 }}>
            <View style={styles.containerTittle}>
                <Text style={{ color: tema.text, fontWeight: 'bold' }}>CONTRATO DEL ASEGURADO</Text>
            </View>
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: tema.text }}>Numero Póliza:</Text>
                    <Text style={{ color: tema.text }}>{state.certificado.NUMERO_POLIZA}</Text>
                </View >
                <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: tema.text }}># Certificado</Text>
                    <Text style={{ color: tema.text }}>{state.certificado.NUMERO_CERTIFICADO}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: tema.text }}>Valor Asegurado</Text>
                    <Text style={{ color: tema.text }}>$us. {state.certificado.VALOR_ASEGURADO.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: tema.text }}>Tipo Pago</Text>
                    <Text style={{ color: tema.text }}>{state.certificado.TIPO_PAGO}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: tema.text }}>Prima</Text>
                    <Text style={{ color: tema.text }}>$us. {state.certificado.PRIMA.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', display: "flex", flexDirection: "row" }}>
                    <Text style={{ color: tema.text }}>Prima Neta</Text>
                    <Text style={{ color: tema.text }}>$us. {state.certificado.PRIMA_NETA.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
                </View>
            </View>
            {/*
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.active }}># Póliza</Text>
                <Text style={{ color: tema.active }}>{state.certificado.NUMERO_POLIZA}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.active }}># Certificado</Text>
                <Text style={{ color: tema.active }}>{state.certificado.NUMERO_CERTIFICADO}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.active }}>Valor Asegurado</Text>
                <Text style={{ color: tema.active }}>$us. {state.certificado.VALOR_ASEGURADO.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.active }}>Tipo Pago</Text>
                <Text style={{ color: tema.active }}>{state.certificado.TIPO_PAGO}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.active }}>Prima</Text>
                <Text style={{ color: tema.active }}>$us. {state.certificado.PRIMA.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                <Text style={{ color: tema.active }}>Comisión</Text>
                <Text style={{ color: tema.active }}>$us. {state.certificado.COMISION.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
    </View>}*/}
            {
                /*
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginLeft:10, marginTop:10, marginRight:10}}>
                    <Text style={{color:tema.active, fontWeight:'bold'}}>Vigencias</Text>
                </View>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:50, marginRight:50}}>
                    <Text style={{color:tema.active}}>{state.certificado.VIGENCIA_INICIAL}</Text>
                    <Text style={{color:tema.active}}>{state.certificado.VIGENCIA_FINAL}</Text>
                </View>*/
            }
        </View>
    };

    const openWhatsAppChat = () => {
        let phoneNumber = '+591' + state.certificado.CLIENTE.CELULAR; // Número de teléfono al que deseas enviar el mensaje

        let message = "*Tu seguro fue emitido correctamente*";
        message += "\n\n";
        message += "*Ci Asegurado*: " + state.certificado.CLIENTE.NIT_CI + "" + state.certificado.CLIENTE.LUGAR_EMISION_CI;
        message += "\n";
        message += "*Nombre Asegurado*: " + state.certificado.CLIENTE.NOMBRE_COMPLETO;
        message += "\n";
        message += "*Poliza #*: " + state.certificado.NUMERO_POLIZA.trim();
        message += "\n";
        message += "*Certificado #*: " + state.certificado.NUMERO_CERTIFICADO.trim();
        message += "\n";
        message += "*Valor asegurado*: $us. " + state.certificado.VALOR_ASEGURADO.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        message += "\n";
        message += "*Prima*: $us. " + state.certificado.PRIMA.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        message += "\n";
        message += "*Marca*: " + state.certificado.AUTOMOTOR.MARCA.trim();
        message += "\n";
        message += "*Modelo*: " + state.certificado.AUTOMOTOR.MODELO.trim();
        message += "\n";
        message += "*Placa*: " + state.certificado.DATO_ADICIONAL.trim();
        message += "\n";
        message += "*Ano*: " + state.certificado.AUTOMOTOR.ANO;
        message += "\n";
        message += "*Color*: " + state.certificado.AUTOMOTOR.COLOR;
        message += "\n";
        message += "*Motor cc.*: " + state.certificado.AUTOMOTOR.MOTOR;
        message += "\n";
        message += "*Motor #*: " + state.certificado.AUTOMOTOR.NUMERO_MOTOR;
        message += "\n";
        message += "*Chasis #*: " + state.certificado.AUTOMOTOR.CHASIS;
        message += "\n\n";

        let emision = state?.certificado?.EMISION;

        if (emision) {
            message += "Descargue sus documentos ⬇️\n";
            message += "\n\n";
            emision = JSON.parse(emision);

            if (emision.sDocumentsEmi) {
                Object.values(emision.sDocumentsEmi).map((doc) => {
                    message += "*" + doc.sDescript + "*\n";
                    message += doc.sUrlFile + "\n\n";
                })
            }
            if (emision.certificado) {
                message += "*Certificado*\n";
                message += emision.certificado + "\n\n";
            }
        }


        // Elimina los espacios y otros caracteres no numéricos del número
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

        // Crea la URL para enviar el mensaje
        let url = `whatsapp://send?text=${encodeURIComponent(message)}&phone=${phoneNumber}`;
        // Verifica si se pueden abrir 
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log('No se puede abrir WhatsApp');
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('Ocurrió un error', err));
    };
    const toBack = () => {
        navigation.goBack();
    };
    const pintar = () => {
        if (!state?.certificado) return <Load />;



        return <ScrollView style={{ marginTop: 20 }}>
            {getCliente()}
            {getDatosCertificado()}
            {getDocs()}
            {getAutomotor()}
            {getPlanPagos()}

            {/*<View style={{ marginLeft: 10, marginRight: 10, marginTop: 40 }}>
                <Text style={{ color: tema.opaque, textAlign: 'right' }}>{new Date(state.certificado.FECHA_REGISTRO).toLocaleString()}</Text>
            </View>*/}

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation_.replace("Home")
                    }}
                    style={{ backgroundColor: tema.primary, height: 50, width: 130, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: tema.text, fontWeight: 'bold', textAlign: 'center' }}>Volver al Menú</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            <View style={{ width: "80%", height: "80%", marginLeft: "20%" }}>
                <View style={styles.containerTittle}>
                    <Text style={styles.subtitle}>Información del Certificado</Text>
                </View>
                {pintar()}
            </View>

            <SafeAreaView style={{ ...StyleSheet.absoluteFillObject, width: "30%", flexDirection: 'row' }}>
                <Image
                    style={{
                        flex: 1,
                        width: null,
                        height: null,
                        resizeMode: 'stretch'
                    }}
                    source={require('./../images/bar_left.png')}
                />
                <SafeAreaView style={{
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: "50%",
                    flexDirection: 'column',
                    zIndex: 2
                }}>
                    <SafeAreaView style={{...StyleSheet.absoluteFillObject,alignItems:'center',marginBottom:50}}>
                        <TouchableOpacity style={{ zIndex: 1, top:0 }} onPress={() => toBack()}>
                            <IconComponent nameIcon='arrowLeft' colors={{ color_1: "white" }} alto={50} ancho={50} ></IconComponent>
                        </TouchableOpacity>
                    </SafeAreaView>
                    <Text style={{ backgroundColor:'red',width: Dimensions.get('window').height ,top: 55, transform: [{ rotate: '90deg' }], fontSize: 24, fontWeight: "bold", color: tema.text }}>Cobertura Emitida</Text>
                </SafeAreaView>
            </SafeAreaView>
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
    )
};

const styles = StyleSheet.create({
    subtitle: {
        color: tema.primary,
        textAlign: 'center',
        marginTop: 10,
        fontSize: 25
    },
    containerTittle: {
        borderBottomWidth: 1,
        borderColor: "gray",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    }
});
export default PerfilProducto;