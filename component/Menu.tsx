import React, { useEffect,useState } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView, Text, View, ImageBackground ,Animated} from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import TextNotifier from './TextNotifier';
import BarFooter from './BarFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
    "Automotor",
    "Usuarios",
    "Ppl",
    "Mapa",
    "Perfil",
    "Videos",
    "Siniestros"
];

const action=(algo:string)=>{
    navigation_.navigate(algo);
};

const salir=async()=>{
    try {
        await AsyncStorage.removeItem("usuario");
        navigation_.replace("Splash");
      } catch (error) {
        console.log(error);
      }
};


const paintButtons=()=>{
    return  data.map((algo:any, i:Int32)=>{
        return <TouchableOpacity
                key={i} 
                onPress={() => action(algo)}
                style={{margin:5, padding:5, borderRadius:5, height:55, backgroundColor:'#0000FF33', borderColor:'#0000ffaa', borderWidth:1, justifyContent:'center' }}
                >
            <Text style={{textAlign:"center", color:'#fff', textShadowColor:'#00f', textShadowRadius:2, textShadowOffset:{height:4, width:0}, fontWeight:'bold'}}>{algo}</Text>
        </TouchableOpacity>
    })
};

var navigation_:any;
const Menu = ({navigation}:any) => {
    navigation_ = navigation;

    useEffect(() => { 
        navigation_.setOptions({headerShown:false});
    }, []);
    const [refresh,setRefresh] = useState(false);
    const recargarPagina =()=>{
        setRefresh(!refresh);
    };

    return (
        <View style={{backgroundColor:'#000'}}>
            <ImageBackground
                source={require('../images/fondo.gif')}
                style={{height:'100%', width:'100%'}}>
                <ScrollView>
                    <View style={{height:40}}></View>
                    <TextNotifier obj={{text:'Bienvenido a la app de Universal Brokers, estamos para ayudarte en lo que necesites.'}} />
                    {paintButtons()}
                    <TouchableOpacity
                        onPress={() => salir()}
                        style={{backgroundColor:'#000000', margin:5, padding:5, borderRadius:5 }}
                        >
                        <Text style={{textAlign:"center", color:"#F00"}}>Salir</Text>
                    </TouchableOpacity>
                </ScrollView>
                <BarFooter/>
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    menuItem: {
        flex:1,
        display:'flex',
        justifyContent:'center'
    }
  });
  

export default Menu;