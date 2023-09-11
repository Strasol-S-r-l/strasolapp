import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import api from '../enviroments/api.json'


var navigation_:any;
const Mapa = ({navigation}:any) => {
    navigation_ = navigation;
    const [data, setData] = useState(null);

    useEffect(() => { 
        //navigation_.setOptions({headerShown:false});
        const fetchData = async () => {
            try {
  
              const suser:any = await AsyncStorage.getItem("usuario");
              if(!suser || suser==null){
                  navigation_.replace("Login");
                  return;
              } 
  
              const usuario = JSON.parse(suser);
              
              const response = await fetch(api.url+'/app', 
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json',},
                  body: JSON.stringify({key:api.key, type:'getSucursales'}),                                       
              });
              const data = await response.json();
              setData(data.data);
            } catch (error) {
              return {estado:"error", error};
            }
          }
          fetchData();
    }, []);

    const pintarSucursales=()=>{
        if(data){
            return Object.values(data).map((sucursal:any)=>{
                return <Marker
                    key={sucursal.ID}
                    coordinate={{ latitude: parseFloat(sucursal.LATITUD), longitude: parseFloat(sucursal.LONGITUD) }}
                    title={sucursal.DESCRIPCION}
                    description={sucursal.DIRECCION}
                />
            })
        }
        return null;
    };

    return (
        <View>
            <MapView 
                style={{width:Dimensions.get('screen').width, height:Dimensions.get('screen').height}}
                initialRegion={{
                    latitude: -17.1214164,
                    longitude: -62.8460487,
                    latitudeDelta: 15,
                    longitudeDelta: 14,
                }}>
                    {
                        pintarSucursales()
                    }
                </MapView>
        </View>
    )
};

export default Mapa;