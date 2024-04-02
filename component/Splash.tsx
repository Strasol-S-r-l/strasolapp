import React, { useEffect, useRef } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';
import { Image } from 'react-native-svg';


var navigation_: any;
const Splash = ({ navigation }: any) => {
  navigation_ = navigation;
  const videoPlayer: any = useRef(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  });

  const isLogued = async () => {
    try {
      const suser: any = await AsyncStorage.getItem("usuario");
      if (!suser || suser == null) {
        navigation_.replace("Login");
        return;
      }
      navigation_.replace("Cotizacion");
    } catch (error) { }
  }

  const onEnd = async () => {

    try {
      navigation_.replace("Cotizacion");
    } catch (error) {

      console.log(error);
    }

  }

  isLogued()

  return (
    <View style={styles.container}>

      {/*<Video
          onEnd={onEnd}
          ref={videoPlayer}
          source={require('../videos/algo.mp4')}
          resizeMode="contain"
          style={styles.mediaPlayer}
          volume={10}

        />*/}
      {/*<Text style={{color:tema.active, textAlign:'center'}}>Cargando...</Text>*/}
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <IconComponent nameIcon='fondo_load' ></IconComponent>
        <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: "20%" }}>
          <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ width: "80%", color: tema.primary, fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Seguros</Text>
          </View>
          <Text style={{ width: "80%", color: "black", fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Bolivia</Text>
        </View>
        <View style={{ width: "100%", height: "30%", justifyContent: 'center', alignContent: "center", alignItems: "center" }}>
          <Image style={{ width: 60, height: 60 }} source={require('../images/load.gif')} />
        </View>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});