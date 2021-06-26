import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, FlatList, Alert, Platform } from 'react-native';
import * as Linking from 'expo-linking';

import {Background} from '../../components/Background';
import {Header} from '../../components/Header';
import {ListHeader} from '../../components/ListHeader';
import {Load} from '../../components/Load';
import {Member, MemberProps} from '../../components/Member';
import {ButtonIcon} from '../../components/ButtonIcon';
import {ListDivider} from '../../components/ListDivider';

import {BorderlessButton} from 'react-native-gesture-handler'
import {Fontisto} from '@expo/vector-icons';
import BannerPng from '../../assets/banner.png';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Share } from 'react-native';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instance_invite: string;
  members: MemberProps[];
}

export const Details: React.FC = () => {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const {guildSelected} = route.params as Params;

  async function fetchGuildWidget(){
    try{
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      setLoading(false);
    }catch(e){
      Alert.alert("Verifique as configurações do servidor. Será que o Widget está habilitado?");
    }finally {
      setLoading(false);
    }
  }

  function handleShareInvitation(){
    const message = Platform.OS === 'ios' ?
    `Junte-se a ${guildSelected.guild.name}`
    : widget.instance_invite;

    Share.share({
      message,
      url: widget.instance_invite
    })
  }

  function handleOpenGuild(){
    Linking.openURL(widget.instance_invite);
  }

  useEffect(()=>{
    fetchGuildWidget()
  }, []);

  return <Background>
      <Header 
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton onPress={handleShareInvitation}>
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
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      {
        loading 
          ? <Load />
          : <>
              <ListHeader
                title="Jogadores"
                subtitle={`Total ${widget.members.length}`}
              />

              <FlatList 
                data={widget.members}
                keyExtractor={item => item.id}
                renderItem={({item})=> (
                  <Member data={item} />
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                style={styles.members}
              />
          </>
      }

      {
        guildSelected.guild.owner &&
        <View style={styles.footer}>
          <ButtonIcon onPress={handleOpenGuild} title="Entrar na partida" />
        </View>
      }

    </Background>;
}
