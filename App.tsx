import React from 'react';
import Menu from './component/Menu'
import Usuarios from './component/Usuarios'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Companias from './component/Companias';
import Notificaciones from './component/Notificaciones';
import Home from './component/Home';
import Splash from './component/Splash';
import Login from './component/Login';
import Ppl from './component/Ppl';
import PerfilProducto from './component/PerfilProducto';
import Perfil from './component/Perfil';
import Videos from './component/Videos';
import Cotizacion from './component/Cotizacion';
import Automotor from './component/Automotor';
import Emision from './component/Emision';
import Test from './component/Test';
import Select from './component/Select';
import Animation from './component/Animation';
import Productos from './component/Productos';
import RecCamera from './component/RecCamera';

import FotoCarnet from './component/FotoCarnet';
import FotoVehiculo from './component/RecCamera';
import CamaraDoc from './component/CamaraDoc';
import CambiarContrasena from './component/CambiarContrasena';
import Agreguement from './component/Agreguement';
import RecuperarPass from './component/RecuperarPass';
import Vimeo_ from './component/Vimeo_';
import Emitiendo from './component/Emitiendo';
import Web from './component/Web';
import Registro from './component/Registro';
import SlipMadre from './component/SlipMadre';


const Stack = createNativeStackNavigator();

function App(): JSX.Element {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Companias" component={Companias} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="PerfilProducto" component={PerfilProducto} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Ppl" component={Ppl} />
        <Stack.Screen name="Videos" component={Videos} />
        <Stack.Screen name="Cotizacion" component={Cotizacion} />
        <Stack.Screen name="Automotor" component={Automotor} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Emision" component={Emision} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Animation" component={Animation} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="Productos" component={Productos} />
        <Stack.Screen name="RecCamera" component={RecCamera} />
        <Stack.Screen name="CamaraDoc" component={CamaraDoc} />
        <Stack.Screen name="FotoVehiculo" component={FotoVehiculo} />
        <Stack.Screen name="FotoCarnet" component={FotoCarnet} />
        <Stack.Screen name="CambiarContrasena" component={CambiarContrasena} />
        <Stack.Screen name="Agreguement" component={Agreguement} />
        <Stack.Screen name="RecuperarPass" component={RecuperarPass} />
        <Stack.Screen name="Vimeo_" component={Vimeo_} />
        <Stack.Screen name="Emitiendo" component={Emitiendo} />
        <Stack.Screen name="Web" component={Web} />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="SlipMadre" component={SlipMadre} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;