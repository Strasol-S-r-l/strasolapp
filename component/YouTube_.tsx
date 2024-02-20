import React, { useEffect, useState } from 'react';
import { View, } from 'react-native';
import api from '../enviroments/api.json'
import YouTube from 'react-native-youtube';

var navigation_: any;
const YouTube_ = ({ navigation }: any) => {
    navigation_ = navigation;
    const [state, setState] = useState({});

    useEffect(() => {
        console.log(navigation_)
        navigation_.setOptions({ headerShown: false });
    }, []);

  
    /*return <YouTube
        videoId={""} // The YouTube video ID
        apiKey={api.key_youtube}
        play // control playback of video with true/false
        fullscreen // control whether the video should play in fullscreen or inline
        loop // control whether the video should loop when ended
        onReady={e => setState({ isReady: true })}
        onError={e => setState({ error: e.error })}
        style={{ alignSelf: 'stretch', height: 300 }}
    />*/
    
};
export default YouTube_;
