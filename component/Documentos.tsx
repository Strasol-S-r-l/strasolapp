import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import tema from '../enviroments/tema.json'
import Load from './Load';
import IconComponent from './assets/icons/IconComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Documentos = (props:any) => {
    const [state, setState] = useState(props?.documentos);
    const navigation = useNavigation();

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
        console.log(state["error"]);
        return <ScrollView>
            <View>
                <Text style={{color:tema.danger, textAlign:'center'}}>Intentelo mas tarde</Text>
            </View>
        </ScrollView>
    }


    return (
        <SafeAreaView style={{ alignItems: 'center', height: "100%", width: "100%"}}>
            <ScrollView style={{ width: "100%" }}>
                {
                    state["documentos"] ? paintDocs() : <Load />
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Documentos;