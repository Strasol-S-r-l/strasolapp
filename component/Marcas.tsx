import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'


const Marcas = (props:any) => {
    const [state, setState] = React.useState(props);
    const [text, onChangeText] = React.useState('');
    
    const getMarcas = async () => {
        try {
            
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getMarcas', nit:props.state.poliza.NIT}),
            });
            const obj = await response.json();
            if(obj.estado === "error"){
                await setTimeout(() => {
                    getMarcas();
                }, 5000);
                return obj;
            }
            props.state["marcas"] = obj.data;
            setState({...props});
            } catch (error) {
            return {estado:"error", error};
        }
    }

    
    if(!props.state.marcas){
        getMarcas();
        return <View style={{marginTop:15}}>
            <Text style={{textAlign:'center', ...styles.observacion}}>Seleccione la marca de su vehículo.</Text>
            <Load />
        </View>
    } 

    
    return <View >
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder='Marca Vehiculo'
                    placeholderTextColor={tema.opaque}
                    />
            </View>
            <ScrollView  horizontal={true} style={{height:150}}>
            {
                Object.values(props.state.marcas).sort((a:any,b:any)=>{ return a.DESCRIPCION>b.DESCRIPCION?1:-1 }).filter((marca:any)=>{return marca.DESCRIPCION.toUpperCase().indexOf(text.toUpperCase())>-1}).map((marca:any, key)=>{
                    return <TouchableOpacity 
                        onPress={()=>{props.selectMarca(marca)}}
                        key={key}  
                        style={{
                            ...styles.card, 
                            borderColor:((marca.ID == props.state?.automotor?.marca?.ID)?tema.primary:tema.opaque)
                        }}
                        >

                        <View style={{alignItems:'center'}}>
                            <Image 
                            key={key}
                            style={{width:"90%", height:"80%", borderRadius:15, resizeMode:'stretch'}} 
                            source={{uri:api.url+'/getimagen/marcas/'+marca.ID+"?date="+new Date().getDay()}} />
                        </View>
                        <Text style={{textAlign:'center', color:tema.active}}>{marca.DESCRIPCION}</Text>
                    </TouchableOpacity>
                })
            }
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    card:{
        margin:10, 
        height:130, 
        width:130, 
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
        color:tema.active, 
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

export default Marcas;