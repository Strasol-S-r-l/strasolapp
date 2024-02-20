import React, { useEffect, useRef, useState } from 'react';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'
import { Vimeo } from 'react-native-vimeo-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions, Text, View } from 'react-native';

var navigation_: any;
const Emitiendo = ({ route, navigation }: any) => {
    navigation_ = navigation;
    const videoRef = useRef(null);
    const [state, setState] = useState({})

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
        init();
    }, []);

    const init = async()=>{
        let videoId = await getIdVideoRandom();
        setState({...state, videoId})
    };

    const getIdVideoRandom= async()=>{
        try {

            emitir();

            const response = await fetch('https://api.vimeo.com/channels/'+api.vimeo.channel+'/videos',
            {
                method: 'GET',
                headers: { 'Authorization': 'bearer '+api.vimeo.key, },
            });

            const data = await response.json();
            let random = Math.floor(Math.random() * data.data.length)
            return data.data[random].uri.split("/")[2];
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const emitir= async()=>{
        state["poliza"] = await AsyncStorage.getItem("poliza");
        state["poliza"] = JSON.parse(state["poliza"]);

        state["cliente"] = await AsyncStorage.getItem("cliente");
        state["cliente"] = JSON.parse(state["cliente"]);

        state["automotor"] = await AsyncStorage.getItem("automotor");
        state["automotor"] = JSON.parse(state["automotor"]);

        state["usuario"] = await AsyncStorage.getItem("usuario");
        state["usuario"] = JSON.parse(state["usuario"])

        let documentos = await AsyncStorage.getItem("documentos");
        let cuotas = await AsyncStorage.getItem("cuotas");
        if (documentos) {
            documentos = JSON.parse(documentos);

            documentos = await Promise.all(
                documentos.map(async (obj) => {
                    if (obj.url) {
                        obj["image"] = await RNFS.readFile(obj.url, 'base64');
                    } else {
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
                    usuario: state.usuario.USUARIO,
                    cliente: state.cliente,
                    automotor: state.automotor,
                    poliza: state.poliza,
                    documentos: documentos,
                    cuotas: cuotas
                }),
            }).then(async (response) => {

                const obj = await response.json();


                if (obj.estado === "error") {
                    state["error"] = JSON.stringify(obj.error);
                    navigation_.replace("Emision", {error:state.error});
                    return;
                }


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
                state["error"] = e + "";
                state["emitiendo"] = false;
                console.log(e)
                //setMensaje("Intentelo mas tarde");
                //openModal();
                navigation_.replace("Emision", {error:state.error});

                console.log(e + " error de respuesta")
                return;
            });
    };

    if(state.videoId) return <Vimeo 
        style={{backgroundColor:'#000'}}
        videoId={state.videoId}  
    />
    
    return (
        <View style={{backgroundColor:"#000", display:'flex', justifyContent:'center', height:Dimensions.get('window').height}}>
            <Load />
            <Text style={{color:tema.text, textAlign:'center'}}>Emitiendo</Text>
            <Text style={{color:tema.text, textAlign:'center'}}>Esto puede demorar unos minutos...</Text>
        </View>
    )
};

export default Emitiendo;