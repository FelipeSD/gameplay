import React from 'react';
import { View, ImageBackground, Text, FlatList } from 'react-native';

import {Background} from '../../components/Background';
import {Header} from '../../components/Header';
import {ListHeader} from '../../components/ListHeader';
import {Member} from '../../components/Member';
import {ButtonIcon} from '../../components/ButtonIcon';
import {ListDivider} from '../../components/ListDivider';

import {BorderlessButton} from 'react-native-gesture-handler'
import {Fontisto} from '@expo/vector-icons';
import BannerPng from '../../assets/banner.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export const Details: React.FC = () => {
  const members = [
    {
      id: '1',
      username: 'Felipe',
      avatar_url: 'https://github.com/FelipeSD.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Felipe',
      avatar_url: 'https://github.com/FelipeSD.png',
      status: 'offline'
    }
  ]
  return <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        style={styles.banner}
        source={BannerPng}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            Lendários
          </Text>

          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder
          </Text>
        </View>
      </ImageBackground>
      <ListHeader
        title="Jogadores"
        subtitle="Total 3"
      />

      <FlatList 
        data={members}
        keyExtractor={item => item.id}
        renderItem={({item})=> (
          <Member data={item} />
        )}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.members}
      />

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>

    </Background>;
}
