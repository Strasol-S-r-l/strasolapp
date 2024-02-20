import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Text, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import tema from '../enviroments/tema.json'
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import ReadText from './ReadText';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const RecCamera = (navigation:any) => {

  const device = useCameraDevice('back')

  const camera = useRef(null);
  const [state, setState] = useState({});


  const takePhoto = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        recortarPhoto(photo.path);
        setState({ ...state, estado: false });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const uploadPhoto = async () => {


    ImagePicker.openPicker({
      //width: 300,
      //height: 400,
      freeStyleCropEnabled: true,
      cropping: true
    }).then(image => {
      state["recorte"] = image;
      setState({ ...state })
    });
  };


  const cancelPhoto = async () => {
    state.photo = false;
    setState({ ...state });
  };

  const recortarPhoto = async (path:any) => {

    ImagePicker.openCropper({
      path: "file://" + path,
      width: 300,
      height: 400,
      freeStyleCropEnabled: true,
      cropperToolbarTitle: "Recorte el chasis",
      cropping: true
    }).then(image => {
      state["recorte"] = image;
      setState({ ...state })
    });
  };

  useEffect(() => {
    navigation.navigation.setOptions({ headerShown: false });
    console.log(navigation)
    const init = async () => {
      let permiso = false;
      if (Platform.OS === 'android') {
        permiso = await requestCameraPermissionAndroid();
      }
      setState({ ...state, permiso, estado: false })
    };
    init();

  }, []);

  const setChasis = async (chasis: any) => {
    //state.chasis=chasis;
    console.log(navigation.route.params);
    navigation.route.params.changeAutomotor({value:chasis});
    
    //navigation.navigation.replace("Emision");
    navigation.navigation.goBack();
  }

  const requestCameraPermissionAndroid = async () => {
    try {
      const granted = await Camera.requestCameraPermission();
      const granted2 = await Camera.requestMicrophonePermission();

      if (granted === PermissionsAndroid.RESULTS.GRANTED && granted2 === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const espera = async () => {
    await setTimeout(() => {
      setState({ ...state, estado: true });
    }, 1000)
  }

  if (device == null) return <View>
    <Text style={{ color: tema.active }}>No tienes camara</Text>
  </View>

  if(!state.permiso) return <View style={{backgroundColor:'#000', width:Dimensions.get('window').width, height:Dimensions.get('window').height}}><Text style={{ color: tema.text, textAlign:'center' }}>No tienes permiso para la camara</Text></View>


  if (state.recorte) {
    return <View>
      <Image source={{ uri: "file://" + state.recorte.path }} style={{ width: 400, height: 400 }} />
      <ReadText photo={state.recorte} setChasis={setChasis} tipo='chasis' />
    </View>
  }

  if (state.photo) {
    return <View style={{ display: 'flex', alignItems: 'center' }}>
      <Image source={{ uri: "file://" + state.photo.path }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />

      <View style={{ position: 'absolute', width: "100%" }}>
        <View>
          <Button title="Cancelar" onPress={cancelPhoto} />
          <Button title="Recortar" onPress={recortarPhoto} />
        </View>
      </View>
    </View>
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={state.estado}
        photo={true}

        onError={(error) => { console.log(error) }}
        onInitialized={() => { espera() }}

      />
      <TouchableOpacity
        onPress={takePhoto}
        style={{ width: 50, height: 50, backgroundColor: "#ffffffaa", borderRadius: 20, marginTop: Dimensions.get('window').height - 100 }}
      >
      </TouchableOpacity>
      {/*<Button title="Subir Foto" onPress={uploadPhoto} />*/}
    </View>
  )
};

export default RecCamera;