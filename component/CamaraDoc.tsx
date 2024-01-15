

import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Text, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import ReadText from './ReadText';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CamaraDoc = (navigation: any) => {

  const device = useCameraDevice('back')
  const format = useCameraFormat(device, [
    { fps: 240 }
  ])
  const camera = useRef(null);
  const [state, setState] = useState(false);
  const [permiso, setPermiso] = useState(false);
  const takePhoto = async () => {

    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({
          qualityPrioritization: 'quality',
          flash: 'off',
          enableShutterSound: false,
        });

        croper(photo.path)
        setState(false)

      } catch (error) {
        console.error(error);
      }
    }
  };

  const croper = async (path: any) => {
    ImagePicker.openCropper({
      path: "file://" + path,
      width: 300,
      height: 300,
      freeStyleCropEnabled: true,
      cropperToolbarTitle: "Recorte el documento",
      cropping: true
    }).then(async image => {

      state["documentos"].map((doc: any) => {
        if (doc.ID == navigation.route.params.id) {
          doc["url"] = image.path;
        }
      })

      await AsyncStorage.setItem("documentos", JSON.stringify(state["documentos"]));

      navigation.navigation.replace("Emision")
      //navigation.navigation.goBack();
    });
  };

  const espera = async () => {

  //  await setTimeout(async () => {
      let documentos = await AsyncStorage.getItem("documentos");
      try {
        if (documentos) state["documentos"] = JSON.parse(documentos);  
      } catch (error) {
        
      }
      
      setState(true)
      console.log("llego a cambiar a true "+state);
      //  }, 1000)
  }

  const uploadPhoto = async () => {


    ImagePicker.openPicker({
      //width: 300,
      //height: 400,
      freeStyleCropEnabled: true,
      cropping: true
    }).then(image => {

      croper(image.path)
      setState(false)
    });
  };


  useEffect(() => {
    navigation.navigation.setOptions({ headerShown: false });
    if (Platform.OS === 'android') {
      requestCameraPermissionAndroid();
    }
    espera();
  }, []);


  const requestCameraPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (granted) {
        setPermiso(true);
      } else {
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
          setPermiso(true);
          console.log("Tienes acceso a la cámara");
        } else {
          console.log("Permiso de cámara denegado");
        }
      }
    //  espera()
      console.log(JSON.stringify(state))

      /* const granted = await PermissionsAndroid.request(
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
       espera()*/
    } catch (err) {
      console.warn(err);
      setState(false)
    }
  };

  if (navigation.route.params.url) {
    return <>
      <Text style={{ color: tema.active }}>{navigation.route.params.url}</Text>
    </>
  }

  if (device == null) return <View>
    <Text style={{ color: tema.active }}>No tienes camara</Text>
  </View>

const paint=()=>{
  if(state){
    return<View style={{ flex: 1 }}>
      <Camera
            ref={camera}
            photo={true}
            device={device}
            isActive={state}
            style={{ flex:1}}
            exposure={2}
            format={format}
        />
        <Button title="Tomar Foto" onPress={takePhoto} />
    </View>
  }else{
    return <View style={{backgroundColor:"red",flex:1}}></View>
  }
}

  return paint();
};

export default CamaraDoc;