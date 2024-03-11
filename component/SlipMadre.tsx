import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import api from '../enviroments/api.json'
import { useNavigation, useRoute } from '@react-navigation/native';


const SlipMadre = () => {
    const [state, setState] = useState({});
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, []);

    return (
        <SafeAreaView >
            <Text>{route.params+""}</Text>        
        </SafeAreaView>
    )
};

export default SlipMadre;
