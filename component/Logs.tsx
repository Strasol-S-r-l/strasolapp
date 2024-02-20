import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground, TextInput, PermissionsAndroid } from 'react-native';
import Load from './Load';
import Share from 'react-native-share';
import api from '../enviroments/api.json'
import tema from '../enviroments/tema.json'
var RNFS = require('react-native-fs');
import XLSX from 'xlsx'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import ModalComponent from './ModalComponent';
import GraficoRadar from './GraficoRadar';
import IconComponent from './assets/icons/IconComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Logs = (props: any) => {
  const [getMeses, setMeses] = useState([
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]);
  const [getMonto, setMonto] = useState([0]);
  const [getTitulo, setTitulo] = useState("");
  const [getAno, setAno] = useState(0);
  const [getMes, setMes] = useState(0);
  const [getDias, setDias] = useState([]);
  const [getDatosMes, setDatosMes] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [getVisible, setVisible] = useState(1);
  const [buscador, setBuscador] = useState("");
  const [buscar, setBuscar] = useState("");

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const data = {
    //labels: ["January", "February", "March", "April", "May", "June"],
    labels: getDias,
    datasets: [
      {
        data: getMonto,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: [getTitulo] // optional
  };

  useEffect(() => {
    const init = async () => {
      if (getAno == 0) {
        let fecha = new Date();
        await getLogsAnual(fecha.getFullYear());
      } else {
        await getLogsAnual(getAno);
      }

    };
    init();
  }, []);

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
          "dateX": "FECHA_REGISTRO_CERTIFICADO",
          "valueY": "COMISION_ACUMULADA"
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


  const [state, setState] = React.useState({ config });

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



  const getLogs = async (mes: Int32, ano: Int32) => {
    try {
      let mes_aux = mes + 1 + "";
      if ((mes + 1) < 9) {
        mes_aux = "0" + mes_aux;
      }

      let usuario = await AsyncStorage.getItem("usuario");
      usuario = JSON.parse(usuario);
      let id_cliente = usuario.ID_CLIENTES;

      const response = await fetch(api.url + '/app',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ key: api.key, type: 'getLogs', gestion: (mes_aux) + "/" + ano, id_cliente }),
        });
      const obj = await response.json();
      if (obj.estado === "error") {
        return obj;
      }
      let monto = 0;

      if (obj.data) {
        obj.data.sort((a: any, b: any) => { return a.FECHA_REGISTRO_CERTIFICADO > b.FECHA_REGISTRO_CERTIFICADO ? 1 : -1 }).map(cert => {
          monto += cert.COMISION;
          cert["COMISION_ACUMULADA"] = monto;
        })

        state.config["data"] = obj.data;
        setState({ ...state, logs: obj.data });
        setConfig(mes, ano);
        setAno(ano);
        setMes(mes);
      } else {
        state.config["data"] = [];
        await setState({ ...state, logs: [] });
        setConfig(mes, ano);
        setAno(ano);
        setMes(mes);
      }

    } catch (error) {
      return { estado: "error", error };
    }
  }

  const getLogsAnual = async (ano: Int32) => {
    try {
      console.log("getLogsAnual");
      let usuario = await AsyncStorage.getItem("usuario");

      usuario = JSON.parse(usuario);
      let id_cliente = usuario.ID_CLIENTES;
      const response = await fetch(api.url + '/app',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ key: api.key, type: 'getLogsAnual', gestion: ano, id_cliente }),
        });
      const obj = await response.json();
      if (obj.estado === "error") {
        return obj;
      }
     
      setAno(ano);
      
      for (let m = 0; m < getDatosMes.length; m++) {
        getDatosMes[m]=0;
      }
      if (obj.data) {
        let fecha = new Date();
        for (let g = 0; g < obj.data.length; g++) {
          let log = obj.data[g];
          fecha = new Date(log.FECHA_REGISTRO_CERTIFICADO);
          if (fecha.getFullYear() == ano) {
            getDatosMes[fecha.getMonth()] += log.PRIMA_NETA;
          }
        }
        await setDatosMes(getDatosMes) 
        state.config["data"] = [];
        setState({ ...state, logs: [] });
      }
      
    } catch (error) {
      return { estado: "error", error };
    }
    await setVisible(1);
  }

  const getTipoEvento = (tipo_evento: number) => {
    switch (tipo_evento) {
      case INGRESO_AL_SISTEMA: return "Ingreso al sistema";
      case INGRESO_FALLIDO_AL_SISTEMA: return "Ingreso fallido al sistema";
      case ERROR_DE_COMUNICACION_CON_EL_FTP: return "Error de comunicacion con el Ftp.";
      case PLANILLAS_SALARIO: return "Planilla de salarios";
      case DISPARO_CONTABLE_WEB_SERVICE: return "Disparo contable Web Service";
      case SUBIR_LIQUIDACIONES_BANCA: return "Subir liquidacion Banca";
      case CIERRE_CONCILIACION: return "Cierre de conciliacion";
      case SUBIR_EXCEL_PASO_2_CONCILIACION: return "Subir excel conciliacion paso 2";
      case SUBIR_EXCEL_POR_COMPANIA_CONCILIACION: return "Subir excel por compañía conciliacion";
      case ELIMINAR_CERTIFICADO: return "Eliminar certificado";
      case HISTORICO: return "Historico";
      case ELIMINAR_COMPROBANTE: return "Eliminar comprobante";
      case ELIMINAR_FACTURA_COMPRA_DETALLE: return "Eliminar factura comprobante detalle";
      case ELIMINAR_CHEQUE: return "Eliminar cheque";
      case ELIMINAR_FACTURA_COMPRA_CABECERA: return "Eliminar Factura compra";
      case COMPROBANTE_RECURRENTE_DEPRECIACION: return "Comprobante recurrente de depreciacion";
      case ASISTENCIA_REGISTRO_HUELLA: return "Asistencia registro huella";
      case ASISTENCIA_INTENTO_MARCADO: return "Asistencia intento marcado";
      case CIERRE_CONTABLE: return "Cierre contable";
      case REAPERTURA_CONTABLE: return "Reapertura contable";
      case APERTURA_SINIESTRO: return "Apertura siniestro";
      case CIERRE_SINIESTRO: return "Cierre siniestro";
      case CONSULTA: return "Ejecutó una consulta";
      case CIERRE_PLANILLA_PRIMA: return "Cerró la planilla de prima";
      case ASIGNACION_CANDIDATO: return "Asignación de candidato";
      case CAMBIO_EJECUTIVO_ATIENDE_POLIZA: return "Cambio ejecutivo que atiende poliza";
      case CAMBIO_EJECUTIVO_ATIENDE_CERTIFICADO: return "Cambio ejecutivo que atiende certificado";
      case EMISION_DE_CERTIFICADO_AUTOMATICO: return "Emision de certificado automático";
      case APP_WEB_SERVICE: return "Ingresó a la aplicacion";
      default: return "Sin tipo de evento favor colocar";
    }
  };
  const actionChartRadar = async (mes) => {
    setVisible(3);
    await getLogs(mes, getAno);
    setVisible(2);
  }
  const verCertificado = (id: any) => {
    props.navigation.navigate("PerfilProducto", { ID: id });
  };
  const setConfig = (mes: Int32, ano: Int32) => {
    let datosDia = [];
    let datosMonto = [];
    let primer_dia = new Date(ano, mes, 1);
    let ultimo_dia = new Date(ano, mes + 1, 0);
    let fecha = new Date(ano, mes, 1);
    let dia = 1;
    for (let i = primer_dia; i <= ultimo_dia; i.setDate(i.getDate() + 1)) {
      datosDia.push(dia);
      datosMonto.push(0);
      dia++;
    }
    setDias(datosDia);

    for (var i = 0; i < state?.config?.data.length; i++) {
      let log = state?.config?.data[i];
      fecha = new Date(log.FECHA_REGISTRO_CERTIFICADO);
      if (fecha.getMonth() == mes && fecha.getFullYear() == ano) {
        datosMonto[fecha.getDate() - 1] += log.PRIMA_NETA;
      }
    }
    let monto_acumulado = 0;
    for (var i = 0; i < datosMonto.length; i++) {
      monto_acumulado += datosMonto[i];
      datosMonto[i] = monto_acumulado;
    }
    setTitulo("Grafico de " + getMeses[mes] + " del " + ano);
    setMonto(datosMonto);
  }

  const buscarAno = () => {
    setVisible(3);
    getLogsAnual(getAno);
  };

  const dosD=(monto:number)=>{
    return monto.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  };

  const exportar= async()=>{
     // Created Sample data
     const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
     const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
     const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
     if(!readGranted || !writeGranted) {
       console.log('Read and write permissions have not been granted');
       return;
     }

     let data = [];
     state.logs.map(resp=>{
      data.push({
        "NIT CIA":resp.NIT,
        "COMPAÑÍA":resp.RAZON_SOCIAL,
        "POLIZA":resp.NUMERO_POLIZA,
        "CERTIFICADO":resp.NUMERO_CERTIFICADO,
        "FECHA REGISTRO":resp.FECHA_REGISTRO_CERTIFICADO,
        "NIT/CI CLIENTE":resp.NIT_CI,
        "CLIENTE":resp.NOMBRE_COMPLETO,
        "VIGENCIA INICIAL":resp.VIGENCIA_INICIAL,
        "VIGENCIA FINAL":resp.VIGENCIA_FINAL,
        "PRIMA":resp.PRIMA,
        "PRIMA NETA":resp.PRIMA_NETA,
        "MARCA":resp.AUTOMOTOR.MARCA,
        "MODELO":resp.AUTOMOTOR.MODELO,
        "PLACA":resp.DATO_ADICIONAL,
        "AÑO":resp.AUTOMOTOR.ANO,
        "TIPO":resp.AUTOMOTOR.TIPO,
        "COLOR":resp.AUTOMOTOR.COLOR,
        "PLAZAS":resp.AUTOMOTOR.PLAZAS,
        "MOTOR":resp.AUTOMOTOR.MOTOR,
        "CHASIS":resp.AUTOMOTOR.CHASIS,
        "NUMERO MOTOR":resp.AUTOMOTOR.NUMERO_MOTOR,
        "TRACCION":resp.AUTOMOTOR.TRACCION,
        "ZONA CIRCULACION":resp.AUTOMOTOR.ZONA_CIRCULACION,
        "EXTRATERRITORIALIDAD":resp.AUTOMOTOR.EXTRATERRITORIALIDAD
      });
     });

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(wb,ws,"Emisiones")
    const wbout = XLSX.write(wb, {type:'binary', bookType:"xlsx"});

    // Write generated excel to Storage
    console.log("sdf")
    let path = RNFS.TemporaryDirectoryPath+"/emisiones.xlsx";
    console.log(path)
    RNFS.writeFile(path, wbout, 'ascii').then((r:any)=>{
      console.log('Success');
      Share.open({
        title: "Reporte de emisiones mensual",
        message: "Este es el reporte de emisiones",
        url: "file:///"+path,
        subject: "Report",
    })
      
    }).catch((e:any)=>{
      console.log('Error', e);
    });
  };


  const pintarLogs = () => {
    const chartWidth = getDias.length * 50;

    return <View >
      <ScrollView horizontal={true} style={{ marginLeft: 10 }}>
        {(getVisible == 1) ?
          <View style={{ height: 500, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 30, marginTop: 30, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <GraficoRadar alto={450} ancho={Dimensions.get('window').width - 20} points={getMeses.length} labels={getMeses} datos={getDatosMes} radius={130} action={actionChartRadar} />
            <View style={{ width: "100%", position: "absolute", bottom: 10, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
              <TextInput
                style={{ backgroundColor: "white", color: tema.active, height: 40, width: 100, textAlign: "center", borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }}
                value={getAno + ""}
                placeholder='Año'
                onChangeText={text => { setAno(text) }}
                placeholderTextColor={tema.placeholder}
                keyboardType='numeric'
                onSubmitEditing={()=>buscarAno()}
              />
              <TouchableOpacity onPress={() => buscarAno()} style={{ backgroundColor: tema.primary, justifyContent: 'center', alignItems: "center", borderBottomRightRadius: 10, borderTopRightRadius: 10, height: 40, width: 70 }}>
                <Text>Buscar</Text>
              </TouchableOpacity>
          
            </View>
            <TouchableOpacity style={{position:'absolute',top:5,left:5}} onPress={() => {
                    props.navigation.goBack();
              }}>
                <IconComponent nameIcon='arrowLeft' colors={{ color_1: "white" }} alto={50} ancho={50} ></IconComponent>
              </TouchableOpacity>
          </View>
          : <></>
        }
        {
          (getVisible == 2) ?
            <View>
              <TouchableOpacity onPress={() => {
                state.config["data"] = [];
                setState({ ...state, logs: [] });
                setVisible(1);
              }}>
                <IconComponent nameIcon='arrowLeft' colors={{ color_1: "white" }} alto={50} ancho={50} ></IconComponent>
              </TouchableOpacity>
              <LineChart
                data={data}
                width={chartWidth}
                height={250}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                bezier
              />
              
            </View>
            : <></>
        }


      </ScrollView>
      {
        (getVisible == 2) ? (
          <View>
            <View style={{display:'flex', alignItems:'center', marginTop:20}}>
              <View style={{backgroundColor:'#fff', display:'flex', justifyContent:'center', borderColor:'#000', borderWidth:2, borderRadius:10, width:180, height:50}}>
                <Text style={{color:tema.active, fontSize:20, textAlign:'right', marginRight:1, fontWeight:'bold'}}>
                  $us. {dosD(getMonto[getMonto.length-1])}</Text>
              </View>
            </View>
            <View style={{display:'flex', alignItems:'center', marginTop:10,}}>
              <TouchableOpacity onPress={()=>{
                console.log("exportar")
                exportar()
              }}>
                <Text>Excel</Text>
              </TouchableOpacity>
            </View>
            <View style={{display:'flex', alignItems:'center', marginTop:10,}}>
              <TextInput
                onChangeText={(text)=>{
                  setBuscar("")
                  setBuscador(text);
                }}
                onBlur={() => { 
                  setBuscar(buscador)
                }}
                style={styles.input}
                value={(props?.state?.automotor?.COLOR)}
                placeholderTextColor={tema.placeholder}
                placeholder='Buscar...'
              />
            </View>
          </View>
        ) :
        (
          <View></View>
        )
      }
      {
        state?.logs.map((log: any, key: string) => {

          if(JSON.stringify(log).toUpperCase().indexOf(buscar.toUpperCase())<0){
            return;
          }

          return <View key={key} style={{
            borderWidth: 1,
            borderColor: tema.primary,
            margin: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#ffffffdd'
          }}>
            <Text style={{ color: tema.active }}>{log.NIT}</Text>
            <Text style={{ color: tema.active }}>{log.RAZON_SOCIAL}</Text>
            <Text style={{ color: tema.active }}>{"#Poliza: " + log.NUMERO_POLIZA}</Text>
            <TouchableOpacity onPress={() => {
              verCertificado(log.ID)
            }}>
              <Text style={{ color: tema.succes }}>{"#Certificado: " + log.NUMERO_CERTIFICADO}</Text>
            </TouchableOpacity>

            <Text style={{ color: tema.active }}>{"Cliente: " + log.NOMBRE_COMPLETO}</Text>
            <Text style={{ color: tema.active }}>{"Prima: " + dosD(log.PRIMA)}</Text>
            <Text style={{ color: tema.active }}>{"Prima Neta: " + dosD(log.PRIMA_NETA)}</Text>
            <Text style={{ color: tema.active }}>{"Placa: " + log.DATO_ADICIONAL}</Text>
            <Text style={{ color: tema.active }}>{"Marca: " + log.AUTOMOTOR.MARCA}</Text>
            <Text style={{ color: tema.active }}>{"Modelo: " + log.AUTOMOTOR.MODELO}</Text>
            <Text style={{ color: tema.active }}>{"Año: " + log.AUTOMOTOR.ANO}</Text>
            <Text style={{ color: tema.active }}>{"Tracción: " + log.AUTOMOTOR.TRACCION}</Text>
            <Text style={{ color: tema.active }}>{"Color: " + log.AUTOMOTOR.COLOR}</Text>
            <Text style={{ color: tema.active, textAlign: "right" }}>{log.FECHA_REGISTRO_CERTIFICADO}</Text>
          </View>
        })
      }
      <View style={{ height: 100 }}></View>
    </View>

  };

  return (
    <View style={{ height: Dimensions.get('window').height }}>
        <IconComponent nameIcon='fondo_form' ></IconComponent>
        {
          (!state.logs) ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" }}>
              <Load />
            </View>
            :
            <View style={{ flex: 1 }}>
              {getVisible == 3 ?
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", width: "100%", justifyContent: "center", alignItems: "center" }}><Load></Load></View>
                :
                <ScrollView>
                  {pintarLogs()}
                </ScrollView>
              }
            </View>

        }
    </View>
  )
};

const styles = StyleSheet.create({
  visible: {
    display: 'flex', // Por defecto es 'flex'
  },
  invisible: {
    display: 'none',
  },
  input: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    color: tema.active,
    width:300,
    height:40,
    backgroundColor: "transparent",
    borderRadius: 5,
    borderColor: tema.primary,
    borderWidth:1,
    fontSize: 11
  },
});

export default Logs;