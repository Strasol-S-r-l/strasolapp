import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Share from 'react-native-share';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import Load from './Load';

var navigation_:any;
const PerfilProducto = ({route, navigation}:any) => {
    navigation_ = navigation;
    
    const [state, setState] = React.useState({});

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
        const init = async()=>{
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify({key:api.key, type:'getProducto', tipo:"Certificado",ID:route.params.ID}),
            });
            
            const obj = await response.json();
            
            if(obj.estado === "error"){
                state["certificado"] = obj;
                setState({...obj});
                return;
            }
            
            state["certificado"] = obj.data;
            setState({...state});
        };
        init();
    }, []);

    const getCliente=()=>{
        return <View style={{marginTop:10}}>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginLeft:10, marginTop:10, marginRight:10}}>
                <Text style={{color:tema.active, fontWeight:'bold'}}>Asegurado</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Nit/Ci</Text>
                <Text style={{color:tema.active}}>{state.certificado.CLIENTE.NIT_CI}{state.certificado.CLIENTE.LUGAR_EMISION_CI}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Nombre</Text>
                <Text style={{color:tema.active}}>{state.certificado.CLIENTE.NOMBRE_COMPLETO}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Telefono</Text>
                <TouchableOpacity 
                onPress={openWhatsAppChat}>
                    <Text style={{color:tema.primary, textDecorationLine:'underline'}}>{state.certificado.CLIENTE.CELULAR}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    }

    const getPlanPagos=()=>{
        return <View style={{marginTop:10}}>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginLeft:10, marginTop:10, marginRight:10}}>
                <Text style={{color:tema.active, fontWeight:'bold'}}>Plan de pagos</Text>
            </View>
            {
                state.certificado.PLAN_PAGOS.map((cuota, i)=>{
                    return <View key={i} style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:tema.active, marginLeft:10}}>{i+1}</Text>
                        <Text style={{color:tema.active}}>{cuota.FECHA_PAGO}</Text>
                        <Text style={{color:tema.active}}>$us. {cuota.PRIMA}</Text>
                        <Text style={{color:tema.active, marginRight:10}}>{cuota.ESTADO_PAGO==1?"Pendiente":"Pagada"}</Text>
                    </View>
                })
            }
        </View>
        
    }

    const sharePdf=(titulo:string, url:string)=>{
        let message = "*"+titulo+"*";
        message += "\n\n";
        message += "*Poliza #*: "+state.certificado.NUMERO_POLIZA.trim();
        message += "\n";
        message += "*Certificado #*: "+state.certificado.NUMERO_CERTIFICADO.trim();
        message += "\n";
        message += "*Marca*: "+state.certificado.AUTOMOTOR.MARCA.trim();
        message += "\n";
        message += "*Modelo*: "+state.certificado.AUTOMOTOR.MODELO.trim();
        message += "\n";
        message += "*Placa*: "+state.certificado.DATO_ADICIONAL.trim();
        message += "\n";
        message += "*Prima*: $us. "+state.certificado.PRIMA.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
        message += "\n\n";
        message += "Descargue su documento ⬇️\n";
        message += url;
        Share.open({
            title:titulo,
            message
            //type: 'application/pdf',
        });
    }

    const getDocs=()=>{
        let emision = state?.certificado?.EMISION;
        
        if(!emision) return <></>

        emision = JSON.parse(emision);
        
        if(emision.sDocumentsEmi){
            return <View style={{marginTop:30}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center', margin:10}}>
                    <Text style={{color:tema.active, fontWeight:'bold'}}>Documentos</Text>
                </View>
                <View style={{marginLeft:10, marginRight:10, marginTop:10, display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    
                    {
                        Object.values(emision.sDocumentsEmi).map((doc)=>{
                            return <TouchableOpacity
                                    onPress={()=>{
                                        sharePdf(doc.sDescript,doc.sUrlFile)
                                    }}
                                    key={doc.sUrlFile}
                                >
                                <View style={{display:'flex', alignItems:'center'}}>
                                    <Image 
                                        style={{width:60, height:60}} 
                                        source={require('../images/pdf.webp')} 
                                    />
                                    <Text style={{color:tema.active}}>{doc.sDescript}</Text>
                                </View>
                            </TouchableOpacity>
                        })
                    }
                    
                </View>
            </View>
        }
        if(emision.certificado){
            return <View style={{marginTop:10}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'center', margin:10}}>
                    <Text style={{color:tema.active, fontWeight:'bold'}}>Documentos</Text>
                </View>
                <View style={{marginLeft:10, marginRight:10, marginTop:10, display:'flex', flexDirection:'row', justifyContent:'center'}}>
                     <TouchableOpacity
                            onPress={()=>{
                                sharePdf("Certificado",emision.certificado)
                            }}
                        >
                        <View style={{display:'flex', alignItems:'center'}}>
                            <Image 
                                style={{width:60, height:60}} 
                                source={require('../images/pdf.webp')} 
                            />
                            <Text style={{color:tema.active}}>Certificado</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        }

        return <></>
    }

    const getAutomotor=()=>{
        return <View style={{marginTop:30}}>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginLeft:10, marginTop:10, marginRight:10}}>
                <Text style={{color:tema.active, fontWeight:'bold'}}>Automotor</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Marca</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.MARCA.trim()}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Modelo</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.MODELO.trim()}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Placa</Text>
                <Text style={{color:tema.active}}>{state.certificado.DATO_ADICIONAL}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Año</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.ANO}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Tipo</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.TIPO.trim()}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Color</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.COLOR}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Plazas</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.PLAZAS}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Motor Cc.</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.MOTOR}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Chasis Nro.</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.CHASIS}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Motor Nro.</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.NUMERO_MOTOR}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Trancción</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.TRACCION}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Extraterritoriedad</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.EXTRATERRITORIALIDAD}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Zona de circulación</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.ZONA_CIRCULACION}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Ubicar</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.UBICAR}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Uso</Text>
                <Text style={{color:tema.active}}>{state.certificado.AUTOMOTOR.USO}</Text>
            </View>
        </View>
    }

    const getDatosCertificado=()=>{
        return <View style={{marginTop:30}}>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active, fontWeight:'bold'}}>Certificado</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between',  marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}># Póliza</Text>
                <Text style={{color:tema.active}}>{state.certificado.NUMERO_POLIZA}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}># Certificado</Text>
                <Text style={{color:tema.active}}>{state.certificado.NUMERO_CERTIFICADO}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Valor Asegurado</Text>
                <Text style={{color:tema.active}}>$us. {state.certificado.VALOR_ASEGURADO.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Tipo Pago</Text>
                <Text style={{color:tema.active}}>{state.certificado.TIPO_PAGO}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Prima</Text>
                <Text style={{color:tema.active}}>$us. {state.certificado.PRIMA.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:10, marginRight:10}}>
                <Text style={{color:tema.active}}>Comisión</Text>
                <Text style={{color:tema.active}}>$us. {state.certificado.COMISION.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})}</Text>
            </View>
            {
            /*
            <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginLeft:10, marginTop:10, marginRight:10}}>
                <Text style={{color:tema.active, fontWeight:'bold'}}>Vigencias</Text>
            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginLeft:50, marginRight:50}}>
                <Text style={{color:tema.active}}>{state.certificado.VIGENCIA_INICIAL}</Text>
                <Text style={{color:tema.active}}>{state.certificado.VIGENCIA_FINAL}</Text>
            </View>*/
            }
        </View>
    };

    const openWhatsAppChat = () => {
        let phoneNumber = '+591'+state.certificado.CLIENTE.CELULAR; // Número de teléfono al que deseas enviar el mensaje
        console.log(phoneNumber)
        
        let message = "*Tu seguro fue emitido correctamente*";
        message += "\n\n";
        message += "*Ci Asegurado*: "+state.certificado.CLIENTE.NIT_CI+""+state.certificado.CLIENTE.LUGAR_EMISION_CI;
        message += "\n";
        message += "*Nombre Asegurado*: "+state.certificado.CLIENTE.NOMBRE_COMPLETO;
        message += "\n";
        message += "*Poliza #*: "+state.certificado.NUMERO_POLIZA.trim();
        message += "\n";
        message += "*Certificado #*: "+state.certificado.NUMERO_CERTIFICADO.trim();
        message += "\n";
        message += "*Valor asegurado*: $us. "+state.certificado.VALOR_ASEGURADO.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
        message += "\n";
        message += "*Prima*: $us. "+state.certificado.PRIMA.toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2});
        message += "\n";
        message += "*Marca*: "+state.certificado.AUTOMOTOR.MARCA.trim();
        message += "\n";
        message += "*Modelo*: "+state.certificado.AUTOMOTOR.MODELO.trim();
        message += "\n";
        message += "*Placa*: "+state.certificado.DATO_ADICIONAL.trim();
        message += "\n";
        message += "*Ano*: "+state.certificado.AUTOMOTOR.ANO;
        message += "\n";
        message += "*Color*: "+state.certificado.AUTOMOTOR.COLOR;
        message += "\n";
        message += "*Motor cc.*: "+state.certificado.AUTOMOTOR.MOTOR;
        message += "\n";
        message += "*Motor #*: "+state.certificado.AUTOMOTOR.NUMERO_MOTOR;
        message += "\n";
        message += "*Chasis #*: "+state.certificado.AUTOMOTOR.CHASIS;
        message += "\n\n";

        let emision = state?.certificado?.EMISION;
        
        if(emision){
            message += "Descargue sus documentos ⬇️\n";
            message += "\n\n";
            emision = JSON.parse(emision);
        
            if(emision.sDocumentsEmi){
                Object.values(emision.sDocumentsEmi).map((doc)=>{
                    message += "*"+doc.sDescript+"*\n";
                    message += doc.sUrlFile+"\n\n";
                })
            }
            if(emision.certificado){
                message += "*Certificado*\n";
                message += emision.certificado+"\n\n";
            }
        }

        
        // Elimina los espacios y otros caracteres no numéricos del número
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    
        // Crea la URL para enviar el mensaje
        let url = `whatsapp://send?text=${encodeURIComponent("message")}&phone=${phoneNumber}`;
    
        // Verifica si se pueden abrir URL
        Linking.canOpenURL(url)
        .then((supported) => {
            console.log(supported);
            if (!supported) {
              console.log('No se puede abrir WhatsApp');
            } else {
              return Linking.openURL(url);
            }
        })
        .catch((err) => console.error('Ocurrió un error', err));
    };
    
    const pintar=()=>{
        if(!state?.certificado) return <Load />;

        

        return <ScrollView style={{marginTop:20}}>
            {getCliente()}
            {getDatosCertificado()}
            {getDocs()}
            {getAutomotor()}
            {getPlanPagos()}

            <View style={{marginLeft:10, marginRight:10, marginTop:40}}>
                <Text style={{color:tema.opaque, textAlign:'right'}}>{new Date(state.certificado.FECHA_REGISTRO).toLocaleString()}</Text>
            </View>

            <View style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:20, marginBottom:40}}>
                <TouchableOpacity
                    onPress={()=>{
                        navigation_.replace("Home")
                    }}
                    style={{backgroundColor:tema.primary, height:50, width:130, borderRadius:10, justifyContent:'center', alignItems:'center'}}
                >
                    <Text style={{color:tema.active, textAlign:'center'}}>Volver al Menú</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    };

    return (
        <View style={{flex:1}}>
            <View>
                <Text style={styles.subtitle}>Información del Certificado</Text>
            </View>
            {pintar()}    
        </View>
    )
};

const styles = StyleSheet.create({
    subtitle:{
        color:tema.primary, 
        textAlign:'center', 
        marginTop:10, 
        fontSize:25
    }
});
export default PerfilProducto;