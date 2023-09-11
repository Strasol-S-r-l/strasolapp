import React, {useEffect, useRef} from 'react';
import { Alert, StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';


var navigation_:any;
const Splash = ({navigation}:any) => {
  navigation_ = navigation;
  const videoPlayer:any = useRef(null);

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  });

  const isLogued = async () => {
    try {
      const suser:any = await AsyncStorage.getItem("usuario");
      console.log("======"+suser);
      if(!suser || suser==null){
        navigation_.replace("Login");
        return;
      } 
      console.log(suser);
    } catch (error) {}
  }

  const onEnd=async()=>{

    try {
      navigation_.replace("Ppl");
    } catch (error) {
      
      console.log(error); 
    }

  }

  isLogued()

  return (
    <View style={styles.container}>
      
        <Video
          onEnd={onEnd}
          ref={videoPlayer}
          source={require('../videos/algo.mp4')}
          resizeMode="contain"
          style={styles.mediaPlayer}
          volume={10}

        />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});