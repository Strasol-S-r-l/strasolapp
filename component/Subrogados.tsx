import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'


const Subrogados = (props:any) => {
    const [state, setState] = React.useState(props.state);
    
    const getSubrogatarios = async () => {
        try {
            
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getSubrogatarios', nit:state.poliza.NIT}),
            });
            const obj = await response.json();
            if(obj.estado === "error"){
                await setTimeout(() => {
                    getSubrogatarios();
                }, 5000);
                return obj;
            }
            state["subrogatarios"] = obj.data;
            setState({...state});
            } catch (error) {
            return {estado:"error", error};
        }
    }

    
    if(!state.subrogatarios){
        getSubrogatarios();
        return <View>
            <Text style={{...styles.subtitle}}>Seleccione su subrogatario.</Text>
            <Load />
        </View>
    } 

    const onChangeText=(ele:any)=>{
        state.poliza.valor_asegurado = ele;
        setState({...state})
    };

    return <View>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    //onChangeText={onChangeText}
                    value={""}
                    placeholder='Buscar subrogatario'
                    placeholderTextColor={tema.opaque}
                    />
            </View>
            <ScrollView  horizontal={true} style={{height:190}}>
            {
                state.subrogatarios.sort((a:any,b:any)=>{ return a.NOMBRE_COMPLETO<b.NOMBRE_COMPLETO?1:-1 }).map((subrogado:any, key)=>{
                    return <TouchableOpacity 
                        onPress={()=>{props.selectSubrogatario(subrogado)}}
                        key={key}  
                        style={{
                            ...styles.card, 
                            borderColor:((subrogado.ID == props.state?.automotor?.subrogatario.ID)?tema.primary:tema.opaque)
                        }}
                        >

                        <View style={{alignItems:'center'}}>
                            <Image 
                            key={key}
                            style={{width:50, height:50, borderRadius:15, resizeMode:'stretch'}} 
                            source={{uri:api.url+'/getimagen/marcas/'+subrogado.ID+"?date="+new Date().getDay()}} />
                        </View>
                        <Text style={{textAlign:'center', color:tema.active}}>{subrogado.CODIGO}</Text>
                        <Text style={{textAlign:'center', color:tema.active}}>{subrogado.NOMBRE_COMPLETO}</Text>
                    </TouchableOpacity>
                })
            }
        </ScrollView>
        <View>
            <Text style={{color:tema.text}}>Monto subrogación</Text>
            <TextInput
                style={{...styles.input, textAlign:'right'}}
                onChangeText={onChangeText}
                value={state.poliza.valor_asegurado+""}
                placeholder='Monto subrogado'
                placeholderTextColor={tema.opaque}
                />
        </View>
    </View>
};

const styles = StyleSheet.create({
    card:{
        margin:10, 
        height:160, 
        width:160, 
        borderRadius:15, 
        padding:5, 
        backgroundColor:tema.background,
        borderWidth:1
    },
    observacion:{
        marginTop:25,  
        color:tema.opaque, 
        fontSize:11
    },
    subtitle:{
        color:tema.text, 
        textAlign:'center', 
        marginTop:10, 
        fontSize:15
    },
    input: {
        height: 30,
        borderWidth: 2,
        padding: 5,
        width:"60%",
        borderRadius:15,
        color:tema.background,
        borderColor:tema.opaque
      },
});

export default Subrogados;