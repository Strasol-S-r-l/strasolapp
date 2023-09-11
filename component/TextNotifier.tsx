import React, { useState } from 'react';
import { Text, View, Dimensions } from 'react-native';

  const TextNotifier = (obj:any) => {
    const [data, setData] = useState({text:''});

    const mostrar=()=>{
        //console.log(data.text.length + ' - ' + obj.obj.text.length)
        if(data.text.length<=obj.obj.text.length){
            var text = obj.obj.text;

            text = text.substring(0,data.text.length+1)
            if(data.text.length<obj.obj.text.length) text+='|'


            setTimeout(() => {
                setData({...data, text})
            }, 180)
        }



        return <Text style={{color:obj.obj.color||'#fff', textAlign:'center', marginTop:15, fontWeight:'bold',}}>{data.text}</Text>        
    };

    return (
        <View style={{ height:100, width:Dimensions.get('screen').width}}>
            {mostrar()}           
        </View>
    )
};

export default TextNotifier;