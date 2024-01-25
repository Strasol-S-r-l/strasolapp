import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tema from '../enviroments/tema.json'
import IconComponent from './assets/icons/IconComponent';
import Load from './Load';
import api from '../enviroments/api.json'

var navigation_: any;
const RecuperarPass = ({ navigation }: any) => {
  navigation_ = navigation;
  const [state, setState] = useState({});

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  });

  const recuperarPass= async(usr:string, email:string)=>{
    const response = await fetch(api.url + '/app',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ key: api.key, type: "recuperarPass", usr, email }),
      });
    const data = await response.json();

    console.log(data)
    if(data.estado=="error"){
        state["error"] = data.error;
        state["loadUsr"] = false;
        setState({...state});
        return;
      }
    
    state["usuario"] = data.data;
    state["loadUsr"] = false;
    setState({...state});
  }
  
  const exito =()=>{
    return  <View style={{ height: Dimensions.get('screen').height }}>
        <IconComponent nameIcon='fondo_login' ></IconComponent>
        <View>
            <Text style={{textAlign:'center', fontSize:25, marginTop:10}}>Se envió la contraseña al correo ingresado</Text>
        </View>
        <TouchableOpacity  style={{...styles.input_button, backgroundColor:tema.primary}} onPress={()=>{
            navigation_.goBack()
        }}>
          <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Salir</Text>
        </TouchableOpacity>
    </View>
  }

  const buscarUsuario=()=>{

    if(state["usuario"]=="exito"){
      setTimeout(()=>{
        navigation_.goBack()
      }, 3000)

      return <View>
      <View>
          <Text style={{marginLeft:20, fontSize:20, marginTop:10}}>Se envió la contraseña a su correo</Text>
      </View>
    </View>
    }

    if(state["usuario"]){
      return <View>
      <View>
          <Text style={{marginLeft:20, fontSize:20, marginTop:10}}>{state.usuario.usr}</Text>
      </View>
      <View>
        <Text style={{marginLeft:20, fontSize:20, marginTop:10}}>{state.usuario.email}</Text>
      </View>
      <View>
        <Text style={{marginLeft:20, fontSize:20, marginTop:10}}>Igrese su email</Text>
        <TextInput placeholderTextColor={tema.placeholder} value={state.email}  placeholder='Email' onChangeText={text => {
            state["email"] = text;
            setState({...state})
          }} style={styles.input} autoCapitalize='none'></TextInput>
        <TouchableOpacity  style={styles.input_button} onPress={()=>{
          recuperarPass(state.usr, state.email);
        }}>
          <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Recuperar</Text>
        </TouchableOpacity>
      </View>
    </View>
    }

    return <View>
      <View>
          <Text style={{marginLeft:20, fontSize:20, marginTop:10}}>Igrese su usuario</Text>
          <TextInput placeholderTextColor={tema.placeholder} value={state.usr}  placeholder='Nombre de Usuario' onChangeText={text => {
            state["usr"] = text;
            setState({...state})
          }} style={styles.input} autoCapitalize='none'></TextInput>
      </View>
      <View>
        <TouchableOpacity  style={styles.input_button} onPress={()=>{
          if(!state["usr"] || state["usr"].length==0) return;
          
          state["loadUsr"] = true;
          recuperarPass(state.usr, "");
          setState({...state})
        }}>
          <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Buscar usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  }

  if(state.error){
    return <View style={{ height: Dimensions.get('screen').height }}>
        <IconComponent nameIcon='fondo_login' ></IconComponent>
        <View>
            <Text style={{textAlign:'center', fontSize:25, marginTop:10}}>Recuperar Contraseña</Text>
        </View>
        <View>
            <Text style={{textAlign:'center', fontSize:20, marginTop:10, color:tema.danger}}>{state.error}</Text>
        </View>
        <TouchableOpacity  style={{...styles.input_button, backgroundColor:tema.danger}} onPress={()=>{
            navigation_.goBack()
        }}>
          <Text style={{ textAlign: "center", color: tema.text, fontWeight: 'bold' }}>Salir</Text>
        </TouchableOpacity>
    </View>
  }
  

  return (
    <View style={{ height: Dimensions.get('screen').height }}>
        <IconComponent nameIcon='fondo_login' ></IconComponent>
        <View>
            <Text style={{textAlign:'center', fontSize:25, marginTop:10}}>Recuperar Contraseña</Text>
        </View>
        {!state["loadUsr"]?buscarUsuario():<Load />}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: Dimensions.get('window').width-40,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    marginLeft:20,
    backgroundColor: tema.background,
    color: tema.active,
    borderColor: tema.primary,
  },
  input_button: {
    width: Dimensions.get('window').width-80,
    marginLeft:40,
    marginTop:20,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
    backgroundColor: tema.primary,
    borderColor: tema.primary,

  },
});

export default RecuperarPass;
