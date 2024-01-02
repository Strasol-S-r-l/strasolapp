import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import tema from '../enviroments/tema.json'

const Select = (navigation:any) => {
    const [buscar, setBuscar] = React.useState("");
    
    useEffect(() => { 
        navigation.navigation.setOptions({headerShown:false});
        
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity 
          key={item.key + Math.round} 
          style={styles.seleccionar}
          onPress={() => {
            navigation.route.params.func(item);
            navigation.navigation.goBack();
          }}>
          <View style={{width:"90%"}}>
            <Text style={{color: tema.active}}>{item.value}</Text>        
          </View>
        </TouchableOpacity>
    );

    const filteredAndSortedData = navigation.route.params.data
    .filter(a => a.value.toUpperCase().indexOf(buscar.toUpperCase()) > -1)
    .sort((a, b) => a.value > b.value ? 1 : -1);


    return (
        <View style={{width:"100%", height:"100%", backgroundColor:tema.background, paddingBottom:50}}>
            <View style={{alignItems:'center', marginTop:15}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setBuscar}
                    value={buscar}
                    placeholder='Buscar...'
                    placeholderTextColor={tema.opaque}
                    />
            </View>
            <View>
                <FlatList
                    data={filteredAndSortedData}
                    renderItem={renderItem}
                    keyExtractor={item => item.key + Math.random()}
                    />
            </View>
            
        </View>
    )
};

const styles = StyleSheet.create({
    subtitle:{
        color:tema.primary, 
        textAlign:'center', 
        marginTop:10, 
        fontSize:15
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 5,
        width:"90%",
        borderRadius:5,
        color:tema.active,
        borderColor:tema.primary,
        fontSize:11
        
      },
      seleccionar:{
        borderWidth:1, 
        borderColor:tema.primary,
        margin:5,
        padding:15,
        borderRadius:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:"90%",
        marginLeft:"5%",
    }
});

export default Select;