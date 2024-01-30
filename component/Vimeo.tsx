import React, { useEffect, useRef, useState } from 'react';


import api from '../enviroments/api.json'
import Load from './Load';
import tema from '../enviroments/tema.json'
import { Vimeo } from 'react-native-vimeo-iframe';

var navigation_: any;
const Vimeo_ = ({ navigation }: any) => {
    navigation_ = navigation;
    const videoRef = useRef(null);

    useEffect(() => {
//navigation_.setOptions({ headerShown: false });
    }, []);

    return (
         <Vimeo 
            videoId={'907883693'}
            onReady={() => console.log('Video is ready')}
            onPlay={() => console.log('Video is playing')}
            onPlayProgress={(data:any) => console.log('Video progress data:', data)}
            onFinish={() => console.log('Video is finished')}
            loop={true}
            autoPlay={true}
            controls={false}
            speed={false}
            time={'0m0s'}
        />
    )
};

export default Vimeo_;