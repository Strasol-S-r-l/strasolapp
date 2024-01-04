import React, { PureComponent } from 'react';
import { Text, View ,Image, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import tema from '../enviroments/tema.json'
class ItemSelect extends PureComponent  {
  
  render(){
    const {data}:any = this.props;
    const ItemAction =(item):any=>{
      data?.navigation.route.params.func(item);
      data?.navigation.navigation.goBack();
    }
    return(
        <TouchableOpacity 
          key={data?.item.key+"_"+ Math.random} 
          style={{borderWidth:1, 
            borderColor:tema.primary,
            margin:5,
            padding:15,
            borderRadius:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:"90%",
            marginLeft:"5%"}}
          onPress={  ItemAction.bind(null, data?.item)
           /* ()=>{
              data?.navigation.route.params.func(data?.item);
              data?.navigation.navigation.goBack();
            }*/
          }>
          <View style={{width:"90%"}}>
            <Text style={{color: tema.active}}>{data?.item?.value}</Text>        
          </View>
        </TouchableOpacity>
    );
  }
    

};
export default ItemSelect;