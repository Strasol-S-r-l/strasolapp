import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, StyleSheet, ToastAndroid, Platform, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';
import IconComponent from './assets/icons/IconComponent';
import ModalComponent from './ModalComponent';

const uniqueTimestamp = new Date().getTime()+'';
const PplView = ({ tipo, item }: any) => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const navegation = useNavigation();
    const [urlImage, setUrlImage] = useState(String);
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    const action = (url: string, json: any) => {
        navegation.navigate(url, json);
    }
    const showToast = (messenge: string) => {
        ToastAndroid.show(messenge, ToastAndroid.SHORT);
    };
    const handleDownloadAndroid = async (doc: string) => {
        try {
            showToast('Descargando');
            const url = api.url + '/app?evento=abrirDocumentoCarta&doc1=' + doc;
            /*const response = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    mediaScannable: true,
                    title: doc,
                    mime: getFileContentType(doc),
                    path: `${RNFetchBlob.fs.dirs.DownloadDir}/${doc}`,
                },
            }).fetch('POST', url);
            */
            showToast('Archivo descargado con éxito.');
        } catch (error) {
            showToast('No se pudo conectar al servidor intentelo mas tarde.');
        }
    };
    const handleDownloadIOS = async (doc: string) => {
        try {
            const url = api.url + '/app?evento=abrirDocumentoCarta&doc1=' + doc;
            const response = await RNFetchBlob.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    title: doc,
                    mime: getFileContentType(doc),
                    path: `${RNFetchBlob.fs.dirs.DownloadDir}/${doc}`,
                },
            }).fetch('POST', url).then((res) => {
            })


        } catch (error) {
        }
    };
    const getFileContentType = (fileName: string) => {
        const ext = fileName.split('.').pop();
        switch (ext) {
            case 'pdf':
                return 'application/pdf';
            case 'docx':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            case 'xlsx':
                return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            default:
                return 'application/octet-stream';
        }
    };
    const isImages = (fileName: string) => {
        const ext = fileName.split('.').pop();
        switch (ext) {
            case 'png':
                return true;
            case 'jpg':
                return true;
            case 'gif':
                return true;
            case 'jpge':
                return true;
        }
        return false;
    }
    const openDownloadedFile = async (doc: string) => {
        if (Platform.OS === 'android') {
            handleDownloadAndroid(doc);
        }
        if (Platform.OS === 'ios') {
            handleDownloadIOS(doc);
        }
    };
    const identificarOS = async (doc: string) => {
        if (isImages(doc)) {
            setUrlImage(doc);
            openModal();
            return;
        }
        if (Platform.OS === 'android') {
            handleDownloadAndroid(doc);
        }
        if (Platform.OS === 'ios') {
            handleDownloadIOS(doc);
        }
    }
    const abrirModalSinistroImages = (modalVisible: any, closeModal: any, key: any) => {
        let uniqueTimestamp = new Date().getTime();
        return <View>
            <ModalComponent id_modal={key+'_modal_images'}  visible={modalVisible} onClose={closeModal}  >
                <View>
                    <Image source={{ uri: api.url + "/imagesCartas/" +urlImage+'?timestamp='+uniqueTimestamp }} style={{ width: (screenWidth*0.9), height: (screenWidth*0.9), margin: 5 }} resizeMode='stretch'/>
                    <TouchableOpacity onPress={()=>openDownloadedFile(urlImage) }  style={{backgroundColor:'#17594A',height:40,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:5}}>
                        <Text style={{color:'white'}}>DESCARGAR IMAGEN</Text>
                    </TouchableOpacity>
                </View>
            </ModalComponent>
        </View>
    }


    const pintarProductos = (producto: any, tipo: String) => {
        return <View key={tipo + '_' + producto.ID} style={{ ...styles.container, width: screenWidth }}>
            <View style={{ height: '10%' }}>
                <Image key={'images_' + producto.NIT_COMPANIA + '_bar_' + producto.ID}
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: api.url + "/perfilCia/" + producto.NIT_COMPANIA + '_bar?timestamo='+uniqueTimestamp }}
                    resizeMode='stretch'
                />
            </View>
            <View key={'images_' + producto.ID_RIESGO + "_riesgo_" + producto.ID} style={{ height: '45%' }}>
                <Image
                    style={{ height: '100%', width: '100%' }}
                    // source={require('../images/prub_riesgo.jpg')}
                    source={{ uri: api.url + "/imagesRiesgo/" + producto.ID_RIESGO+ '?timestamo='+uniqueTimestamp}}
                    resizeMode='stretch'
                />
            </View>

            <ScrollView style={styles.producto}>
                <Text style={{ ...styles.titulo, textAlign: 'center' }}>{producto.RIESGO}</Text>
                <View style={styles.line}>
                    <Text style={{ ...styles.titulo, width: '49%' }}>Vigencia Inicialas</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>:</Text>
                    <Text style={{ ...styles.texto, width: '49%', textAlign: 'right' }}>{getFechaLiteral(producto.VIGENCIA_INICIAL)}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={{ ...styles.titulo, width: '49%' }}>Vigencia Final</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>:</Text>
                    <Text style={{ ...styles.texto, width: '49%', textAlign: 'right' }}>{getFechaLiteral(producto.VIGENCIA_FINAL)}</Text>
                </View>
                <View style={styles.line}>
                    <View style={{ width: '49%', display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ ...styles.titulo ,width:'85%'}}>Proxima Cuota</Text>
                        {compararFechaIcon(producto, tipo)}
                    </View>

                    <Text style={{ color: 'white', fontWeight: 'bold' }}>:</Text>
                    <View style={{ ...styles.texto, width: '49%', display: 'flex' }}>
                        {compararFecha(producto, tipo)}
                    </View>
                </View>
                <View style={styles.line}>
                    <Text style={{ ...styles.titulo, width: '49%' }}>Poliza Madre:</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>:</Text>
                    <Text style={{ ...styles.texto, width: '49%', textAlign: 'right' }}>{producto.NUMERO_POLIZA}</Text>
                </View>
                {
                    producto.NUMERO_CERTIFICADO ? (
                        <View style={styles.line}>
                            <Text style={{ ...styles.titulo, width: '49%' }}># Certificado:</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>:</Text>
                            <Text style={{ ...styles.texto, width: '49%', textAlign: 'right' }}>{producto.NUMERO_CERTIFICADO || 'Sin Numero'}</Text>
                        </View>
                    ) : (
                        <View></View>
                    )
                }
                {
                    producto.NUMERO_APLICACION ? (
                        <View style={styles.line}>
                            <Text style={{ ...styles.titulo, width: '49%' }}># Aplicacion:</Text>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>:</Text>
                            <Text style={{ ...styles.texto, width: '49%', textAlign: 'right' }}>{producto.NUMERO_APLICACION || 'Sin Numero'}</Text>
                        </View>
                    ) : (
                        <View></View>
                    )
                }
                {pintarBloqueSniestro(tipo, producto)}
                {pinterBloqueDocumentos(tipo, producto)}
            </ScrollView>
            {abrirModalSinistroImages(modalVisible, closeModal, producto.ID)}
        </View>
    };
    const pinterBloqueDocumentos = (tipo: any, producto: any) => {
        if (producto.CARTAS == null) {
            return <View></View>
        }
        var array = [];
        for (let index = 0; index < producto.CARTAS.length; index++) {
            array.push(<View key={producto.CARTAS[index].ID + "_view_" + index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderTopWidth:1,borderColor:'white' }}>
                <Text style={{ ...styles.texto, width: '35%' }}>{producto.CARTAS[index].DESCRIPCION}</Text>
                <Text style={{ ...styles.texto, width: '55%' }}>{(producto.CARTAS[index].OBSERVACION)}</Text>
                <TouchableOpacity style={{alignContent:'center',marginLeft:6}} key={producto.CARTAS[index].ID + "_carta_producto_" + index} onPress={() => identificarOS(producto.CARTAS[index].DOCUMENTO)}>
                    {producto.CARTAS[index].DOCUMENTO ? <IconComponent nameIcon="iconCloudDownload" alto="20px" ancho="20px" colors={{color_1:"#4477CE"}}></IconComponent> : <></>
                    }
                </TouchableOpacity>
            </View>)
        }
        return <View style={{ display: 'flex', flexDirection: 'column' }}>
            <Text style={{ width: '100%', color: 'white',fontWeight:'bold', textAlign: 'center' }}>Documentos</Text>
            <View>
                {
                    array
                }
            </View>
        </View>
    }
    const pintarBloqueSniestro = (tipo:any, producto:any) => {
        if (producto.COUNT_ABIERTO == 0 && producto.COUNT_CERRADO == 0) {
            return <View></View>
        }
        return <View style={styles.line}>
            <Text style={{ ...styles.titulo, width: '49%' }}>Siniestro:</Text>
            <Text style={{ color: 'white' }}>:</Text>
            <View style={{ width: '49%', display: 'flex', flexDirection: 'column' }}>

                <TouchableOpacity style={{ display: 'flex', height: 20, borderRadius: 5, backgroundColor: '#17594A', justifyContent: 'center', alignItems: 'center' }} onPress={() => action('Siniestros', { tipo: tipo, ...producto })}>
                    <Text style={{ color: 'white' }}>Abrir Siniestro</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
    const compararFecha = (producto: any, tipo: any) => {
        let fechaProx = producto.DATOS_PROX_PAGO;
        let fechaActual = producto.FECHA_ACTUAL;
        if (!fechaProx || fechaProx == '') {
            return <TouchableOpacity style={{ display: 'flex', height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#17594A', width: '100%' }} onPress={() => action('PerfilProducto', { tipo: tipo, ...producto })}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Ver Plan de Pago</Text>
            </TouchableOpacity>
        }
        if (!fechaActual || fechaActual == '') {
            return <TouchableOpacity style={{ display: 'flex', height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: '#17594A', width: '100%' }} onPress={() => action('PerfilProducto', { tipo: tipo, ...producto })}>
                <Text style={{ color: 'white' }}>Ver Plan de Pago</Text>
            </TouchableOpacity>
        }
        var aux_fechaProx = fechaProx.split('/');
        var aux_fechaActual = fechaActual.split('/');

        var date_prox = new Date(fechaProx);
        var date_actual = new Date(fechaActual);

        date_prox = new Date(aux_fechaProx[2], aux_fechaProx[1], aux_fechaProx[0])
        date_actual = new Date(aux_fechaActual[2], aux_fechaActual[1], aux_fechaActual[0])

        if (date_prox >= date_actual) {
            return <TouchableOpacity style={{ display: 'flex', height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: '100%' ,borderWidth: 1, borderColor:"white"}} onPress={() => action('PerfilProducto', { tipo: tipo, ...producto })}>
                <Text style={{ width: '100%', color: 'white', textAlign: 'center' }}>{'   ' + getFechaLiteral(fechaProx)}</Text>
            </TouchableOpacity>

        }
        if (date_prox < date_actual) {
            return <TouchableOpacity style={{display: 'flex', height: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: 'brown', width: '100%' }} onPress={() => action('PerfilProducto', { tipo: tipo, ...producto })}>
                <Text style={{ width: '100%',color: 'white', textAlign: 'center' }}>{'   ' + getFechaLiteral(fechaProx)}</Text>
            </TouchableOpacity>
        }
    }
    const compararFechaIcon = (producto: any, tipo: any) => {
        let fechaProx = producto.DATOS_PROX_PAGO;
        let fechaActual = producto.FECHA_ACTUAL;
        if (!fechaProx || fechaProx == '') {
            return <></>
        }
        if (!fechaActual || fechaActual == '') {
            return <></>
        }

        return <TouchableOpacity style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onPress={() => action('PerfilProducto', { tipo: tipo, ...producto })}>
            <Image
                style={{ height: 18, width: 18 }}
                source={require('../images/icons/calendario.png')}
                resizeMode='stretch'
            />
        </TouchableOpacity>

    }
    return pintarProductos(item, tipo)

};

const getFechaLiteral = (fecha: any) => {
    if (!fecha || fecha == '') {
        return ''
    }
    var array = fecha.split('/');
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
const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5
    },
    producto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 3 },
        textShadowRadius: 10
    },
    titulo: {
        fontWeight: 'bold',
        marginTop: 5,
        lineHeight: 24,
        color: '#fff'
    },
    texto: {
        marginTop: 5,
        lineHeight: 24,
        color: '#fff'
    },
    enlace: {
        fontWeight: 'bold',
        marginTop: 5,
        lineHeight: 24,
        color: 'skyblue'
    },
    line: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    }
});

export default PplView;