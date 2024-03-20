import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import api from '../enviroments/api.json'
import { useNavigation, useRoute } from '@react-navigation/native';
import Load from './Load';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';


const SlipMadre = () => {
    const [state, setState] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
        const init = async () => {
            const response = await fetch(api.url + '/app',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ key: api.key, id_cabe: 128578, type: 'getCobertura' }),
                    //body: JSON.stringify({ key: api.key, id_cabe: route.params.id_cabe, type: 'getCobertura' }),
                });
            const obj = await response.json();
            if (obj.estado === "error") {
                return obj;
            }
            obj.data.SLIP = JSON.parse(obj.data.SLIP);
            setState(obj.data);
        };
        init();
    }, []);
    const action = (nav: any) => {
        navigation.goBack();
    }
    const paintSlipMadre = () => {
        let obj = state.SLIP;
        let slip = [];
        if (obj == null) {
            return;
        }
        let titulo = state.TITULO;
        let descripcion = state.DESCRIPCION;
        let color = "";
        if (titulo) {
            slip.push(<View style={styles.container_item}><Text style={{ color: tema.text, fontSize: 18, fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{titulo}</Text></View>)
        }
        if (descripcion) {
            slip.push(<View style={styles.container_item}><Text style={{ color: tema.text, fontSize: 16, fontWeight: 'bold', marginTop: 5, textAlign: 'center' }}>{descripcion}</Text></View>)
        }
        for (let i = 0; i < obj.length; i++) {
            let json = obj[i];
            //console.log(json.ID_CARACTERISTICA)
            if(json.ID_CARACTERISTICA){
                color = tema.succes
            }else{
                color = tema.text
            }
            if (json.DESCRIPCION) {
                slip.push(<View style={styles.container_item}><Text style={{ color: tema.text, fontWeight: 'bold', marginTop: 20 }}>{json.DESCRIPCION}</Text></View>);
            }
            for (let j = 0; j < json.DETALLE_NIVEL2.length; j++) {

                let nivel_2 = json.DETALLE_NIVEL2[j]
                //console.log(nivel_2.ID_CARACTERISTICA)
                if(nivel_2.ID_CARACTERISTICA){
                    color = tema.succes
                }else{
                    color = tema.text
                }
                if (nivel_2.NEGRILLA) {
                    slip.push(<View style={{ ...styles.sub_nivel, width: '95%' }}><Text style={{ color: tema.text, fontWeight: 'bold' }}>{nivel_2.NEGRILLA}</Text></View>);
                }
                if (nivel_2.DESCRIPCION) {
                    slip.push(<View style={{ ...styles.sub_nivel, width: '95%' }}><Text style={{ color: tema.text }}>{nivel_2.DESCRIPCION}</Text></View>);
                }
                for (let k = 0; k < nivel_2.LISTA.length; k++) {
                    
                    let nivel_2_lista = nivel_2.LISTA[k]
                    //console.log(nivel_2_lista.ID_CARACTERISTICA)
                    if(nivel_2_lista.ID_CARACTERISTICA){
                        color = tema.succes
                    }else{
                        color = tema.text
                    }
                    if (nivel_2_lista.DESCRIPCION) {
                        slip.push(<View style={{ ...styles.sub_nivel, width: '90%' }}><Text style={{ color: tema.text }}> • {nivel_2_lista.DESCRIPCION}</Text></View>);
                    }
                }

                if (nivel_2.TABLA_CABE) {
                    let tabla_cabe = nivel_2.TABLA_CABE
                    let tabla_columas = [];
                    let tabla_detalle = [];
                    let row = [];
                    let table = [];

                    for (let h = 0; h < tabla_cabe.length; h++) {
                        //console.log(tabla_cabe[h].ID_CARACTERISTICA)
                        tabla_columas = tabla_cabe[h].COLUMNAS;
                        tabla_detalle = tabla_cabe[h].DETALLE;
                        if(tabla_cabe[h].ID_CARACTERISTICA){
                            color = tema.succes
                        }else{
                            color = tema.text
                        }
                        if (tabla_cabe[h].TIPO_TABLA) {
                            for (let d = 0; d < tabla_columas.length; d++) {
                                let col_titulo = tabla_columas[d].TITULO;
                                row.push(<View style={{ width: 100, borderColor: tema.text, borderWidth: 1, justifyContent: 'center', alignItems: 'center',minHeight: 32  }}><Text style={{ color: tema.text, fontWeight: 'bold' }}>{col_titulo}</Text></View>);
                            }

                            table.push(<View style={{ display: 'flex', flexDirection: (tabla_cabe[h].TIPO_TABLA == '0') ? 'row' : 'column'}}>{row}</View>)

                            row = [];
                            let num_rows = tabla_detalle.length / tabla_columas.length
                            for (let c = 0; c < num_rows; c++) {
                                for (let n = 0; n < tabla_detalle.length; n++) {
                                    let col_descrip = tabla_detalle[n].DESCRIPCION;
                                    row.push(<View style={{ width: 100, borderColor: tema.text, borderWidth: 1 }}><Text style={{ color: tema.text,minHeight: 30  }}> {col_descrip}</Text></View>);
                                }
                                table.push(<View style={{ display: 'flex', flexDirection: (tabla_cabe[h].TIPO_TABLA == '0') ? 'row' : 'column', }}>{row}</View>)
                            }

                            slip.push(<ScrollView style={{flex:1,width:'100%'}}><View style={{justifyContent:'center',alignItems:'center', flexDirection: (tabla_cabe[h].TIPO_TABLA == '0') ? 'column' : 'row', marginBottom: 5 }}>{table}</View></ScrollView>)
                            table = [];
                        }
                    }
                }

            }
        }
        return slip
    };
    return (
        <SafeAreaView style={{ flex: 1, position: 'relative' }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            {
                state ?
                    <View>
                        <ScrollView style={{ width: '90%', marginLeft: '5%', height: '90%', borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={{ marginLeft: '5%', marginTop: 20, alignItems: 'flex-end' }}>
                                {paintSlipMadre()}
                            </View>
                        </ScrollView>
                        <View style={{ height: '10%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { action('') }} style={{ backgroundColor: tema.primary, borderRadius: 10, height: 40, width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: tema.text, fontWeight: 'bold' }}>VOLVER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    :
                    <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Load></Load>
                    </View>
            }
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container_item: {
        width: '100%',
    },
    sub_nivel: {
        margin: 2,
    },
});


export default SlipMadre;
