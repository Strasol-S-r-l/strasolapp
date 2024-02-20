import React, { useEffect, useRef, useState } from 'react';
import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'
import { Vimeo } from 'react-native-vimeo-iframe';

var navigation_: any;
const Vimeo_ = ({ route, navigation }: any) => {
    navigation_ = navigation;
    const videoRef = useRef(null);
    const [state, setState] = useState({})

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
            
    }, []);

    
    return (
        
         <Vimeo 
            style={{backgroundColor:'#000'}}
            videoId={route.params.videoId}
            
            
        />
    )
};

export default Vimeo_;