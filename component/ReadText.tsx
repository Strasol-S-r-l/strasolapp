import React, { useEffect, useState } from 'react';
import { Button, Clipboard, View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Line, TSpan, Text as SvgText } from 'react-native-svg';
import api from '../enviroments/api.json'
import RNFS from 'react-native-fs';
import Load from './Load';

const ReadText = (props:any) => {
    const [state, setState] = useState({ porc: 0, texto: null });

    const fetchFromClipboard = async (text:any) => {
        
        props.setChasis(text)
    };

    useEffect(() => {
        const read = async () => {
            console.log("subiendo..........................")
            
            const imageBlob = await RNFS.readFile(props.photo.path, 'base64')
            //console.log(imageBlob)
            let send={
                requests:[
                    {
                        image: {content:imageBlob},
                        features:[{type: "TEXT_DETECTION",maxResults: 1}]
                    }
                ]
            };
            const uploadResponse = await fetch(api.url_gvision, {
                method: 'POST',
                body: JSON.stringify(send), // FormData will be sent as multipart/form-data
            });
            if (!uploadResponse.ok) {
                throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
            }
            
            let text = await uploadResponse.json();
            text = text["responses"][0]["textAnnotations"][0]["description"]
            state["texto"] = text;
            setState({...state})
        }

        if(!state.texto) read();
    }, [props.photo, state.texto]); // Asegúrate de que las dependencias estén correctamente listadas aquí

    /*useEventListener('onProgressChange', (p) => {
        console.log(p.percent / 100)
        setState(prevState => ({ ...prevState, porc: p.percent }));
    });*/

    const getText = () => {
        if(!state.texto) return (
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                <Text style={{color:'#fff'}}>Analizando imagen</Text>
                <Load />
            </View>
        );
        return <View style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
            <Text style={{color:'#fff'}}>Seleccione el chasis</Text>
            {
                state.texto.split("\n").map((tt:string, index:any)=>{
                    return <TouchableOpacity key={index}
                        onPress={()=>fetchFromClipboard(tt)} 
                        style={{ margin:5, padding:5}}>
                        <Text style={{color:'#fff'}} >{tt}</Text>
                    </TouchableOpacity>
                })
            }
            
        </View>
        
    }

    return (
        <View style={{alignItems:'center', backgroundColor:"#000000cc"}}>
            
            <ScrollView style={{width:"100%", height:Dimensions.get('window').height-200}}>
                {getText()}
            </ScrollView>
        </View>
    );
};

export default ReadText;
