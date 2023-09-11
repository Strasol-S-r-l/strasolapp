import React, { useEffect, useState } from 'react';
import { ScrollView,TouchableOpacity, Text, View, StyleSheet, Image, Alert, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import IconComponent from './assets/icons/IconComponent';

var navigation_:any;
const PerfilProducto = ({route, navigation}:any) => {
    navigation_ = navigation;
    
    const [data, setData] = useState(null);

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
         
        const fetchData = async () => {
          try {
            const suser:any = await AsyncStorage.getItem("usuario");
            if(!suser || suser==null){
                navigation_.replace("Login");
                return;
            } 

            const usuario = JSON.parse(suser);

            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getProducto', tipo:route.params.tipo, ID:route.params.ID}),                                       
            });
            const data = await response.json();
            setData(data.data);
          } catch (error) {
            return {estado:"error", error};
          }
        }
        fetchData();
    }, []);

    const pintarDatos=()=>{
        return  <View style={{...styles.card,marginBottom:20}}>
        <Text style={{textAlign:'center', fontWeight:'bold', color:'#fff', marginTop:20}}>DATOS DEL PRODUCTO</Text>
        <Text style={{...styles.texto, marginTop:20, textAlign:'center', textTransform:'capitalize'}}>{route.params.RIESGO}</Text>
        <View style={styles.dato}>
            <Text style={{...styles.texto,width:'48%'}}>Poliza.</Text>
            <Text style={styles.texto}>:</Text>
            <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{route.params.NUMERO_POLIZA}</Text>
        </View>
        {
            route.params.tipo=='Certificado'?
            <View style={styles.dato}>
                <Text style={{...styles.texto,width:'48%'}}>Certificado.</Text>
                <Text style={styles.texto}>:</Text>
                <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{route.params.NUMERO_CERTIFICADO}</Text>
            </View>
            :<></>
        }
        {
            route.params.tipo=='Aplicacion'?
            <View style={styles.dato}>
                <Text style={{...styles.texto,width:'48%'}}>Aplicacion.</Text>
                <Text style={styles.texto}>:</Text>
                <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{route.params.NUMERO_APLICACION}</Text>
            </View>
            :<></>
        }
        <View style={styles.dato}>
            <Text style={{...styles.texto,width:'48%'}}>Valor asegurado.</Text>   
            <Text style={styles.texto}>:</Text>         
            <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{data.MONEDA.ACRONIMO} {data.VALOR_ASEGURADO.toLocaleString()}</Text>            
        </View>
        <View style={styles.dato}>
            <Text style={{...styles.texto,width:'48%'}}>Prima.</Text> 
            <Text style={styles.texto}>:</Text>       
            <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{data.MONEDA.ACRONIMO} {data.PRIMA.toLocaleString()}</Text>        
        </View>
        <View style={styles.dato}>
            <Text style={{...styles.texto,width:'48%'}}>Moneda.</Text> 
            <Text style={styles.texto}>:</Text>
            <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{data.MONEDA.DESCRIPCION}</Text> 
        </View>
        <View style={styles.dato}>
            <Text style={{...styles.texto,width:'48%'}}>Registro.</Text>
            <Text style={styles.texto}>:</Text>
            <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{getFechaLiteral(data.FECHA_REGISTRO)}</Text>
        </View>
        <View style={styles.dato}>
            <Text style={{...styles.texto,width:'48%'}}>Tipo pago.</Text>
            <Text style={styles.texto}>:</Text>
            <Text style={{...styles.texto,width:'48%',textAlign:'right'}}>{data.TIPO_PAGO}</Text>
        </View>
        <View style={{marginTop:10}}>
            <Text style={{...styles.texto,textAlign:'center'}}>Vigencia</Text> 
            <Text style={{...styles.texto, textAlign:'center', marginTop:5}}>{getFechaLiteral(route.params.VIGENCIA_INICIAL)} - {getFechaLiteral(route.params.VIGENCIA_FINAL)}</Text>        
        </View>
    </View>
    };

    const pintarEjecutivoAtiende=()=>{
        return <View style={styles.card}>
            <Text style={{textAlign:'center', fontWeight:'bold', color:'#fff', marginTop:20}}>EJECUTIVO QUE ATIENDE</Text>
            <View style={{display:"flex", justifyContent:'center', alignItems:'center', marginTop:15}}>
                <Image 
                    style={{width:50, height:50, borderRadius:10}}
                    source={{uri: api.url+"/imagesAdmin/"+data.EJECUTIVO_ATIENDE?.CI}}
                />
                <Text style={{color:'#fff'}}>{data.EJECUTIVO_ATIENDE?.PRIMER_APELLIDO} {data.EJECUTIVO_ATIENDE?.SEGUNDO_APELLIDO} {data.EJECUTIVO_ATIENDE?.PRIMER_NOMBRE} {data.EJECUTIVO_ATIENDE?.SEGUNDO_NOMBRE}</Text>
                <Text style={{color:'#fff'}}>Telf. {data.EJECUTIVO_ATIENDE?.TELEFONO}</Text>
                <Text style={{color:'#fff', marginBottom:20}}>{data.EJECUTIVO_ATIENDE?.EMAIL}</Text>
            </View>
        </View>
    };

    const toBack=()=>{
        navigation_.goBack();
    }
    const pintarPlanPagos=()=>{
        return <View style={styles.card}>
            <TouchableOpacity onPress={() =>toBack()}>
                <IconComponent nameIcon="iconLeftCircle" alto="38px" ancho="38px" colors={{color_1:""}}></IconComponent>
            </TouchableOpacity>
            <Text style={{fontWeight:'bold', textAlign:'center', marginTop:20, marginBottom:20, ...styles.texto}}>PLAN DE PAGOS</Text>
            {
                data.PLAN_PAGOS?
                data.PLAN_PAGOS.map((plan_pago:any, i:any)=>{
                    return <View key={i} style={styles.plan_pago}>
                        {compararFecha(plan_pago.FECHA_PAGO,data?.FECHA_ACTUAL,plan_pago.ESTADO_PAGO,(i+1))}
                        <Text style={{...styles.texto,width:'35%',textAlign:'right'}}>{data.MONEDA.ACRONIMO} {plan_pago.PRIMA.toLocaleString()}</Text>
                        <Text style={{color:'white'}}>  {verificarEstadoPago(plan_pago.ESTADO_PAGO)}</Text>
                    </View>
                }):<View key={0} style={styles.plan_pago}>
                        <Text style={styles.texto}>{0+")"}</Text>
                        <Text style={styles.texto}>Sin plan de pagos</Text>
                    </View>
            }
        </View>
    };

    const pintar=()=>{
        return<View style={{flex:1}}> 
            <View style={{position:'absolute',top:0,bottom:0,left:0,right:0}}> 
                    <IconComponent nameIcon='fondo' alto='20px' ancho ='20px' colors={{color_1:"#BBEEAA",color_2:"#334477"}}></IconComponent>
                </View>
            <ScrollView style={{marginLeft:10,marginRight:10}}>
                {pintarPlanPagos()}
                {pintarEjecutivoAtiende()}
                {pintarDatos()}
            </ScrollView>
        </View>
    };


    return (
        <View style={{flex:1}}>
            <View style={{position:'absolute',top:-1}}>
                    <IconComponent nameIcon="fondo" alto="20px" ancho="20px" colors={{color_1:"#BBEEAA",color_2:"#334477"}}/>             
            </View>
            {
                <>
                <View style={{height:70}}>
                    <Image 
                        style={{width:'100%',height:'100%'}}
                        resizeMode='stretch'
                        source={{uri: api.url+"/perfilCia/"+route.params.NIT_COMPANIA+'_bar'}}
                    />
                </View>
                {data?pintar():<View style={{flex:1, justifyContent:'center', alignItems:'center' ,backgroundColor:'rgba(0,0,0,0.7)'}}><ActivityIndicator size={'large'} color={'white'}/></View>}
                </>
           }
        </View>
    )
};
const getFechaLiteral =(fecha:any) =>{
    if(!fecha || fecha == ''){
        return '-*-'
    }
    var array = fecha.split('/');
    switch(array[1]){
        case '01':
            array[1] = 'Enero';
            break;
        case '02':
            array[1] = 'Febrero';
            break;
        case '03':
            array[1] = 'Marzo';
            break;
        case '04':
            array[1] = 'Abril';
            break;
        case '05':
            array[1] = 'Mayo';
            break;
        case '06':
            array[1] = 'Junio';
            break;
        case '07':
            array[1] = 'Julio';
            break;
        case '08':
            array[1] = 'Agosto';
            break;
        case '09':
            array[1] = 'Septiembre';
            break;
        case '10':
            array[1] = 'Octubre';
            break;
        case '11':
            array[1] = 'Noviembre';
            break;
        case '12':
            array[1] = 'Diciembre';
        break;
    }
    return array[0] + ' de ' + array[1] + ' ' + array[2]
}
const verificarEstadoPago =(estado:Int32)=>{
    if(estado == 1){
        return <View style={{width:15}}>
                <IconComponent nameIcon="iconCheckFalse" alto="25px" ancho="25px" colors={{color_1:"white"}}></IconComponent>
            </View>
    }else{
        return <View style={{width:15}}>
                <IconComponent nameIcon="iconCheckTrue" alto="25px" ancho="25px" colors={{color_1:"white"}}></IconComponent>
            </View>
    }
}
const compararFecha =(fechaProx:any,fechaActual:any,estado:any,pos:any)=>{
    if(!fechaProx || fechaProx == ''){
        return ''
    }
    if(!fechaActual || fechaActual == ''){
        return ''
    }
    var aux_fechaProx = fechaProx.split('/');
    var aux_fechaActual = fechaActual.split('/');
    
    var date_prox = new Date(fechaProx);
    var date_actual = new Date(fechaActual);

    date_prox = new Date(aux_fechaProx[2], aux_fechaProx[1],aux_fechaProx[0])
    date_actual = new Date(aux_fechaActual[2], aux_fechaActual[1],aux_fechaActual[0]) 
    if(estado === 0){
        return <Text style={{color:'green',width:'55%'}}>{pos+')  '+ getFechaLiteral(fechaProx)}</Text>
    }else{
        if(date_prox > date_actual && estado > 0){
            return <Text style={{color:'white',width:'55%'}}>{pos +')  '+ getFechaLiteral(fechaProx)}</Text>
        }else{
            return <Text style={{color:'red',width:'55%'}}>{pos+')  '+ getFechaLiteral(fechaProx)}</Text>
        }
    }    
}
const styles = StyleSheet.create({
    titulo:{
        textAlign:'center',
        marginTop:10,
        fontSize:14,
        fontWeight:'bold'
    },
    texto:{
        color:"#fff"
    },
    dato:{
        display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:15
    },
    plan_pago:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between',
        margin:5,
        padding:5,
        borderColor:'#fff',
        borderBottomWidth:1
    },
    card:{
        marginTop:5, 
        borderRadius:10,
        backgroundColor:'#000000aa', 
        padding:10,  
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.7,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 4,              
    }
});
export default PerfilProducto;