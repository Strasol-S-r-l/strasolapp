import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image, TextInput, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Circle, Line, Svg, Text as SvgText, TSpan } from 'react-native-svg';
import Modelos from './Modelos';
import Marcas from './Marcas';
import PerilCliente from './PerilCliente';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import Automotor from './Automotor';
import Load from './Load';
import { Button } from 'react-native-share';
import { WebView } from 'react-native-webview';

var navigation_:any;
const Emision = ({navigation}:any) => {
    navigation_ = navigation;
    const [state, setState] = React.useState({porc_avance:0, vigencia_inicial:new Date().toLocaleDateString()});
    const [tipoInfo, setTipoInfo] = React.useState(1);
  

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
        
        
        const init = async ()=>{
            let poliza = await AsyncStorage.getItem("poliza");
            state["poliza"] = JSON.parse(poliza);
            let cliente = await AsyncStorage.getItem("cliente");
            state["cliente"] = JSON.parse(cliente);
            let automotor = await AsyncStorage.getItem("automotor");
            state["automotor"] = JSON.parse(automotor);
            state["automotor"]["vigencia_inicial"] = state.vigencia_inicial;
            state["usuario"] = await AsyncStorage.getItem("usuario");
            state["usuario"] = JSON.parse(state["usuario"])
            setState({...state});
        };
        init();

    }, []);

    const emitir=async()=>{

        
        fetch(api.url+'/app', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({
                key:api.key, 
                type:'emitir', 
                id_tomador:state.usuario.ID_CLIENTES,
                cliente:state.cliente,
                automotor:state.automotor,
                poliza:state.poliza
            }),
        }).then( async (response)=>{
            const obj = await response.json();
            console.log(obj)
            if(obj.estado === "error"){
                state["error"] = obj.error;
                return obj;
            }
            state["emitiendo"] = false;
            state["dataClient"] = obj.data;
            navigation_.replace("PerfilProducto", {ID:obj.data.ID});
            return;
        }).catch(e=>{
            state["error"] = e+"";
            state["emitiendo"] = false;
            setState({...state});
            return;
        });

        state["emitiendo"] = true;
        setState({...state});
    };
    const getEmitir=(porcentaje:any)=>{

        if(state.error){
            return <View style={{alignItems:"center"}}>
                <ScrollView style={{height:50}}>
                    <Text style={{color:tema.danger}}>{state.error}</Text>
                </ScrollView>
                <TouchableOpacity 
                    style={{
                        width:100,
                        backgroundColor:tema.danger,
                        borderRadius:5,
                        display:"flex",
                        marginTop:10
                    }}
                    onPress={()=>{
                        state["emitiendo"] = false;
                        delete state["error"];
                        setState({...state})
                    }}>
                    <Text style={{color:tema.active, textAlign:"center", padding:5}}>Salir</Text>
                </TouchableOpacity>
            </View>
        }

        if(state["emitiendo"]){
            return <View style={{width:"100%", height:200, display:"flex", position:"absolute", backgroundColor:"#00000000"}}>
                <WebView 
                    originWhitelist={['*']}
                    source={{uri:"https://ruddy.ibrokers.cloud/buster_drone/"}} 
                    style={{ 
                        flex: 1, 
                        backgroundColor:"#00000000" 
                    }}>
                    </WebView>
            </View>
        }

        if(porcentaje>=100){
            return (
                <View style={{display:"flex", alignItems:"center"}}>
                    <TouchableOpacity  style={styles.button3D} onPress={emitir}>
                        <Text style={styles.buttonText} >Emitir</Text>
                    </TouchableOpacity>
                    
                </View>
            )
        }   

        return <View>
            <Text>Pendiente...</Text>
        </View>
    }   

    const getSvg=()=>{

        

        let width = Dimensions.get('window').width;
        let ini = 15;
        let medium = width/2;
        let fin = width-15;
        let anchoBarraPorcentaje = (width-35) - (ini+30);
        
        let porcentaje = getPorcentajeAvance();
        let anchoBarrra = (ini+30)+(anchoBarraPorcentaje*porcentaje)/100;

        let porcCli = getPorcentajeAvanceCliente();
        let porcAuto = getPorcentajeAvanceAutomotor();
        let porcDoc = getPorcentajeDocumentosRespaldo();

        return <View style={{marginTop:15}}>
                <Svg width={width} height="100">
                <Line x1={ini} y1="15" x2={fin} y2="15" stroke={tema.opaque} />

                <Circle cx={medium-120} cy="15" r="11" fill={tema.active} id="svgCircle1" onPress={()=>{setTipoInfo(1)}}/>
                
                {porcCli<100?<Circle cx={medium-120} cy="15" r="10" fill={tema.primary} id="svgCircle1" onPress={()=>{setTipoInfo(1)}}/>:<View></View>}

                <SvgText fill={porcCli<100?tema.active:tema.primary} fontSize={12}><TSpan x={medium-120-3} y="19">1</TSpan></SvgText>
                <SvgText fill={tipoInfo==1?tema.active:tema.opaque} fontSize={12}><TSpan x={medium-120-30} y="35">Información</TSpan><TSpan x={medium-120-20} y="50">Personal</TSpan></SvgText>
                
                <Circle cx={medium} cy="15" r="11" fill={tema.active} id="svgCircle1" onPress={()=>{setTipoInfo(2)}}/>

                {porcAuto<100?<Circle cx={medium} cy="15" r="10" fill={tema.primary} onPress={()=>{setTipoInfo(2)}}/>:<View></View>}
                <SvgText fill={porcAuto<100?tema.active:tema.primary} fontSize={12}><TSpan x={medium-3} y="19">2</TSpan></SvgText>
                <SvgText fill={tipoInfo==2?tema.active:tema.opaque} fontSize={12}><TSpan x={medium-40} y="35">Información del</TSpan><TSpan x={medium-20} y="50">Vehículo</TSpan></SvgText>

                <Circle cx={medium+120} cy="15" r="11" fill={tema.active} onPress={()=>{setTipoInfo(3)}}/>
                {porcDoc<100?<Circle cx={medium+120} cy="15" r="10" fill={tema.primary} onPress={()=>{setTipoInfo(3)}}/>:<View></View>}
                <SvgText fill={porcDoc<100?tema.active:tema.primary} fontSize={12}><TSpan x={medium+120-3} y="19">3</TSpan></SvgText>
                <SvgText fill={tipoInfo==3?tema.active:tema.opaque} fontSize={12}><TSpan x={medium+120-35} y="35">Documentos</TSpan><TSpan x={medium+120-25} y="50">Respaldo</TSpan></SvgText>

                <Line x1={ini+20} y1="90" x2={width-35} y2="90" stroke={tema.primary+"55"} strokeWidth={6}/>
                <Line x1={ini+20} y1="90" x2={anchoBarrra} y2="90" stroke={tema.primary} strokeWidth={6}/>
                <SvgText fill={tema.active} fontSize={12}><TSpan x={width-60} y="80">{porcentaje.toFixed(0)} %</TSpan></SvgText>
                <SvgText fill={tema.opaque} fontSize={12}><TSpan x="45" y="80">Datos personales para el seguro</TSpan></SvgText>
                
            </Svg>
            {getEmitir(porcentaje)}
        </View>
    };

    const getPorcentajeAvanceCliente=()=>{
        let avance = 0;
        let total = 17;
        if(state?.cliente?.NIT_CI){
            avance++;
        }
        if(state?.cliente?.TIPO_DOCUMENTO){
            avance++;
        }
        if(state?.cliente?.LUGAR_EMISION_CI){
            avance++;
        }
        if(state?.cliente?.NOMBRE_COMPLETO){
            avance++;
        }
        if(state?.cliente?.PRIMER_APELLIDO){
            avance++;
        }
        if(state?.cliente?.SEGUNDO_APELLIDO){
            avance++;
        }
        if(state?.cliente?.CELULAR){
            avance++;
        }
        if(state?.cliente?.FECHA_NACIMIENTO){
            avance++;
        }
        if(state?.cliente?.SEXO){
            avance++;
        }
        if(state?.cliente?.ESTADO_CIVIL){
            avance++;
        }
        if(state?.cliente?.EMAIL){
            avance++;
        }
        if(state?.cliente?.PAIS_RESIDENCIA){
            avance++;
        }
        if(state?.cliente?.NACIONALIDAD){
            avance++;
        }
        if(state?.cliente?.CIUDAD){
            avance++;
        }
        if(state?.cliente?.DIRECCION){
            avance++;
        }
        if(state?.cliente?.PROFESION){
            avance++;
        }
        if(state?.cliente?.ACTIVIDAD_ECONOMICA){
            avance++;
        }
        return avance*100/total;
    }

    const getPorcentajeAvanceAutomotor=()=>{
        let avance = 0;
        let total = 11;
        if(state?.automotor?.marca?.ID){
            avance++;
        }
        if(state?.automotor?.modelo?.ID){
            avance++;
        }
        if(state?.automotor?.PLACA){
            avance++;
        }
        if(state?.automotor?.NUMERO_MOTOR){
            avance++;
        }
        if(state?.automotor?.CHASIS){
            avance++;
        }
        if(state?.automotor?.COLOR){
            avance++;
        }
        if(state?.automotor?.ANO){
            avance++;
        }
        if(state?.automotor?.TRACCION){
            avance++;
        }
        if(state?.automotor?.EXTRATERRITORIALIDAD){
            avance++;
        }
        if(state?.automotor?.ZONA_CIRCULACION){
            avance++;
        }
        if(state?.automotor?.ESTADO){
            avance++;
        }
        return avance*100/total;
    }

    const getPorcentajeDocumentosRespaldo=()=>{
        let avance = 1;
        let total = 1;
        
        return avance*100/total;
    }

    const getPorcentajeAvance=()=>{
        let avance = getPorcentajeAvanceCliente();
        avance+=getPorcentajeAvanceAutomotor();
        avance+=getPorcentajeDocumentosRespaldo();

        return avance/3;
    };

    const selectMarca=(marca:any)=>{
        delete state?.selectMarca;
        delete state?.modelos;
        delete state?.automotor?.modelo;
        state["automotor"] = {...state["automotor"], marca};
        setState({...state});
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
    };
    
    const selectModelo=(modelo:any)=>{
        delete state.selectModelo;
        state["automotor"] = {...state["automotor"], modelo};
        setState({...state});
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
    };

    const onChangeCliente= async(tipo:string,text:string)=>{
        if(!state.cliente){
            state["cliente"] = {};
        }
        state["cliente"][tipo] = text;
        await AsyncStorage.setItem("cliente",JSON.stringify(state["cliente"]));
        setState({...state});
    };

    const getInfoPersonal=()=>{
        if(state["emitiendo"]){
            return <View>
                <View>
                    <Text style={styles.subtitle}>Emitiendo</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center', ...styles.observacion}}>
                        Estamos emitiendo su solicitud en linea, espere mientras la compañía de seguros responde.
                    </Text>
                </View>
            </View>
            
        }
        return <View style={{marginTop:15}}>
            <View>
                <Text style={styles.subtitle}>Información Personal</Text>
            </View>
            <View style={{marginHorizontal:45}}>
                <Text style={{textAlign:'center', ...styles.observacion}}>Es necesario que llene toda la información solicitada de su clente, para emitir de manera correcta su seguro.</Text>
            </View>
            <PerilCliente navigation={navigation_} state={state} onChangeCliente={onChangeCliente}/>
        </View>
    }

    
    const selectAno=(data:any)=>{
        state["automotor"] = {...state["automotor"], ANO:data.value};
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
        setState({...state});
    };
    const selectTraccion=(data:any)=>{
        state["automotor"] = {...state["automotor"], TRACCION:data.value};
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
        setState({...state});
    };
    const selectExtraterritorialidad=(data:any)=>{
        state["automotor"] = {...state["automotor"], EXTRATERRITORIALIDAD:data.value};
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
        setState({...state});
    };
    const selectEstado=(data:any)=>{
        state["automotor"] = {...state["automotor"], ESTADO:data.value};
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
        setState({...state});
    };
    const changeAutomotor=(key:string,value:string)=>{
        state["automotor"][key] = value;
        AsyncStorage.setItem("automotor",JSON.stringify(state["automotor"]));
        setState({...state});
    };
    

    const getInfoVehiculo=()=>{
        if(state["emitiendo"]){
            return <View>
                <View>
                    <Text style={styles.subtitle}>Emitiendo</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center', ...styles.observacion}}>
                        Estamos emitiendo su solicitud en linea, espere mientras la compañía de seguros responde.
                    </Text>
                </View>
            </View>
            
        }

        return <View style={{marginTop:15}}>
            <View>
                <Text style={styles.subtitle}>Información del Vehículo</Text>
            </View>
            <Marcas state={state} selectMarca={selectMarca}/>
            <Modelos state={state}  selectModelo={selectModelo}/>

            
            <Text style={styles.subtitle1}>Marca</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={state?.automotor?.marca?.DESCRIPCION}
                        placeholder='Pendiente...'
                        editable={false}
                        />
                </View>
                <Text style={styles.subtitle1}>Modelo</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={state?.automotor?.modelo?.DESCRIPCION}
                        placeholder='Pendiente...'
                        editable={false}
                        />
                </View>
                <Text style={styles.subtitle1}>Tipo</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={"Auto"}
                        placeholder='Pendiente...'
                        editable={false}
                        />
                </View>
                <Text style={styles.subtitle1}>Motor cc.</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={((state?.automotor?.modelo?.MOTOR)?(state?.automotor?.modelo?.MOTOR+""):(""))}
                        placeholder='Pendiente...'
                        editable={false}
                        />
                </View>
                <Text style={styles.subtitle1}>PLazas</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={((state?.automotor?.modelo?.PLAZAS)?(state?.automotor?.modelo?.PLAZAS+""):(""))}
                        placeholder='Pendiente...'
                        editable={false}
                        />
                </View>
                <Text style={styles.subtitle1}>Placa</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        onChangeText={text=>{changeAutomotor("PLACA",text)}}
                        style={styles.input}
                        value={(state?.automotor?.PLACA)}
                        placeholder='Pendiente...'
                        />
                </View>
                <Text style={styles.subtitle1}>Motor Nro.</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        onChangeText={text=>{changeAutomotor("NUMERO_MOTOR",text)}}
                        style={styles.input}
                        value={(state?.automotor?.NUMERO_MOTOR)}
                        placeholder='Pendiente...'
                        />
                </View>
                <Text style={styles.subtitle1}>Chasis</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        onChangeText={text=>{changeAutomotor("CHASIS",text)}}
                        style={styles.input}
                        value={(state?.automotor?.CHASIS)}
                        placeholder='Pendiente...'
                        />
                </View>
                <Text style={styles.subtitle1}>Color</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        onChangeText={text=>{changeAutomotor("COLOR",text)}}
                        style={styles.input}
                        value={(state?.automotor?.COLOR)}
                        placeholder='Pendiente...'
                        />
                </View>
                <Text style={styles.subtitle1}>Año</Text>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={()=>{
                            let anos= [];
                            for(let i=2000; i<2030; i++){
                                let obj = {
                                    key:i+"",
                                    value:i+""
                                }
                                anos.push(obj);
                            }
                            navigation_.navigate("Select", {data:anos, func:selectAno});
                        }}
                        >
                        <Text style={{color:tema.active, fontSize:11}}>{(state?.automotor?.ANO)}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle1}>Traccion</Text>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={()=>{
                            let aux= [];
                            let obj = {key:"4x2",value:"4x2"}
                            aux.push(obj);
                            obj = {key:"4x4",value:"4x4"}
                            aux.push(obj);
                            navigation_.navigate("Select", {data:aux, func:selectTraccion});
                        }}
                        >
                        <Text style={{color:tema.active, fontSize:11}}>{(state?.automotor?.TRACCION)}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle1}>Extraterritorialidad</Text>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={()=>{
                            let aux= [];
                            let obj = {key:"Si",value:"Si"}
                            aux.push(obj);
                            obj = {key:"No",value:"No"}
                            aux.push(obj);
                            navigation_.navigate("Select", {data:aux, func:selectExtraterritorialidad});
                        }}
                        >
                        <Text style={{color:tema.active, fontSize:11}}>{(state?.automotor?.EXTRATERRITORIALIDAD)}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle1}>Zona de circulacion</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        onChangeText={text=>{changeAutomotor("ZONA_CIRCULACION",text)}}
                        style={styles.input}
                        value={(state?.automotor?.ZONA_CIRCULACION)}
                        placeholder='Pendiente...'
                        
                        />
                </View>
                <Text style={styles.subtitle1}>Estado</Text>
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={()=>{
                            let aux= [];
                            let obj = {key:"Nuevo",value:"Nuevo"}
                            aux.push(obj);
                            obj = {key:"Usado",value:"Usado"}
                            aux.push(obj);
                            navigation_.navigate("Select", {data:aux, func:selectEstado});
                        }}
                        >
                        <Text style={{color:tema.active, fontSize:11}}>{(state?.automotor?.ESTADO)}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitle1}>Vigencia inicial</Text>
                <View style={{alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={(state.vigencia_inicial)}
                        placeholder='Pendiente...'
                        editable={false}
                        />
                </View>
        </View>
    }
    const getInfoRespaldo=()=>{

        if(state["emitiendo"]){
            return <View>
                <View>
                    <Text style={styles.subtitle}>Emitiendo</Text>
                </View>
                <View>
                    <Text style={{textAlign:'center', ...styles.observacion}}>
                        Estamos emitiendo su solicitud en linea, espere mientras la compañía de seguros responde.
                    </Text>
                </View>
            </View>
        }
        
        return <View style={{marginTop:15}}>
            <View>
                <Text style={styles.subtitle}>Información de Respaldo</Text>
                <Text style={styles.subtitle} onPress={()=>{navigation_.navigate("Test")}}>Test</Text>
            </View>
        </View>
    }

    
    return (
        <View style={{position:'absolute', width:"100%",height:Dimensions.get('window').height}}>
            <SafeAreaView style={{height:"100%", backgroundColor:tema.background}}>
                <ScrollView>
                    <View style={{  alignItems:'center'}}>
                        <View style={{ height:130, marginTop:30, width:"90%", borderRadius:15}}>
                            <Text key={"0"} style={{fontSize:30, color:tema.primary, textAlign:'center', marginTop:10}} >Actualice los datos para realizar la emision de su seguro de Automotor</Text>           
                        </View>
                    </View>
                    <View style={{marginHorizontal:45}}>
                        <Text style={{textAlign:'center', ...styles.observacion}}>Actualice la informacion proporcionada y tome la covertura de seguros ahora.</Text>
                    </View>
                    {getSvg()}
                    {
                        tipoInfo==1?getInfoPersonal():(tipoInfo==2?getInfoVehiculo():getInfoRespaldo())
                    }
                    <View style={{marginTop:15}}>
                        <Text>{/*JSON.stringify(poliza)*/ }</Text>
                        <Image 
                            style={{width:"100%", height:300, resizeMode:'contain'}} 
                            source={require('../images/logo.png')} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
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
        textAlign:'center', 
        marginTop:10, 
        fontSize:15
    },
    subtitle1:{
        color:tema.primary, 
        marginTop:10, 
        fontSize:15,
        marginLeft:"5%"
    },
    input: {
        height: 30,
        borderWidth: 1,
        padding: 5,
        width:"90%",
        borderRadius:5,
        color:tema.active,
        borderColor: tema.primary+"55",
        fontSize:11
      },
      button3D: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: tema.primary, // Color de fondo del botón
        borderRadius: 5, // Bordes redondeados para un aspecto más suave
        margin: 10,
        // Sombra para iOS
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // Elevation para Android
        elevation: 8,
      },
      buttonText: {
        color: 'white', // Color del texto
        textAlign: 'center', // Alineación del texto
        fontWeight: 'bold', // Negrita para el texto
      },
});

export default Emision;