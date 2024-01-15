import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import api from '../enviroments/api.json'
import RNFS from 'react-native-fs';
import tema from '../enviroments/tema.json'
import Load from './Load';
import IconComponent from './assets/icons/IconComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

const Documentos = (props:any) => {
    const [state, setState] = useState({});
    const navigation = useNavigation();
    const route = useRoute();

    const action = (nav: String) => {
        let name = route.name;
        navigation.navigate(nav);
    }

    useEffect(() => {

        const init = async () => {
            let documentos = await AsyncStorage.getItem("documentos")
            
            
            if(documentos) documentos = JSON.parse(documentos)
            else documentos = [];
            
            

            state["documentos"] = documentos;
            setState({ ...state })
            console.log( JSON.stringify(state) + " asdasdasdas dasd")
        }

        init();
    }, []); // Asegúrate de que las dependencias estén correctamente listadas aquí
    const getIcon=(doc:any)=>{
        if(doc.url) return <Image source={{ uri: "file://"+doc.url }} style={{ width: 50, height: 50 }} /> 
        return <IconComponent nameIcon="Camara" colors={{ color: tema.active }} ></IconComponent>
    }
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
                            
                            state["selected"] = { id:doc.ID }
                            navigation.navigate("CamaraDoc",state["selected"]);
                            //await AsyncStorage.setItem("docSelected", JSON.stringify(state["selected"]));
                            //setState({ ...state })
                        }}
                        style={{ backgroundColor:"white",justifyContent:"center",alignContent:"center",width: 120, height: 130, borderWidth: 1, borderColor: "yellow", borderRadius: 10, margin: 10, alignItems: 'center' }}>
                        <View style={{ height: 50, width: 50 }}>
                            {getIcon(doc)}
                            
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10,backgroundColor:"#40B05F",borderRadius:10,width:"90%" }}>
                            <Text style={{ color: tema.active, textAlign: 'center' }}>{doc.DESCRIPCION}</Text>
                        </View>
                        

                    </TouchableOpacity>
                })
            }

        </View>
    }
    if(state["documentos"]?.length == 0){
        return <View>
            <Text>No tiene Documentos</Text>
        </View>
    }
    if(state["documentos"]){
        return <ScrollView>
            {
                state["documentos"]?.length > 0 ? paintDocs() : <Load />
            }
        </ScrollView>
    }
    if(state["estado"] == "error"){
        return <ScrollView>
            <View>
                <Text style={{color:tema.danger, textAlign:'center'}}>{state["error"]}</Text>
            </View>
        </ScrollView>
    }


    return (
        <View style={{ alignItems: 'center', height: "100%", width: "100%"}}>
            <ScrollView style={{ width: "100%" }}>
                {
                    state["documentos"] ? paintDocs() : <Load />
                }
            </ScrollView>
        </View>
    );
};

export default Documentos;