import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'

const Modelos = (props:any) => {
    const [state, setState] = React.useState(props);
    const [text, onChangeText] = React.useState('');

    const getModelos = async () => {
        try {
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getModelos', idMarca:props.state.automotor.marca.ID, nit:props.state.poliza.NIT}),
            });
            const obj = await response.json();
            if(obj.estado === "error"){
                await setTimeout(() => {
                    getModelos();
                }, 5000);
                return obj;
            }
            
            props["state"]["modelos"] = obj.data || {};
            setState({...props});
            } catch (error) {
            return {estado:"error", error};
        }
    }

    if(!props.state?.automotor?.marca?.ID) return <View></View>
    
    if(!props.state.modelos){
        getModelos();
        return <View>
            <Text style={{textAlign:'center', ...styles.observacion}}>Seleccione el modelo.</Text>
            <Load />
        </View>
    } 

    return <View>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Modelo Vehiculo'
                    placeholderTextColor={tema.opaque}
                    />
            </View>
            <ScrollView  horizontal={true} style={{height:170}}>
            {
                Object.values(props.state.modelos).sort((a:any,b:any)=>{ return a.DESCRIPCION>b.DESCRIPCION?1:-1 }).filter((modelo:any)=>{return modelo.DESCRIPCION.toUpperCase().indexOf(text.toUpperCase())>-1}).map((modelo:any, key)=>{
                    return <TouchableOpacity 
                        onPress={()=>{props.selectModelo(modelo)}}
                        key={key}  
                        style={{
                            ...styles.card, 
                            borderWidth:5,
                            justifyContent:"center",
                            alignItems:"center",
                            borderColor:((modelo.ID == props?.state?.automotor?.modelo?.ID)?tema.danger:"white")
                        }}
                        >

                        <Text style={{textAlign:'center', color:tema.active}}>{modelo.DESCRIPCION}</Text>
                        <Text style={{textAlign:'center', color:tema.active}}>C.c: {modelo.MOTOR}</Text>
                        <Text style={{textAlign:'center', color:tema.active}}>Plazas: {modelo.PLAZAS}</Text>
                        {/*<Text style={{textAlign:'center', color:tema.active}}>Codigo: {modelo.CODIGO_COMPANIA}</Text>*/}
                    </TouchableOpacity>
                })
            }
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    card:{
        margin:10, 
        height:150, 
        width:150, 
        borderRadius:15, 
        padding:5, 
        borderWidth:1,
        backgroundColor:tema.background
    },
    observacion:{
        marginTop:25,  
        color:tema.opaque, 
        fontSize:11
    },
    subtitle:{
        color:tema.active, 
        textAlign:'center', 
        marginTop:10, 
        fontSize:15
    },
    input: {
        height: 30,
        borderWidth: 2,
        padding: 5,
        paddingLeft: 10,
        width:"60%",
        borderRadius:10,
        color:tema.background,
        borderColor:tema.opaque
        
      },
});

export default Modelos;