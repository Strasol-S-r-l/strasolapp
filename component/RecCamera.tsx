import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Text, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import { Camera, useCameraDevice, useCameraFormat} from 'react-native-vision-camera';
import ReadText from './ReadText';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const RecCamera = (navigation:any) => {
    
    const device = useCameraDevice('back')
    const format = useCameraFormat(device, [
      { fps: 240 }
    ])
    const camera = useRef(null);
    const [state, setState] = useState({isActive:false});

    const takePhoto = async () => {

        if (camera.current) {
          try {
            const photo = await camera.current.takePhoto({
              qualityPrioritization: 'quality',
              flash: 'off',
              enableShutterSound: false,
            });
            state["photo"] = photo;

            setState({...state})
            // Haz algo con la foto
          } catch (error) {
            console.error(error);
          }
        }
    };

    const uploadPhoto = async () => {


      ImagePicker.openPicker({
        //width: 300,
        //height: 400,
        freeStyleCropEnabled:true,
        cropping: true
      }).then(image => {
        state["recorte"] = image;
        setState({...state})
      });
  };
    
    
    const cancelPhoto = async () => {
        state.photo = false;
        setState({...state});
    };
    
    const recortarPhoto = async () => {
        
        ImagePicker.openCropper({
            path: "file://"+state.photo.path,
            width: 300,
            height: 400,
            freeStyleCropEnabled:true,
            cropperToolbarTitle:"Recorte el chasis",
            cropping:true
          }).then(image => {
            state["recorte"] = image;
            setState({...state})
          });
    };
    
    useEffect(() => { 
        navigation.navigation.setOptions({headerShown:false});
        if (Platform.OS === 'android') {
            requestCameraPermissionAndroid();
        }
        
    }, []);

    const setChasis= async(chasis:any)=>{
      //state.chasis=chasis;
      
      let auto = await AsyncStorage.getItem("automotor");
      if(!auto){
        auto = "{}";
      }
      
      auto = JSON.parse(auto);
      auto["CHASIS"] = chasis;
      
      await AsyncStorage.setItem("automotor", JSON.stringify(auto));
      
      //navigation.navigation.replace("Emision");
      navigation.navigation.goBack();
    }

    const requestCameraPermissionAndroid = async () => {
        try {
          
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Permiso de Cámara",
              message: "Esta aplicación necesita acceso a tu cámara",
              buttonNeutral: "Pregúntame Luego",
              buttonNegative: "Cancelar",
              buttonPositive: "Aceptar"
            }
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Tienes acceso a la cámara");
            
          } else {
            console.log("Permiso de cámara denegado");
          }
          espera()
        } catch (err) {
          console.warn(err);
          setState({...state})
        }
    };

    const espera = async ()=>{
      await setTimeout(()=>{
        state.isActive = true;
        setState({...state})
      }, 1000)
    }
    
    if (device == null ) return <View>
        <Text style={{color:tema.active}}>No tienes camara</Text>
    </View>


    if(state.recorte){
        return <View>
            <Image source={{ uri: "file://"+state.recorte.path }} style={{ width: 400, height: 400 }} />
            <ReadText  photo={state.recorte} setChasis={setChasis} tipo='chasis'/>
        </View>
    }

    if(state.photo){
        return <View style={{display:'flex', alignItems:'center'}}>
            <Image source={{ uri: "file://"+state.photo.path }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
            
            <View style={{position:'absolute', width:"100%"}}>
                <View>
                    <Button title="Cancelar" onPress={cancelPhoto} />
                    <Button title="Recortar" onPress={recortarPhoto} />
                </View>
            </View>
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera
                ref={camera}
                style={{ flex: 1 }}
                device={device}
                isActive={state.isActive}
                photo={true}
                exposure={2}
                format={format}
            />
            <Button title="Tomar Foto" onPress={takePhoto} />
            <Button title="Subir Foto" onPress={uploadPhoto} />
        </View>
    )
};

export default RecCamera;