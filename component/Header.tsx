import React, { useEffect, useState } from 'react';
import { StyleSheet, View,Text} from 'react-native';

interface HeaderProps{
    children: React.ReactNode
}

const Header : React.FC<HeaderProps> = ({title,children}) => {
    if(title === 'none' ){
        return <View style={styles.containerHeaderNone}>
          </View>
    }else{
        return <View style={styles.contentHeader}>
            {children}
        </View>
    }
    

};

const styles = StyleSheet.create({
    containerHeaderNone: {
        backgroundColor:'rgb(255,255,255)', 
        top:0,
        height:40,
        width:'100%'
    },
    contentHeader: {
        backgroundColor:'rgb(255,255,255)',
        position:'relative',
        height:60,
        width:'100%',
        elevation:5,
        shadowColor:'#000',
        shadowOpacity: 0.7,
        shadowOffset:{width:5,height:5},
        shadowRadius:4,
    },
    titulo:{
        color:'white',
        textAlign:'center',
        fontSize:25
    }
})
export default Header;