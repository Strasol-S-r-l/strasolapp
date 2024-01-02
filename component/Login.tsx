import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../enviroments/api.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';

var navigation_: any;
const Login = ({ navigation }: any) => {
  navigation_ = navigation;

  const [usuario, setUsuario] = useState({ user: '', pass: '', error: '', tipo: 0 });
  const [load, setLoad] = useState(false);
  const videoPlayer: any = useRef(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  });


  const hanlechage = (obj_: any) => {
    usuario.error = '';
    usuario.tipo = 0;
    if (obj_.id === 'user') {
      usuario.user = obj_.text;
    }
    if (obj_.id === 'pass') {
      usuario.pass = obj_.text;
    }
    setUsuario({ ...usuario });
  };

  const login = async () => {
    usuario.error = '';
    usuario.tipo = 0;
    if (usuario.user.length == 0) {
      setUsuario({ ...usuario, error: 'Ingrese nit/ci', tipo: 1 });
      return;
    }
    if (usuario.pass.length == 0) {
      setUsuario({ ...usuario, error: 'Ingrese contraseña', tipo: 2 });
      return;
    }

    setLoad(true);

    const response = await fetch(api.url + '/app',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ key: api.key, type: "login", user: usuario.user, pass: usuario.pass }),
      });
    const data = await response.json();
    console.log(JSON.stringify(data))
    setLoad(false);
    if (data.estado == 'error') {
      setUsuario({ ...usuario, error: data.error })
      return;
    }
    try {
      await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
      navigation_.replace("Cotizacion");
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <View style={{ position: 'absolute', width: "100%", height: Dimensions.get('window').height, backgroundColor: "rgba(68,125,209,1)" }}>
    <View style={{ flex: 1, position: 'relative' }}>
      <IconComponent nameIcon='fondo_login' ></IconComponent>
      <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: "20%" }}>
        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ width: "80%", color: tema.primary, fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Insurance<Text style={{ marginTop: 10, color: "black", fontSize: 45, fontWeight: 'bold' }}>Tech</Text> </Text>
        </View>
        <Text style={{ width: "80%", color: "black", fontSize: 45, fontWeight: 'bold', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 5, }}>Bolivia</Text>
      </View>
      <View style={{ alignItems: 'center', width: Dimensions.get('screen').width, height: "55%" }}>
        {/*
                  <View style={{ width:'100%', height:300, position:'absolute'}}>
                    {
                      <Video 
                        ref={videoPlayer}
                        //source={{uri:'https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4'}} 
                        source={video}
                        resizeMode="contain"
                        style={styles.backgroundVideo}
                        /> 
                    }
                  </View>
                */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '80%' }}>
            <View>
              <Text style={{ marginTop: 10, color: tema.text, fontWeight: 'bold' }}>Usuario</Text>
              <TextInput placeholder='Nombre de Usuario' onChangeText={text => hanlechage({ text: text, id: "user" })} style={(usuario.tipo == 1 ? styles.error : styles.input)} autoCapitalize='none'></TextInput>
            </View>
            <View>
              <Text style={{ marginTop: 10, color: tema.text, fontWeight: 'bold' }}>Contraseña</Text>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TextInput secureTextEntry={!passwordVisible} value={usuario.pass} onChangeText={text => hanlechage({ text: text, id: "pass" })} placeholderTextColor={tema.placeholder} placeholder='Contraseña' style={(usuario.tipo == 2 ? styles.input_password_error : styles.input_password)} autoCapitalize='none' ></TextInput>
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderColor: 'gray', borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, width: 50 }}>
                  {
                    passwordVisible ? <IconComponent nameIcon="eye" alto="35px" ancho="35px" ></IconComponent> :
                      <IconComponent nameIcon="eyeClose" alto="35px" ancho="35px" ></IconComponent>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 105, width: '80%' }}>
            {
              !load ?
                (
                  <TouchableOpacity onPress={login} style={styles.input_button}>
                    <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Conectar</Text>
                  </TouchableOpacity>
                ) :
                (
                    <View style={{ width: "100%", height: "30%", justifyContent: 'center', alignContent: "center", alignItems: "center" }}>
                      <Image style={{ width: 60, height: 60 }} source={require('../images/load.gif')} />
                    </View>
                )
            }
          </View>
          {/*<View> 
                <TouchableOpacity style={{ paddingTop: 20, }}>
                  <Text style={{ textAlign: "center", fontSize: 15, color: tema.warning, textDecorationLine: 'underline', }}> Solicitar contraseña</Text>
                </TouchableOpacity>
              </View>*/}
          <View>
            <Text style={{ color: tema.danger, marginTop: 15 }}>{usuario.error}</Text>
          </View>
        </View>
      </View>

      <View style={{ position: "relative", height: "25%", justifyContent: "flex-end" }}>
        <View style={{ ...StyleSheet.absoluteFillObject, overflow: 'hidden' }}>
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'stretch'
            }}
            source={require('./../images/blanco_degradado.png')}
          />
        </View>

        <View style={{ display: 'flex', justifyContent: 'center', height: "50%", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
            <View style={{ width: "18%", height: 2, backgroundColor: "gray", }}></View>
            <Text style={{ color: tema.primary }}> Registrarse con </Text>
            <View style={{ width: "18%", height: 2, backgroundColor: "gray", }}></View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: tema.primary }}>No tiene una cuenta? </Text>
            <TouchableOpacity >
              <Text style={{ textAlign: "center", fontSize: 15, color: tema.primary, textDecorationLine: 'underline', fontWeight: "bold" }}> Registrarse</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={{ display: "flex" }}>
              <Text style={{ color: tema.primary, fontSize: 11 }}>Para conectarse, usted declara que conoce y leyo </Text>
              <Text style={{ color: tema.primary, fontSize: 11 }}>las condiciones de los servicios <Text style={{ fontWeight: 'bold', color: tema.primary }}>CloudBrokers Agreement.</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: tema.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    backgroundColor: tema.background,
    color: tema.active,
    borderColor: tema.primary,
  },
  input_button: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
    backgroundColor: tema.primary,
    borderColor: tema.primary,

  },
  input_password: {
    flex: 1,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 50,
    backgroundColor: tema.background,
    color: tema.active,
    borderLeftColor: tema.primary,
    borderTopColor: tema.primary,
    borderBottomColor: tema.primary,
    borderRightColor: 'white'
  },
  error: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#f00",
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    backgroundColor: tema.background,
    color: tema.active,
  },
  input_password_error: {
    flex: 1,
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 50,
    backgroundColor: tema.background,
    color: tema.active,
    borderLeftColor: "#f00",
    borderTopColor: "#f00",
    borderBottomColor: "#f00",
    borderRightColor: 'white'
  },
});

/*
<key>NSAppTransportSecurity</key>
  <dict>
    <key>NSExceptionDomains</key>
    <dict>
      <key>localhost</key>
      <dict>
        <key>NSExceptionAllowsInsecureHTTPLoads</key>
        <true/>
      </dict>
    </dict>
  </dict>
*/
export default Login;
