import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import api from '../enviroments/api.json'
import RNFS from 'react-native-fs';
import tema from '../enviroments/tema.json'
import Load from './Load';
import IconComponent from './assets/icons/IconComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const Documentos = (props: any) => {
    const [state, setState] = useState({});
    const navegation = useNavigation();
    const route = useRoute();

    const action = (nav: String) => {
        let name = route.name;
        navegation.navigate(nav);
    }

    useEffect(() => {

        const init = async () => {
            //console.log(imageBlob)

            let selected = await AsyncStorage.getItem("docSelected");
            if (selected) selected = JSON.parse(selected);
            state["selected"] = selected;

            let send = {
                key: api.key,
                type: "getDocumentosAsignadosPoliza",
                id_cabe: props.poliza.ID_CABE
            };
            const uploadResponse = await fetch(api.url + '/app', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(send), // FormData will be sent as multipart/form-data
            });
            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
            }

            let obj = await uploadResponse.json();
            console.log(obj)
            if (obj.estado == "error") {
                console.log(obj.error)
                setState({ ...state })
                return;
            }

            state["documentos"] = obj.data;
            setState({ ...state })
        }

        init();
    }, []); // Asegúrate de que las dependencias estén correctamente listadas aquí

    const paintDocs = () => {

        return <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {
                state.documentos.map((doc, key) => {
                    let color = tema.active;
                    if (state["selected"]) {
                        if (state["selected"][doc.ID + ""]) {
                            color = tema.succes;
                        }
                    }

                    return <TouchableOpacity
                        key={key}
                        onPress={async () => {
                            console.log(doc.ID + " -> " + doc.DESCRIPCION)
                            doc["url"] = "sadad";
                            if (!state["selected"]) state["selected"] = {};
                            state["selected"][doc.ID + ""] = { url: "hola" }
                            navegation.navigate("CamaraDoc");
                            //await AsyncStorage.setItem("docSelected", JSON.stringify(state["selected"]));
                            //setState({ ...state })
                        }}
                        style={{ backgroundColor:"white",justifyContent:"center",alignContent:"center",width: 120, height: 130, borderWidth: 1, borderColor: "yellow", borderRadius: 10, margin: 10, alignItems: 'center' }}>
                        <View style={{ height: 50, width: 50 }}>
                            <IconComponent nameIcon="Camara" colors={{ color: color }} ></IconComponent>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10,backgroundColor:"#40B05F",borderRadius:10,width:"90%" }}>
                            <Text style={{ color: tema.active, textAlign: 'center' }}>{doc.DESCRIPCION}</Text>
                        </View>

                    </TouchableOpacity>
                })
            }

        </View>
    }
const navegar = (num:any) =>{
    if(num == 1){

    }else{
        
    }
};

    if(state["documentos"]){
        return <ScrollView>
            {paintDocs()}
        </ScrollView>
    }


    return (
        <View style={{ alignItems: 'center', height: "100%", width: "100%"}}>
            {/*<View style={{ width: "100%", height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                
                <View style={{ flexDirection: "row", height: "50%" }}>
                    <TouchableOpacity style={{ backgroundColor: tema.background, margin: "5%",marginTop:0,marginBottom:0, borderColor: "yellow", borderWidth: 1, width: "40%", height: "85%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Image style={{
                            width: "80%",
                            height: "45%",
                            resizeMode: 'stretch'
                        }} source={require('./../images/carnet_anverso.png')} />
                        <View style={{ backgroundColor: "#40B05F", justifyContent: "center", alignItems: "center", width: "80%", height: 40, borderRadius: 10 , marginTop:"10%"}}>
                            <Text>Carnet</Text>
                            <Text>Identidad</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: tema.background, margin: "5%",marginTop:0,marginBottom:0, borderColor: "yellow", borderWidth: 1, width: "40%", height: "85%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                    <Image style={{
                            width: "80%",
                            height: "35%",
                            resizeMode: 'stretch'
                        }} source={require('./../images/ruat_icono.png')} />
                        <View style={{ backgroundColor: "#40B05F", justifyContent: "center", alignItems: "center", width: "80%", height: 40, borderRadius: 10  , marginTop:"15%"}}>
                            <Text>RUAT</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", height: "50%" }}>
                    <TouchableOpacity style={{ backgroundColor: tema.background, margin: "5%",marginBottom:0, borderColor: "yellow", borderWidth: 1, width: "40%", height: "85%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Image style={{
                            width: "80%",
                            height: "45%",
                            resizeMode: 'stretch'
                        }} source={require('./../images/auto_icono.png')} />
                        <View style={{ backgroundColor: "#B05440", justifyContent: "center", alignItems: "center", width: "80%", height: 40, borderRadius: 10  , marginTop:"10%"}}>
                            <Text>Fotografias</Text>
                            <Text>Vehiculo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: tema.background, margin: "5%",marginBottom:0, borderColor: "yellow", borderWidth: 1, width: "40%", height: "85%", justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                        <Image style={{
                            width: "80%",
                            height: "45%",
                            resizeMode: 'stretch'
                        }} source={require('./../images/formulario_icono.png')} />
                        <View style={{ backgroundColor: "#B05440", justifyContent: "center", alignItems: "center", width: "80%", height: 40, borderRadius: 10  , marginTop:"10%"}}>
                            <Text>Formulario</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ height: "20%", width: "100%", justifyContent: "space-around", alignItems: "center"}}>
                <Text style={{ fontSize: 10}}>*declaro y garantizo que la misma es veraz y precisa.</Text>
                <TouchableOpacity style={{ backgroundColor: "#247BCC", flex:0.7,width:"80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>Emitir Seguro</Text>
                </TouchableOpacity>
                    </View>*/}
            <ScrollView style={{ width: "100%" }}>
                {
                    state["documentos"] ? paintDocs() : <Load />
                }

            </ScrollView>
        </View>
    );
};

export default Documentos;