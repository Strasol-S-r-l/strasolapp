import React, { useEffect, useState } from 'react';
import { Button, Clipboard, View, Text, ScrollView, Dimensions } from 'react-native';
import TesseractOcr, { useEventListener } from '@devinikhiya/react-native-tesseractocr';
import Svg, { Line, TSpan, Text as SvgText } from 'react-native-svg';
import api from '../enviroments/api.json'
import RNFS from 'react-native-fs';

const ReadText = (props:any) => {
    const [state, setState] = useState({ porc: 0, texto: null });

    const fetchFromClipboard = async () => {
        state.chasis = await Clipboard.getString();
        
        setState({...state});
        
        // Aquí puedes hacer algo con el texto obtenido del portapapeles
    };

    useEffect(() => {
        const read = async () => {
            console.log("subiendo..........................")
            /*
            const imageBlob = await RNFS.readFile(props.photo.path, 'base64')
            console.log(imageBlob)
            let send={
                key:api.key,
                image: imageBlob,
                type:"setRuat"
            };
            const uploadResponse = await fetch(api.url+'/app', {
                method: 'POST',
                body: JSON.stringify(send), // FormData will be sent as multipart/form-data
            });
            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
            }
            
            let text = await uploadResponse.json();
            console.log(text)
            state["texto"] = text.data;
            setState({...state})
            */
            try {
                let base64 = await new Promise(resolve=>{
                    RNFS.readFile(props.photo.path, 'base64')
                    .then(res =>{
                        resolve(res);
                    });
                });
                console.log(base64)
                
                /*console.log(props.photo)
                const recognizedText = await TesseractOcr.recognize(
                    props.photo.path,
                    "spa",
                    { 
                        psm: 6, 
                        oem: 1,
                        whitelist: "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                        blacklist: "O",
                    }
                );
                console.log('text is', recognizedText);
                */
                state["texto"] = base64;
                setState({...state});
            } catch (error) {
                console.error('Error en OCR:', error);
            }
        }

        if(!state.texto) read();
    }, [props.photo, state.texto]); // Asegúrate de que las dependencias estén correctamente listadas aquí

    useEventListener('onProgressChange', (p) => {
        console.log(p.percent / 100)
        setState(prevState => ({ ...prevState, porc: p.percent }));
    });

    const getText = () => {
        if(!state.texto) return (
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                <Text style={{color:'#fff'}}>Analizando imagen</Text>
                <Svg width={Dimensions.get('window').width} height={50} style={{marginTop:20}}>
                    
                    <Line strokeWidth={10} x1={10} y1={10} x2={(((Dimensions.get('window').width-10)*state.porc)/100)} y2={10} stroke={"#ffffffcc"} />
                    <SvgText fill={"#ffffff"} fontSize={20}><TSpan x={15} y={40}>{state.porc} %</TSpan></SvgText>
                </Svg>
            </View>
        );

        return <Text style={{color:'#fff'}} selectable={true}>{state.texto}</Text>
    }

    const selectPendientes=()=>{

        if(!state.chasis) {
            return <View>
            <View>
                <Text style={{color:'#ffffff', fontSize:15, margin:15,}}>Seleccione el chasis, copie el texto y presione el boton chasis.</Text>
            </View>
            <View>
                <Button title="Chasis" onPress={()=>{
                    fetchFromClipboard();
                }} />
            </View>
        </View>
        }
        return <>
        <View style={{display:'flex', flexDirection:'row'}}>
            <Text style={{color:'#ffffff',  margin:15,}}>Chasis</Text>
            <Text style={{color:'#ffffff',  margin:15,}}>{state.chasis}</Text>
        </View>
        </>
    };

    return (
        <View style={{alignItems:'center', backgroundColor:"#000000cc"}}>
            {selectPendientes()}
            <ScrollView style={{width:"100%", height:Dimensions.get('window').height-200}}>
                {getText()}
            </ScrollView>
        </View>
    );
};

export default ReadText;
