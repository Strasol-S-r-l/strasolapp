import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground } from 'react-native';
import Load from './Load';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
import AMCharts from 'react-native-amcharts';


const Logs = (props:any) => {

    const config = {
        "type": "XYChart",
        "data": [
        ],
        "xAxes": [
          {
            "type": "DateAxis",
            "baseInterval": {
              "timeUnit": "day",
              "count": 1
            }
          }
        ],
        "yAxes": [
          {
            "type": "ValueAxis"
          }
        ],
        "series": [
          {
            "type": "LineSeries",
            "dataFields": {
              "dateX": "fecha",
              "valueY": "monto"
            },
            "tooltipText": "Monto: {valueY}"
          }
        ],
        "cursor": {
          "type": "XYCursor",
          "behavior": "panX"
        },
        "scrollbarX": {
          "type": "Scrollbar"
        }
      }
      
    
    const [state, setState] = React.useState({config});

    const INGRESO_AL_SISTEMA = 0;
    const INGRESO_FALLIDO_AL_SISTEMA = 1;
    const ERROR_DE_COMUNICACION_CON_EL_FTP = 2;
    const PLANILLAS_SALARIO = 3;
    const DISPARO_CONTABLE_WEB_SERVICE = 6;    
    const SUBIR_LIQUIDACIONES_BANCA = 7;
    const CIERRE_CONCILIACION = 8;
    const SUBIR_EXCEL_PASO_2_CONCILIACION = 9;
    const SUBIR_EXCEL_POR_COMPANIA_CONCILIACION = 10;
    const ELIMINAR_CERTIFICADO = 11;
    const HISTORICO = 12;
    const ELIMINAR_COMPROBANTE = 13;
    const ELIMINAR_FACTURA_COMPRA_DETALLE = 14;
    const ELIMINAR_CHEQUE = 15;
    const ELIMINAR_FACTURA_COMPRA_CABECERA = 16;
    const COMPROBANTE_RECURRENTE_DEPRECIACION = 17;
    const ASISTENCIA_REGISTRO_HUELLA = 18;
    const ASISTENCIA_INTENTO_MARCADO = 19;
    const CIERRE_CONTABLE = 20;
    const REAPERTURA_CONTABLE = 21;
    const APERTURA_SINIESTRO = 22;
    const CIERRE_SINIESTRO = 23;
    const CONSULTA = 24;
    const CIERRE_PLANILLA_PRIMA = 25;
    const ASIGNACION_CANDIDATO = 26;
    const CAMBIO_EJECUTIVO_ATIENDE_POLIZA = 27;
    const CAMBIO_EJECUTIVO_ATIENDE_CERTIFICADO = 28;
    const EMISION_DE_CERTIFICADO_AUTOMATICO = 29;
    const APP_WEB_SERVICE = 30;
    
    

    const getLogs = async () => {
        try {

          
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getLogs'}),
            });
            const obj = await response.json();
            
            if(obj.estado === "error"){
                return obj;
            }

          
            let emisiones = [];
          //obj.data.map((obj)=>{

            emisiones.push({monto:10, fecha:'2023-10-01'});
            emisiones.push({monto:15, fecha:'2023-10-02'});
            emisiones.push({monto:20, fecha:'2023-10-03'});
            emisiones.push({monto:30, fecha:'2023-10-04'});
            emisiones.push({monto:30, fecha:'2023-10-05'});
            emisiones.push({monto:40, fecha:'2023-10-06'});
            emisiones.push({monto:40, fecha:'2023-10-07'});
            emisiones.push({monto:45, fecha:'2023-10-08'});
            emisiones.push({monto:50, fecha:'2023-10-09'});
            emisiones.push({monto:55, fecha:'2023-10-10'});
            
          //});
          
            state.config["data"] = emisiones;
          
          
          setState({...state, logs:obj.data});
        } catch (error) {
          return {estado:"error", error};
        } 
    }
    
    const getTipoEvento=(tipo_evento:number)=>{
        switch(tipo_evento){
            case INGRESO_AL_SISTEMA : return "Ingreso al sistema";
            case INGRESO_FALLIDO_AL_SISTEMA : return "Ingreso fallido al sistema";
            case ERROR_DE_COMUNICACION_CON_EL_FTP : return "Error de comunicacion con el Ftp.";
            case PLANILLAS_SALARIO : return "Planilla de salarios";
            case DISPARO_CONTABLE_WEB_SERVICE : return "Disparo contable Web Service";
            case SUBIR_LIQUIDACIONES_BANCA : return "Subir liquidacion Banca";
            case CIERRE_CONCILIACION : return "Cierre de conciliacion";
            case SUBIR_EXCEL_PASO_2_CONCILIACION : return "Subir excel conciliacion paso 2";
            case SUBIR_EXCEL_POR_COMPANIA_CONCILIACION : return "Subir excel por compañía conciliacion";
            case ELIMINAR_CERTIFICADO : return "Eliminar certificado";
            case HISTORICO : return "Historico";
            case ELIMINAR_COMPROBANTE : return "Eliminar comprobante";
            case ELIMINAR_FACTURA_COMPRA_DETALLE : return "Eliminar factura comprobante detalle";
            case ELIMINAR_CHEQUE : return "Eliminar cheque";
            case ELIMINAR_FACTURA_COMPRA_CABECERA : return "Eliminar Factura compra";
            case COMPROBANTE_RECURRENTE_DEPRECIACION : return "Comprobante recurrente de depreciacion";
            case ASISTENCIA_REGISTRO_HUELLA : return "Asistencia registro huella";
            case ASISTENCIA_INTENTO_MARCADO : return "Asistencia intento marcado";
            case CIERRE_CONTABLE : return "Cierre contable";
            case REAPERTURA_CONTABLE : return "Reapertura contable";
            case APERTURA_SINIESTRO : return "Apertura siniestro";
            case CIERRE_SINIESTRO : return "Cierre siniestro";
            case CONSULTA : return "Ejecutó una consulta";
            case CIERRE_PLANILLA_PRIMA : return "Cerró la planilla de prima";
            case ASIGNACION_CANDIDATO : return "Asignación de candidato";
            case CAMBIO_EJECUTIVO_ATIENDE_POLIZA : return "Cambio ejecutivo que atiende poliza";
            case CAMBIO_EJECUTIVO_ATIENDE_CERTIFICADO : return "Cambio ejecutivo que atiende certificado";
            case EMISION_DE_CERTIFICADO_AUTOMATICO : return "Emision de certificado automático";
            case APP_WEB_SERVICE : return "Ingresó a la aplicacion";
            default : return "Sin tipo de evento favor colocar";
        }
    };
    
    const pintarLogs=()=>{

        if(!state.logs){
            getLogs();
            return <Load />
        }
        


        return <View>
            <View>
                <Text style={{color:tema.primary}}>{state?.logs.length+" logs el dia de hoy."}</Text>
            </View>
            <View>
                <TouchableOpacity 
                onPress={()=>{
                    props.navigation.replace("Animation");
                }}>
                    <Text style={{color:tema.primary}}>Gltf</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{marginLeft:5}}>
                <AMCharts
                    type="XYChart"
                    config={state.config}
                    style={{height: 400, width:Dimensions.get('window').width-10}}
                />
            </ScrollView>
            {
                state?.logs.map((log:any, key:string)=>{
                    return <View key={key} style={{
                        borderWidth:1, 
                        borderColor:tema.primary,
                        margin:10,
                        padding:10,
                        borderRadius:10,
                        backgroundColor:'#ffffffdd'
                        }}>
                        <Text style={{color:tema.active}}>{log.USUARIO}</Text>
                        <Text style={{color:tema.active}}>{getTipoEvento(log.TIPO_EVENTO)}</Text>
                        <Text style={{color:tema.active}}>{log.DESCRIPCION}</Text>
                        <Text style={{color:tema.active}}>{log.JSON}</Text>
                        <Text style={{color:tema.active, textAlign:"right"}}>{log.FECHA}</Text>
                    </View>
                })
            }
            
        </View>
        
    };


    return (
        <View style={{height:Dimensions.get('screen').height}}>
             <ImageBackground 
                source={require('../images/fondo_main.png')}
                style={{height:'110%', width:'100%'}}>
                <ScrollView>
                    {pintarLogs()}
                </ScrollView>
            </ImageBackground>
            
        </View>
    )
};


export default Logs;