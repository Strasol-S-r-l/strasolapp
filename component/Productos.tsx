import React, { useEffect } from 'react';
import { View, Dimensions, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Load from './Load';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Line } from 'react-native-svg';

var navigation_:any;
const Cotizacion = ({navigation}:any) => {
    navigation_ = navigation;
    const [state, setState] = React.useState({tipoPago:1});
    const [buscador, setBuscador] = React.useState("");
    

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
        
        const init = async () => {
            try {
                const suser:any = await AsyncStorage.getItem("usuario");
                if(!suser || suser==null){
                    navigation_.replace("Login");
                    return;
                }
                let user = JSON.parse(suser);
                
                const response = await fetch(api.url+'/app', 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json',},
                    body: JSON.stringify({key:api.key, type:'getProductosVendidos', id_cliente:user.ID_CLIENTES}),
                });
                const obj = await response.json();
                
                if(obj.estado === "error"){
                    state["productos"] = obj;
                    setState({...obj});
                    return;
                }
                
                state["productos"] = obj.data;
                
                setState({...state});
            } catch (error) {
                state["productos"] = {estado:"error", error};
                return {estado:"error", error};
            }
        }
        
        init();
    }, []);

    const paintProductos=()=>{
        if(!state.productos) return <Load />
        if(state.productos.estado == "error") return <View><Text style={{color:tema.danger}}>{state.productos.error}</Text></View>
        
        return <FlatList
            data={Object.values(state.productos)}
            renderItem={({ item }) => pintar(item)}
            keyExtractor={item => item.ID}
        />
    }

    const pintar=(item:any)=>{

        let vigenciaTotal = new Date(item.VIGENCIA_FINAL)-new Date(item.VIGENCIA_INICIAL);
        let auxFin = new Date(item.VIGENCIA_FINAL)<new Date()?new Date(item.VIGENCIA_FINAL):new Date();
        let vigenciaActual = auxFin-new Date(item.VIGENCIA_INICIAL);
        let porcConsumido = (vigenciaActual*100)/vigenciaTotal;
        let ancho = Dimensions.get('window').width-20;
        let lineDos = (porcConsumido*ancho)/100;

        if(buscador.length>0){
            if(JSON.stringify(item).indexOf(buscador)<0){
                return;
            }
        }
        


        return <View style={{padding:5, borderColor:tema.primary, borderBottomWidth:1, borderRadius:10}}>
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', marginBottom:15}}>
                <Image
                    style={{ width: 50, height: 50, borderRadius: 15 }}
                    source={{ uri: api.url + "/imagesAdmin/" + item.NIT_CI}}
                />
                <Text style={{color:tema.active, marginLeft:10, marginRight:10}}>{item.NIT_CI}</Text>
                <Text style={{color:tema.active, marginRight:10}}>{item.NOMBRE_COMPLETO}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Marca</Text>
                <Text style={{color:tema.active, marginRight:10}}>{(item?.AUTOMOTOR?.MARCA || '').trim()}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Modelo</Text>
                <Text style={{color:tema.active, marginRight:10}}>{(item?.AUTOMOTOR?.MODELO || '').trim()}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Placa</Text>
                <Text style={{color:tema.active, marginRight:10}}>{item.DATO_ADICIONAL}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Poliza</Text>
                <Text style={{color:tema.active, marginRight:10}}>{item.NUMERO_POLIZA}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Certificado</Text>
                <TouchableOpacity onPress={(ele)=>{
                    navigation_.navigate("PerfilProducto", {ID:item.ID});
                }}>
                    <Text style={{color:tema.primary, marginRight:10, textDecorationLine:'underline'}}>{item.NUMERO_CERTIFICADO}</Text>
                </TouchableOpacity>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Prima</Text>
                <Text style={{color:tema.active, marginRight:10}}>$us {(item.PRIMA||0).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{color:tema.active, fontWeight:'bold', marginLeft:10}}>Comisión</Text>
                <Text style={{color:tema.active, marginRight:10}}>$us {(item.COMISION||0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</Text>
            </View>
            {/*<View style={{display:'flex', flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
                <Text style={{color:tema.active, marginLeft:10}}>{new Date(item.VIGENCIA_INICIAL).toLocaleDateString()}</Text>
                <Text style={{color:tema.active, marginRight:10}}>{new Date(item.VIGENCIA_FINAL).toLocaleDateString()}</Text>
            </View>
            <View>
            <Svg width="100%" height="50">
                <Line x1={10} y1="15" x2={Dimensions.get('window').width-20} y2="15" stroke={tema.opaque} strokeWidth={20}  />
                <Line x1={10} y1="15" x2={10+parseInt(lineDos)} y2="15" stroke={tema.primary} strokeWidth={20}  />
            </Svg>
            </View>*/}
            <Text style={{color:tema.opaque, textAlign:'right', marginTop:10}}>{new Date(item.FECHA_REGISTRO_CERTIFICADO).toLocaleString()}</Text>
        </View>
    }

    return (
        <View style={{position:'absolute', width:"100%",height:Dimensions.get('window').height}}>
            <SafeAreaView style={{height:"100%", backgroundColor:tema.background}}>
                <View style={{  alignItems:'center'}}>
                    <View style={{ height:50, marginTop:5, width:"90%", borderRadius:15}}>
                        <Text key={"0"} style={{fontSize:30, color:tema.primary, textAlign:'center', marginTop:10}} >Productos</Text>           
                    </View>
                </View>
                <View style={{  alignItems:'center'}}>
                    <Text style={{color:tema.opaque, fontSize:11}}>Listado mensual de todas sus emisiones</Text>
                </View>
                <View style={{  alignItems:'center'}}>
                    <TextInput
                        onChangeText={text=>{setBuscador(text)}}
                        style={{width:"80%", height:40, color:tema.active,  borderColor:tema.active, borderWidth:1, borderRadius:10}}
                        value={buscador}
                        placeholder='Pendiente...'
                        editable={true}
                        />
                    
                </View>
                {paintProductos()}    
            </SafeAreaView>
        </View>
    )
};


export default Cotizacion;