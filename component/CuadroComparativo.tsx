import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, StatusBar } from 'react-native';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';
import Load from './Load';
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

var navigation_: any;
const CuadroComparativo = ({ navigation }: any) => {
    navigation_ = navigation;
    const [state, setState] = useState([]);

    const goBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        console.log(navigation_)
        navigation_.setOptions({ headerShown: false });
        navigation.setOptions({ headerShown: false });


        const init = async () => {
            const suser: any = await AsyncStorage.getItem("usuario");
            if (!suser || suser == null) {
                navigation_.replace("Login");
                return;
            }
            state["usuario"] = JSON.parse(suser);

            const response = await fetch(api.url + '/app',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ key: api.key, id_cliente: state["usuario"].ID_CLIENTES, type: 'getCuadroComparativo' }),
                    //body: JSON.stringify({ key: api.key, id_cabe: route.params.id_cabe, type: 'getCobertura' }),
                });
            const obj = await response.json();
            if (obj.estado === "error") {
                return obj;
            }
            console.log(obj.data)

            setState(obj.data);

            /*Object.keys(state).map((key:any)=>{
                console.log(state[key])
            })*/
        };
        init();

    }, []);

    const paintItem = () => {

        return Object.keys(state).map((key: any) => {
            return <View style={{ minHeight: 60, width: '100%', borderColor: tema.text, borderWidth: 2 }}>
                <Text style={{ color: tema.text }}>{state[key].DESCRIPCION}</Text>
            </View>
        })

    };
    const paintItemPoliza = () => {
        return <View >
            {Object.keys(state?.CARACTERISTICAS).map((key: any) => {
                return <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ width: 200, borderColor: tema.text, borderWidth: 1, }}>
                        <Text style={{ color: tema.text }}>{state.CARACTERISTICAS[key].DESCRIPCION}</Text>
                    </View>
                    {paintSlipCaracteristica(key)}
                </View>
            })}
        </View>
    };
    const paintSlipCaracteristica = (id_caract: any) => {

        return <View style={{display:'flex',flexDirection:'row'}}>{
            Object.keys(state?.SLIP).map((key: any) => {
                let slip = state?.SLIP[key]
                if (slip.CARACTERISTICAS) {
                    let caract = [];
                    for (let index = 0; index < slip.CARACTERISTICAS.length; index++) {
                            if(id_caract == slip.CARACTERISTICAS[index].ID_CARACTERISTICA)
                            caract.push(<Text style={{ color: tema.text }}> - {slip.CARACTERISTICAS[index].DESCRIPCION}</Text>)
                    }
                    if(caract.length > 0){
                        return <View style={{ borderColor: tema.text, borderWidth: 2,width:250}}>
                        {caract}
                        </View>
                    }else{
                        return <View style={{ borderColor: tema.text, borderWidth: 1, justifyContent:'center',alignItems:'center', width:250}}>
                        <IconComponent nameIcon='iconCheckFalse' alto={25} ancho={25} colors={{color_1:'gray'}}></IconComponent>
            </View>  
                    }
                } else {
                    return <View style={{ width:50,borderColor: tema.text, borderWidth: 1, justifyContent:'center',alignItems:'center'}}>
                                <IconComponent nameIcon='iconCheckFalse' alto={25} ancho={25} colors={{color_1:'gray'}}></IconComponent>
                    </View>
                }

            })}</View>
    }
    return <View style={{ backgroundColor: 'skyblue', position: 'relative', flex: 1 }}>
        <View style={styles.MainCardContainer}>
            <View style={{ width: '100%', height: '10%' }}>
                <Text style={styles.tittle}>CUADRO COMPARATIVO</Text>
            </View>
            <View style={{ width: '100%', height: '75%' }}>
                {
                    (state.length == 0) ?
                        <Load></Load>
                        :
                        <View style={{ width: '100%', height: '100%' }}>
                            <ScrollView>
                            <ScrollView horizontal>
                                {paintItemPoliza()}
                            </ScrollView>
                            </ScrollView>
                        </View>
                }
            </View>
        </View>
        <View style={{ left: '5%', width: '90%', height: '10%', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => { goBack() }} style={{ borderRadius: 15, backgroundColor: tema.primary, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>VOLVER</Text>
            </TouchableOpacity>
        </View>
    </View>
};
const styles = StyleSheet.create({
    MainCardContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '90%',
        marginTop: '5%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '2%',
        borderRadius: 15
    },
    sub_nivel: {
        margin: 2,
    },
    tittle: {
        color: tema.text,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
});
export default CuadroComparativo;
