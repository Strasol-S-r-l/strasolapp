import React, { useEffect, useState }  from 'react';
import { SafeAreaView, Text, ScrollView, View, Image } from 'react-native';
import api from '../enviroments/api.json'

const send = {
    key:"lakey",
    type:"getCompanias" 
};

const pintar=(data:any)=>{
    return Object.values(data).map((compania:any)=>{
        return  <View key={compania.ID} style={{marginTop:20}}>
            <View style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                <Image 
                    style={{width:100, height:100}}
                    source={{uri: api.url+"/perfilCia/"+compania.NIT}}
                />
            </View>
             
            <Text>{compania.NIT}</Text>
            <Text>{compania.RAZON_SOCIAL}</Text>
        </View>
    });
};

var navigation_:any;
const Companias = ({navigation}:any) => {
    const [data, setData] = useState(null);

    useEffect(() => { 
        const fetchData = async () => {
          try {
            const response = await fetch(api.url+'/app', 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',},
                body: JSON.stringify(send),                                       
            });
            const data = await response.json();
            setData(data.data);
          } catch (error) {
            return {estado:"error", error};
          }
        }
        fetchData();
    }, []);


    navigation_ = navigation;
    return (
        <SafeAreaView>
            {data ? <Text style={{textAlign:"center", marginTop:10}}>Resultados: {Object.keys(data).length}</Text> : ""}
            <ScrollView>
                {data ? pintar(data) : <Text style={{textAlign:"center", marginTop:100}}>Cargando..</Text>}
            </ScrollView>
        </SafeAreaView>
    )
};

export default Companias;