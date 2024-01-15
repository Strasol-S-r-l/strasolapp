

import React, { useEffect, useRef, useState } from 'react';
import { Button, Image, Text, View, PermissionsAndroid, Platform, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import tema from '../enviroments/tema.json'
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera';
import ReadText from './ReadText';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Load from './Load';

const CamaraDoc = (navigation: any) => {
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const [state, setState] = useState({});

  const requestCameraPermissionAndroid = async () => {
    try {
      const granted = await Camera.requestCameraPermission();
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const setShowCamera = async () => {
    await setTimeout(()=>{
      setState({...state, estado:true});
    }, 1000);
  };

  const takePhoto = async () => {

    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        croper(photo.path);
        setState({...state, estado:false});
      } catch (error) {
        console.error(error);
      }
    }
  };

  const croper = async (path:any) =>{
    ImagePicker.openCropper({
      path: "file://"+path,
      width: 400,
      height: 400,
      freeStyleCropEnabled:true,
      cropperToolbarTitle:"Recorte el documento",
      cropping:true
    }).then(async image => {

      state["documentos"].map((doc:any)=>{
        if(doc.ID == navigation.route.params.id){
            doc["url"] = image.path;
        }
      })
      await AsyncStorage.setItem("documentos", JSON.stringify(state["documentos"]));
      navigation.navigation.replace("Emision")
      //navigation.navigation.goBack();
    }).catch(e=>{
      setState({...state, estado:true});
    });
  };



  useEffect(() => {
    navigation.navigation.setOptions({ headerShown: false });
    const init= async()=>{

      let documentos = await AsyncStorage.getItem("documentos");
      try {
        if (documentos) state["documentos"] = JSON.parse(documentos);
      } catch (error) {}

      let permiso = false;
      if (Platform.OS === 'android') {
        permiso = await requestCameraPermissionAndroid();
      }
      
      setState({...state, permiso, estado:false})
    };
    init();
    
  }, []);



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

  if(!state.permiso) return <View><Text style={{ color: tema.active }}>No tienes permiso</Text></View>

  if (navigation.route.params.url) {
    return <Text style={{ color: tema.active }}>{navigation.route.params.url}</Text>;
  }

  return (
    <View style={{flex:1, alignItems:'center' }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={state.estado}
        photo={true}
        onError={(error) => {console.log(error)}}
        onInitialized={() => {setShowCamera()}}
        
      />
      
      <TouchableOpacity 
        onPress={takePhoto}
        style={{ width:50, height:50, backgroundColor:"#ffffffaa", borderRadius:20, marginTop:Dimensions.get('window').height-100}}
      >

      </TouchableOpacity>
      {/*<Button title="Subir Foto" onPress={uploadPhoto} />*/}
    </View>
  )

};

export default CamaraDoc;