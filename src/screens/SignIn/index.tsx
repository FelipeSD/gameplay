import React from 'react';
import { 
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';
import {styles} from './styles';
import IllustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';
import {Background} from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const navigation = useNavigation();

  function handleSignIn(){
    navigation.navigate("Home");  
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image 
          source={IllustrationImg} 
          style={styles.image}
          resizeMode={'stretch'}
        />

        <View style={styles.content}>

          <Text style={styles.title}>
            Conecte-se  {`\n`}
            e Organize suas {`\n`}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>

          <ButtonIcon 
            onPress={handleSignIn}
            title="Entrar com discord" />
        </View>
      </View>
    
    </Background>
  );
}
