import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

var navigation_:any;
const PerilCliente = (props:any) => {
    navigation_ = props.navigation;
    const [state, setState] = React.useState(props.state);
    
    useEffect(() => { 
        getStateDataClient();
    }, []);

    const getStateDataClient = async () => {
        try {
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getDataClient'}),
            });
            const obj = await response.json();
            
            if(obj.estado === "error"){
                return obj;
            }
            state["dataClient"] = obj.data;
            
            setState({...state});
        } catch (error) {
            return {estado:"error", error};
        }
    }

    const getCliente = async (key:string, valor:string) => {
        try {
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getCliente', key_dato:key, valor}),
            });
            const obj = await response.json();
            if(obj.estado === "error"){
                await setTimeout(() => {
                    getCliente(key, valor);
                }, 5000);
                return obj;
            }
            obj.data[key] = valor;
            props.state["cliente"] = obj.data;
            
            setState({...props});
            
        } catch (error) {
            return {estado:"error", error};
        }
    }

    const selectTipoDoc=(data:any)=>{
        props.onChangeCliente("TIPO_DOCUMENTO", data.key)
        state["cliente"]["TIPO_DOCUMENTO"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectExtencion=(data:any)=>{
        props.onChangeCliente("LUGAR_EMISION_CI", data.key)
        state["cliente"]["LUGAR_EMISION_CI"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectGenero=(data:any)=>{
        props.onChangeCliente("SEXO", data.key)
        state["cliente"]["SEXO"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectECivil=(data:any)=>{
        props.onChangeCliente("ESTADO_CIVIL", data.key)
        state["cliente"]["ESTADO_CIVIL"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectNacionalidad=(data:any)=>{
        props.onChangeCliente("NACIONALIDAD", data.key)
        state["cliente"]["NACIONALIDAD"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectPaisResidencia=(data:any)=>{
        props.onChangeCliente("PAIS_RESIDENCIA", data.key)
        state["cliente"]["PAIS_RESIDENCIA"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };

    const selectCiudadResidencia=(data:any)=>{
        props.onChangeCliente("CIUDAD", data.key)
        state["cliente"]["CIUDAD"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectProfesion=(data:any)=>{
        props.onChangeCliente("PROFESION", data.key)
        state["cliente"]["PROFESION"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };
    const selectActividadEconomica=(data:any)=>{
        props.onChangeCliente("ACTIVIDAD_ECONOMICA", data.key)
        state["cliente"]["ACTIVIDAD_ECONOMICA"] = data.value;
        AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };

    if(!state.cliente) state["cliente"] = {};
    
    
    return <View>
            <Text style={styles.subtitle}>Tipo de documento</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            getStateDataClient()
                            return;
                        }
                        let tipoDocs:any= [];
                        Object.values(state["dataClient"]["TIPO_DOCUMENTO_CLIENTE"]).map((tipo_doc)=>{
                            let obj = {
                                key:tipo_doc.ID+"",
                                value:tipo_doc.DESCRIPCION+""
                            }
                            tipoDocs.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:tipoDocs, func:selectTipoDoc});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.TIPO_DOCUMENTO)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Nro. de documento</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("NIT_CI", text)}}
                    value={props?.state?.cliente?.NIT_CI}
                    placeholder='Pendiente...'
                    blurOnSubmit={true}
                    onBlur={refs=>{getCliente("NIT_CI",refs._dispatchInstances.memoizedProps.value)}}
                    />
            </View>
            <Text style={styles.subtitle}>Extension</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["REGIONALES"]).map((tipo_doc)=>{
                            let obj = {
                                key:tipo_doc.ACRONIMO+"",
                                value:tipo_doc.ACRONIMO+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectExtencion});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.LUGAR_EMISION_CI)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Nombres</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("NOMBRE_COMPLETO", text)}}
                    value={props?.state?.cliente?.NOMBRE_COMPLETO}
                    placeholder='Pendiente...'
                    />
            </View>
            <Text style={styles.subtitle}>Apellido paterno</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("PRIMER_APELLIDO", text)}}
                    value={props?.state?.cliente?.PRIMER_APELLIDO}
                    placeholder='Pendiente...'
                    />
            </View>
            <Text style={styles.subtitle}>Apellido materno</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("SEGUNDO_APELLIDO", text)}}
                    value={props?.state?.cliente?.SEGUNDO_APELLIDO}
                    placeholder='Pendiente...'
                    />
            </View>

            <Text style={styles.subtitle}>Número de celular</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("CELULAR", text)}}
                    value={props?.state?.cliente?.CELULAR}
                    placeholder='Pendiente...'
                    />
            </View>
            <Text style={styles.subtitle}>Fecha de nacimiento</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("FECHA_NACIMIENTO", text)}}
                    value={props?.state?.cliente?.FECHA_NACIMIENTO}
                    placeholder='Pendiente...'
                    />
            </View>
            <Text style={styles.subtitle}>Género</Text>

            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        
                        arr.push({key:"1", value:"MASCULINO"});
                        arr.push({key:"2", value:"FEMENINO"});
                        
                        
                        navigation_.navigate("Select", {data:arr, func:selectGenero});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{state?.cliente?.SEXO}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Estado civil</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["ESTADO_CIVIL"]).map((oob)=>{
                            let obj = {
                                key:oob.DESCRIPCION+"",
                                value:oob.DESCRIPCION+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectECivil});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.ESTADO_CIVIL)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Correo electrónico</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("EMAIL", text)}}
                    value={props?.state?.cliente?.EMAIL}
                    placeholder='Pendiente...'
                    />
            </View>
            <Text style={styles.subtitle}>Nacionalidad</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["NACIONALIDADES"]).map((oob)=>{
                            let obj = {
                                key:oob.NACION+"",
                                value:oob.NACION+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectNacionalidad});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.NACIONALIDAD)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Pais de residencia</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["NACIONALIDADES"]).map((oob)=>{
                            let obj = {
                                key:oob.NOMBRE+"",
                                value:oob.NOMBRE+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectPaisResidencia});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.PAIS_RESIDENCIA)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Ciudad de residencia</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["CIUDADES"]).map((oob)=>{
                            let obj = {
                                key:oob.DESCRIPCION+"",
                                value:oob.DESCRIPCION+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectCiudadResidencia});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.CIUDAD)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Dirección</Text>
            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{props.onChangeCliente("DIRECCION", text)}}
                    value={props?.state?.cliente?.DIRECCION}
                    placeholder='Pendiente...'
                    />
            </View>
            <Text style={styles.subtitle}>Profesion</Text>
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["PROFESIONES"]).map((oob)=>{
                            let obj = {
                                key:oob.DESCRIPCION+"",
                                value:oob.DESCRIPCION+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectProfesion});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.PROFESION)}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Actividad económica</Text>
            <View style={{alignItems:'center'}}>
            <TouchableOpacity
                    style={styles.input}
                    onPress={()=>{
                        if(!state["dataClient"]){
                            return;
                        }
                        let arr:any= [];
                        Object.values(state["dataClient"]["ACTIVIDADES"]).map((oob)=>{
                            let obj = {
                                key:oob.DESCRIPCION+"",
                                value:oob.DESCRIPCION+""
                            }
                            arr.push(obj);
                        });
                        
                        navigation_.navigate("Select", {data:arr, func:selectActividadEconomica});
                    }}
                    >
                    <Text  style={{color:tema.active, fontSize:11}}>{(state?.cliente?.ACTIVIDAD_ECONOMICA)}</Text>
                </TouchableOpacity>
            </View>
            
    </View>
};

const styles = StyleSheet.create({
    card:{
        margin:10, 
        height:150, 
        width:150, 
        borderRadius:15, 
        padding:5, 
        borderWidth:1
    },
    observacion:{
        marginTop:25,  
        color:tema.opaque, 
        fontSize:11
    },
    subtitle:{
        color:tema.primary, 
        marginTop:14, 
        fontSize:11,
        marginLeft:"5%"
    },
    input: {
        height: 30,
        borderWidth: 1,
        padding: 5,
        width:"90%",
        borderRadius:5,
        color:tema.active,
        borderColor:tema.primary,
        fontSize:11
        
      },
});

export default PerilCliente;