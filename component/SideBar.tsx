import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Modal,Button, Slider, Text} from 'react-native';

interface SideProps{
    visible: boolean,
    children: React.ReactNode
}

const SideBar: React.FC<SideProps> = ({children}) => {
    return <View style={styles.container}>
            {children}
            <Text style={{color:'white'}}>Perfil</Text>
            <Text style={{color:'white'}}>Videos</Text>
            <Text style={{color:'white'}}>Cerrar</Text>
        </View>
};

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        flex:1,
        top:0,
        left:0,
        bottom:0,
        height:100,
        width:200,
        backgroundColor:'red'   
    }
})
export default SideBar;