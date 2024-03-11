import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import api from '../enviroments/api.json'
import { useNavigation } from '@react-navigation/native';


const SlipMadre = () => {
    const [state, setState] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    return (
        <SafeAreaView >
            
        </SafeAreaView>
    )
};

export default SlipMadre;
