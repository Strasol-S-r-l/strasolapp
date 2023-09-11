import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import video from '../videos/algo.mp4';
import api from '../enviroments/api.json'
import AsyncStorage from '@react-native-async-storage/async-storage';

var navigation_:any;
const Login = ({navigation}:any) => {
  navigation_ = navigation;

  const [usuario, setUsuario] = useState({user:'', pass:'', error:'', tipo:0});
  const [load, setLoad] = useState(false);
  const videoPlayer:any = useRef(null);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  });


  const hanlechage=(obj_:any)=>{
    usuario.error = '';
    usuario.tipo = 0;
    if(obj_.id==='user'){
      usuario.user = obj_.text;
    }
    if(obj_.id==='pass'){
      usuario.pass = obj_.text;
    }
    setUsuario({...usuario});
  };

  const login=async()=>{
    usuario.error='';
    usuario.tipo=0;
    if(usuario.user.length==0){
      setUsuario({...usuario, error:'Ingrese nit/ci', tipo:1});
      return;
    }
    if(usuario.pass.length==0){
      setUsuario({...usuario, error:'Ingrese contrasena', tipo:2});
      return;
    }

    setLoad(true);

    const response = await fetch(api.url+'/app', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify({key:api.key,  type:"login", user:usuario.user, pass:usuario.pass}),                                       
    });
    const data = await response.json();
    setLoad(false);
    if(data.estado=='error'){
      setUsuario({...usuario, error:data.error})
      return;
    }
    try {
      await AsyncStorage.setItem("usuario", JSON.stringify(data.usuario));
    } catch (error) {
      console.log(error);
    }
    navigation_.replace("Splash");

  }

  return (
    <View style={{backgroundColor:'black', height:Dimensions.get('screen').height}}>
        <ScrollView>
            <View style={{ alignItems: 'center', marginTop:200, width:Dimensions.get('screen').width }}>
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
                <View style={{width:'100%', alignItems:'center'}}>
                    <View style={{width:'80%'}}>
                        <View>
                            <Text style={{ marginTop: 10, color: "#fff" }}>Nit/ci</Text>
                            <TextInput onChangeText={text => hanlechage({ text: text, id: "user" })} style={(usuario.tipo==1 ? styles.error : styles.input)} autoCapitalize='none'></TextInput>
                        </View>
                        <View>
                            <Text style={{ marginTop: 10, color: "#fff" }}>Contraseña</Text>
                            <TextInput onChangeText={text => hanlechage({ text: text, id: "pass" })} style={(usuario.tipo==2 ? styles.error : styles.input)}  autoCapitalize='none' secureTextEntry></TextInput>
                        </View>
                    </View>
                    <View style={{marginTop:15}}>
                      {
                        !load?
                        (
                          <TouchableOpacity onPress={login} style={{                          
                            borderWidth: 1, 
                            borderRadius: 10, 
                            borderColor: "#fff", 
                            padding:15,
                            }}>
                              <Text style={{ textAlign: "center", color: "#fff" }}>Iniciar sesion</Text>
                          </TouchableOpacity>
                        ):
                        (
                          <Text style={{color:'#fff', textAlign:'center'}}>Cargando...</Text>
                        )
                      }
                    </View>
                  <View>
                    <TouchableOpacity style={{ paddingTop: 20, }}>
                      <Text style={{ textAlign:"center", fontSize: 15, color: "#d2a65c", textDecorationLine: 'underline', }}> Solicitar contraseña</Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text style={{color:'#f00', marginTop:15}}>{usuario.error}</Text>
                  </View>
              </View>
            </View>
        </ScrollView>
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems:'center'
  },
  input: {
      width: "100%", 
      borderWidth: 1, 
      borderRadius: 10, 
      height: 40, 
      backgroundColor: "#ffffff33", 
      color: "#FFF", 
      borderColor: "#2fa42a",
  },
  error: {
      width: "100%", 
      borderWidth: 1, 
      borderColor: "#f00", 
      marginTop: 10, 
      borderRadius: 10, 
      height: 40, 
      backgroundColor: "#ffffff33", 
      color: "#FFF",
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
