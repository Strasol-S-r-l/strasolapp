import React, { useEffect, useMemo, useRef, useState } from 'react';
import {  View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';
import Load from './Load';

const Publicidad = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(false);

  useEffect(() => {

    const init= async()=>{
      const response = await fetch(api.url + '/app',
      {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ key: api.key, type: 'getPublicidad'}),
      });
      const obj = await response.json();
      

      if (obj.estado === "error") {
          return obj;
      }

      let array = Object.values(obj.data);
      console.log(array)
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      
      
      setState(array);
    };
    init();
    
  }, []);

  const paintPublicidad=()=>{
    if(!state) return <View style={{display:'flex', justifyContent:'center'}}><Load /></View>
      return state.map((publi)=>{
        return <TouchableOpacity key={publi.ID} style={{width: 400,height: 170,}} onPress={()=>{
          navigation.navigate('Web', {url: publi.URL});
        }}>
          <Image style={{flex: 1,width: "100%",height: "100%",resizeMode: 'stretch'}}
                source={{ uri: api.url + '/produccion/' + publi.ID+"?fecha="+new Date().getTime() }} 
            />
        </TouchableOpacity>
      });
  };

  return (
    <View style={{ width: "100%", height: "100%"}}>
      <ScrollView horizontal={true} style={{width:"100%", display:'flex', flexDirection:'row', flexWrap:'wrap',}}>
        <View style={{display:'flex', flexDirection:'row'}}>
        {paintPublicidad()}
        </View>
      </ScrollView>
    </View>
  )

};

export default Publicidad;