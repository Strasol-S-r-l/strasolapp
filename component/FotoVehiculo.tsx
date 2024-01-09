import React, { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import IconComponent from './assets/icons/IconComponent';
import BarLeft from './BarLeft';

const FotoVehivulo = () => {


    return (<View style={{ position: 'absolute', width: "100%", height: Dimensions.get('window').height, backgroundColor: "rgba(68,125,209,1)" }}>
        <SafeAreaView style={{ position: "relative", height: "100%" }}>
            <IconComponent nameIcon='fondo_form' ></IconComponent>
            <View style={{ position: "relative", width: "100%", height: "80%" }}>
                <View style={{ ...StyleSheet.absoluteFillObject, overflow: 'hidden' }}>
                    <Image
                        style={{
                            width: "50%",
                            height: "90%",
                            resizeMode: 'stretch'
                        }}
                        source={require('./../images/vehiculo.png')}
                    />
                </View>
                <View style={{ flex: 1, width: "60%" ,flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{ backgroundColor: "#247BCC", flex: 0.7, width: "80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Fotografia Frontal</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{ backgroundColor: "#247BCC", flex: 0.7, width: "80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Fotografia Lateral Derecho</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}>
                        <TouchableOpacity style={{ backgroundColor: "#247BCC", flex: 0.7, width: "80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Fotografia Lateral IzquierdaEmitir Seguro</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1}}  >
                        <TouchableOpacity style={{ backgroundColor: "#247BCC", flex: 0.7, width: "80%", borderRadius: 10, justifyContent: 'center', alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Fotografia Trasera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        <BarLeft titulo={"Fotografias del Vehiculo"}/>
    </View>
    )

};
export default FotoVehivulo;