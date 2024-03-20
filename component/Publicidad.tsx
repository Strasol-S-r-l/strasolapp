import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import tema from '../enviroments/tema.json'
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';
import Load from './Load';

const Publicidad = () => {
  const navigation = useNavigation();
  const [state, setState] = useState([]);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const flatListRef = useRef(null);
  let move = 0;

  useEffect(() => {

    const init = async () => {
      const response = await fetch(api.url + '/app',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ key: api.key, type: 'getPublicidad' }),
        });
      const obj = await response.json();
      console.log(obj)

      if (obj.estado === "error") {
        obj.data = [];
      }

      let array = Object.values(obj.data);

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      let main_pub = {
        ID: '1_1',
        URL: './../images/foot.png'
      };
      array.unshift(main_pub);
      setState(array);
    };
    init();
  }, []);
  useEffect(() => {
    if (state.length > 0) {
      const timer = setInterval(() => {
        if (state) {
          move = (move + 1) % state.length;
          flatListRef.current.scrollToIndex({ index: move })
        }
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [state]);

  const paintPublicidad = () => {
    if (!state) return <View style={{ display: 'flex', justifyContent: 'center' }}><Load /></View>
    return state.map((publi) => {
      return <TouchableOpacity key={publi.ID} style={{ width: 400, height: 170, }} onPress={() => {
        navigation.navigate('Web', { url: publi.URL });
      }}>
        <Image style={{ flex: 1, width: "100%", height: "100%", resizeMode: 'stretch' }}
          source={{ uri: api.url + '/produccion/' + publi.ID + "?fecha=" + new Date().getTime() }}
        />
      </TouchableOpacity>
    });
  };


  const pintarPublicidad = (item) => {
    if (!state) return <View style={{ display: 'flex', justifyContent: 'center' }}><Load /></View>
    if (item.ID == '1_1') {
      return <TouchableOpacity key={item.ID} style={{ width: screenWidth }} >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: 'stretch'
          }}
          source={require("./../images/foot.png")}
        />
      </TouchableOpacity>
    }
    return <TouchableOpacity key={item.ID} style={{ width: screenWidth }} onPress={() => {
      navigation.navigate('Web', { url: item.URL });
    }}>
      <Image style={{ flex: 1, resizeMode: 'stretch' }}
        source={{ uri: api.url + '/produccion/' + item.ID + "?fecha=" + new Date().getTime() }}
      />
    </TouchableOpacity>
  };

  return (
    /*<View style={{ width: "100%", height: "100%"}}>
      <ScrollView horizontal={true} style={{width:"100%", display:'flex', flexDirection:'row', flexWrap:'wrap',}}>
        <View style={{display:'flex', flexDirection:'row'}}>
        {paintPublicidad()}
        </View>
      </ScrollView>
    </View>*/

    <View style={{ flex: 1, position: 'relative' }}>
      <Image
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: 'stretch',
          position: 'absolute'

        }}
        source={require('./../images/blanco_degradado.png')}
      />
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={state}
        renderItem={({ item }) => pintarPublicidad(item)}
        keyExtractor={item => item.ID + '_item_publi'}
      />
    </View>
  )

};

export default Publicidad;