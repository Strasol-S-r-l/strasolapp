import React, { useEffect,useState } from 'react';
import { TouchableOpacity,StyleSheet,ScrollView, Text, View, ImageBackground ,Animated} from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import TextNotifier from './TextNotifier';
import BarFooter from './BarFooter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconComponent from './assets/icons/IconComponent';
import BarLeft from './BarLeft';

const data = [
    {title:"Inicio", action:"Cotizacion"},
    {title:"Mi perfil", action:"Perfil"},
    {title:"Video tutoriales", action:"Videos"},
    {title:"Reporte de Emisiones", action:"Test"}
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
                onPress={() => action(algo.action)}
                style={{margin:5, padding:5, borderRadius:5, height:55, backgroundColor:'#00000033', borderColor:'#000000', borderWidth:1, justifyContent:'center' }}
                >
            <Text style={{textAlign:"center", color:'#fff', textShadowColor:'#000', textShadowRadius:2, textShadowOffset:{height:4, width:0}, fontWeight:'bold'}}>{algo.title}</Text>
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
        <View style={{backgroundColor:'#000',width:"100%",height:"100%"}}>
            
            <IconComponent nameIcon='fondo_form' ></IconComponent>
                <ScrollView >
                    <View style={{height:40}}></View>
                    
                    {paintButtons()}
                    <TouchableOpacity
                        onPress={() => salir()}
                        style={{backgroundColor:'#000000', margin:5, padding:10, borderRadius:5 ,flexDirection:"row",justifyContent:"center",alignItems:"center"}}
                        >
                        <Text style={{textAlign:"center", color:"#F00", fontSize:25, fontWeight:'bold'}}>Logout</Text>
                        <IconComponent nameIcon="logoutIcon" ancho={24} alto={24} colors={{color_1:"#F00"}}></IconComponent>

                    </TouchableOpacity>
                </ScrollView>
                {/*<BarFooter/>*/}
                {/*<BarLeft titulo={"Menu"} />*/}

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