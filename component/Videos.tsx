import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, ScrollView, SafeAreaView, Text, View, StyleSheet, Dimensions, ImageBackground, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';
import Load from './Load';
import tema from '../enviroments/tema.json'
import { YouTubeStandaloneAndroid } from 'react-native-youtube';

var navigation_: any;
let control = false;
const Perfil = ({ navigation }: any) => {
    navigation_ = navigation;
    const [listVideo, setListVideo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
        let keyYoutube = "AIzaSyCD5v1yDAHFP-eq3vk-bXri9vX3x7AI49A";
        let keyListVideos = "PLyyYs_E5nqBudxpORWcnE5W6ZTmVsYRrg"
        const fetchData = async () => {
            control = false;
            try {

                const suser: any = await AsyncStorage.getItem("usuario");
                if (!suser || suser == null) {
                    navigation_.replace("Login");
                    return;
                }

                const usuario = JSON.parse(suser);
                // fetch("https://www.googleapis.com/youtube/v3/playlists?key="+keyYoutube+"&channelId=UCYaEaleKtTmUGsGtwoX-kWA")
                // fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key="+keyYoutube+"&playlistId="+id_playlist)
                const response = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=' + keyYoutube + "&playlistId=" + keyListVideos,
                    {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/text', },
                    });
                const data = await response.json();
                if (data) {
                    let listVideo = [];
                    for (let j = 0; j < data.items.length; j++) {
                        let item = await videos(data.items[j].snippet.resourceId.videoId);
                        listVideo.push(item);
                    }
                    setListVideo(listVideo);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                return { estado: "error", error };
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const openVideo = (link:any) => {
        return  YouTubeStandaloneAndroid.playVideo({
            apiKey: 'AIzaSyCD5v1yDAHFP-eq3vk-bXri9vX3x7AI49A', // Your YouTube Developer API Key
            videoId: link, // YouTube video ID
            autoplay: true, // Autoplay the video
            startTime: 120, // Starting point of video (in seconds)
          })
            .then(() => console.log('Standalone Player Exited'))
            .catch(errorMessage => console.error(errorMessage));
        
        /*Linking.openURL("https://www.youtube.com/watch?v="+link).catch((err) =>
            console.error('Error al abrir el enlace:', err)
        );*/
    };

    const pintarVideos = () => {
        return listVideo.map((video, index) => (
            <TouchableOpacity key={`key_video_${index}`} onPress={() => openVideo(video.items[0].id)}>
              <View style={styles.videoContainer}>
                <Image style={styles.thumbnail} source={{ uri: video.items[0]?.snippet?.thumbnails?.high?.url }} />
                <View style={styles.videoDetails}>
                  <Text style={styles.videoTitle}>{video.items[0]?.snippet?.localized?.title}</Text>
                  <Text style={styles.videoDescription}>{video.items[0]?.snippet?.localized?.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ));
    };
    const videos = async (id:any) => {
        let keyYoutube = "AIzaSyCD5v1yDAHFP-eq3vk-bXri9vX3x7AI49A";
        return await new Promise(resolve => {
            fetch("https://youtube.googleapis.com/youtube/v3/videos?key=" + keyYoutube + "&id=" + id + "&part=snippet,contentDetails,statistics,status")
                .then(res => res.json()).then(obj => {
                    resolve(obj);
                });
        });
    };

    return (
        <View style={{ height: Dimensions.get('screen').height }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            {
                loading ?
                    <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}><Load></Load></View>
                    :
                    <View style={{ width: "90%", height: "100%", marginLeft: "5%", marginRight: "5%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <ScrollView style={{ flex: 1 }}>
                            {pintarVideos()}
                        </ScrollView>
                    </View>
            }
        </View>
    )
};




const styles = StyleSheet.create({
    titulo: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold'
    },
    texto: {
        color: "#fff"
    },
    dato: {
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15
    },
    plan_pago: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        borderColor: '#fff',
        borderBottomWidth: 1
    },
    card: {
        marginTop: 40,
        backgroundColor: '#000000aa',
        padding: 10,
        paddingBottom: 30
    },
    line: {
        marginTop: 15,
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    lineText: {
        color: '#fff'
    },
    scrollView: {
        flex: 1,
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        backgroundColor: "rgba(0,0,0,0.5)",
      },
      videoContainer: {
        minHeight: 120,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        flexDirection: "row",
        padding: "2%",
      },
      thumbnail: {
        width: "38%",
        borderRadius: 10,
      },
      videoDetails: {
        flex: 1,
        marginLeft: "2%",
      },
      videoTitle: {
        color: tema.text,
        fontWeight: "bold",
        fontSize: 17,
        height: 30,
        justifyContent: "center",
      },
      videoDescription: {
        color: tema.text,
      },
});
export default Perfil;