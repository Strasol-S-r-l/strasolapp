import React from 'react';
import Menu from './component/Menu'
import Usuarios from './component/Usuarios'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Companias from './component/Companias';
import Notificaciones from './component/Notificaciones';
import Home from './component/Home';
import Splash from './component/Splash';
import Login from './component/Login';
import Ppl from './component/Ppl';
import PerfilProducto from './component/PerfilProducto';
import Perfil from './component/Perfil';
import Mapa from './component/Mapa';
import Videos from './component/Videos';
import Siniestros from './component/Siniestros';
import SiniestrosAll from './component/SiniestroView';
import Automotor from './component/Automotor';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Usuarios" component={Usuarios} />
        <Stack.Screen name="Companias" component={Companias} />
        <Stack.Screen name="Notificaciones" component={Notificaciones} />
        <Stack.Screen name="Ppl" component={Ppl} />
        <Stack.Screen name="PerfilProducto" component={PerfilProducto} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Videos" component={Videos} />
        <Stack.Screen name="Siniestros" component={Siniestros} />
        <Stack.Screen name="Automotor" component={Automotor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;