import React, { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import IconComponent from './assets/icons/IconComponent';
import BarLeft from './BarLeft';

const FotoCarnet = () => {
    return (<View style={{ position: 'absolute', width: "100%", height: Dimensions.get('window').height, backgroundColor: "rgba(68,125,209,1)" }}>
        <SafeAreaView style={{ position: "relative", height: "100%" }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            <View style={{ display: "flex", flexDirection: "row", width: "70%", height: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%" }}>
                    <TouchableOpacity style={{ backgroundColor: "#247BCC", flex: 0.7, width: "80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Anverso</Text>
                    </TouchableOpacity>
                    <Image
                        style={{
                            width: "50%",
                            height: "90%",
                            resizeMode: 'stretch'
                        }}
                        source={require('./../images/carnet_anverso.png')}
                    />
                </View>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "50%" }}>
                    <TouchableOpacity style={{ backgroundColor: "#247BCC", flex: 0.7, width: "80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Reverso</Text>
                    </TouchableOpacity>
                    <Image
                        style={{
                            width: "50%",
                            height: "90%",
                            resizeMode: 'stretch'
                        }}
                        source={require('./../images/carnet_reverso.png')}
                    />
                </View>
            </View>
        </SafeAreaView>
        <BarLeft titulo={"Fotografias de Identidad"}/>
    </View>
    )

};
export default FotoCarnet;