import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Image, ScrollView, SafeAreaView, Text, View, StyleSheet, Dimensions, ImageBackground, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../enviroments/api.json'
import IconComponent from './assets/icons/IconComponent';
import Load from './Load';
import tema from '../enviroments/tema.json'

var navigation_: any;
let control = false;
const Videos = ({ navigation }: any) => {
    const videoRef = useRef(null);
    navigation_ = navigation;
    const [listVideo, setListVideo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation_.setOptions({ headerShown: false });
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
                const response = await fetch('https://api.vimeo.com/channels/'+api.vimeo.channel+'/videos',
                    {
                        method: 'GET',
                        headers: { 'Authorization': 'bearer '+api.vimeo.key, },
                    });
                const data = await response.json();
                console.log(data)
                
                if (data.data) {
                    setListVideo(data.data);
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

    const openVideo = (videoId:any) => {
       navigation_.navigate("Vimeo_", {videoId})
    };

    const pintarVideos = () => {
        return listVideo.map((video, index) => (
            
            <TouchableOpacity key={`key_video_${index}`} onPress={() =>{
                openVideo(video.uri.split("/")[2])
            }}>
              <View style={styles.videoContainer}>
              <Image style={styles.thumbnail} source={{ uri: video.pictures.base_link }} />
                <View style={styles.videoDetails}>
                  <Text style={styles.videoTitle}>{video.name}</Text>
                  <Text style={styles.videoDescription}>{video.description.length>20?video.description.substring(0,19):video.description}</Text>
                  <Text style={styles.videoDescription}>{new Date(video.created_time).toLocaleString()}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ));
    };
    

    return (
        <View style={{ height: Dimensions.get('screen').height }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            {
                loading ?
                    <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}><Load></Load></View>
                    :
                    <View style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }}>
                        <View>
                            <Text style={styles.titulo}>Videos</Text>
                        </View>
                        <ScrollView style={{ flex: 1 }}>
                            {pintarVideos()}
                            <View style={{height:100}}></View>
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
        fontSize: 20,
        color:tema.text,
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
        justifyContent: "center",
      },
      videoDescription: {
        color: tema.text,
      },
});
export default Videos;