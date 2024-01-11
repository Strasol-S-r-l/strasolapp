

import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Text, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import ReadText from './ReadText';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CamaraDoc = (navigation: any) => {
  const device = useCameraDevice('back');
  const format = useCameraFormat(device, [{ fps: 240 }]);
  const camera = useRef(null);
  const [permiso, setPermiso] = useState(false);
  const [state, setState] = useState(false);

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
        setPermiso(true);
        console.log("Tienes acceso a la cámara");
      } else {
        console.log("Permiso de cámara denegado");
        setPermiso(false);
      }
      espera();
    } catch (err) {
      console.warn(err);
      setPermiso(false);
      setState(false);
    }
  };

  const espera = async () => {
    let documentos = await AsyncStorage.getItem("documentos");
    try {
      if (documentos) state["documentos"] = JSON.parse(documentos);
    } catch (error) {}

    setState(true);
    console.log("llego a cambiar a true " + state);
  };

  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        croper(photo.path);
        setState(false);
      } catch (error) {
        console.error(error);
        // Manejar el error de la captura de la foto
      }
    }
  };

  const uploadPhoto = () => {
    ImagePicker.openPicker({
      freeStyleCropEnabled: true,
      cropping: true
    }).then(image => {
      croper(image.path);
      setState(false);
    });
  };

  const paint = () => {
    if (permiso && state) {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={camera}
            photo={true}
            device={device}
            isActive={state}
            style={{ flex: 1, zIndex: 1 }}
            exposure={2}
            format={format}
          />
          <Button title="Tomar Foto" onPress={takePhoto} />
          <Button title="Subir Foto" onPress={uploadPhoto} />
        </View>
      );
    } else {
      return <View style={{ backgroundColor: "red", flex: 1 }}></View>;
    }
  };

  useEffect(() => {
    navigation.navigation.setOptions({ headerShown: false });
    if (Platform.OS === 'android') {
      requestCameraPermissionAndroid();
    }
  }, []);

  if (navigation.route.params.url) {
    return <Text style={{ color: tema.active }}>{navigation.route.params.url}</Text>;
  }

  if (device == null) {
    return <View><Text style={{ color: tema.active }}>No tienes cámara</Text></View>;
  }

  return paint();
};

export default CamaraDoc;
