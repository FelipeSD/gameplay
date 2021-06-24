import React from 'react';
import {useFonts} from 'expo-font';
import {Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter';
import {Rajdhani_500Medium, Rajdhani_700Bold} from '@expo-google-fonts/rajdhani';
import { StatusBar, LogBox} from 'react-native';
import AppLoading from 'expo-app-loading';
import {Background} from './src/components/Background';
import {Routes} from './src/routes';
import {AuthProvider} from './src/hooks/auth';

export default function App() {
  
  // carregamento de fontes
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium, 
    Rajdhani_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading /> // segura a tela de splash enquanto não carrega o app
  }

  return (
    <Background>
      <StatusBar 
          barStyle='light-content'
          backgroundColor="transparent"
          translucent
      />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Background>
  );
}
