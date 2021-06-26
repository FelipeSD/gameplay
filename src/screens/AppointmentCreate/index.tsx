import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import {RectButton} from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Background} from '../../components/Background';
import {ModalView} from '../../components/ModalView';
import {Header} from '../../components/Header';
import {GuildIcon} from '../../components/GuildIcon';
import {CategorySelect} from '../../components/CategorySelect';
import {SmallInput} from '../../components/SmallInput';
import {Button} from '../../components/Button';
import {Textarea} from '../../components/Textarea';
import {Guilds} from '../Guilds';
import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../config/database';
import { useNavigation } from '@react-navigation/core';
import { Alert } from 'react-native';

export const AppointmentCreate = () => {
  const [category, setCategory] = useState("");
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleOpenGuilds(){
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds(){
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelected: GuildProps){
    setGuild(guildSelected)
    setOpenGuildsModal(false);
  }

  async function handleSave(){
    if(!guild) {Alert.alert("Selecione um servidor"); return;};
    if(!category) {Alert.alert("Selecione uma categoria"); return;};
    if(!day) {Alert.alert("Digite o dia"); return;};
    if(!month) {Alert.alert("Digite o mês"); return;};
    if(!hour) {Alert.alert("Digite o horário do agendamento"); return;};
    if(!minute) {Alert.alert("Digite os minutos"); return;};

    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description
    }

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header 
            title="Agendar partida"
          />

          <Text style={[
            styles.label, 
            {marginLeft: 24, marginTop: 36, marginBottom: 18}
          ]}>
            Categoria
          </Text>

          <CategorySelect 
            categorySelected={category}
            handleCategorySelect={handleCategorySelect}
            hasCheckBox 
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {
                  guild.icon 
                  ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                  : <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    { guild.name || 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather name="chevron-right" size={18} color={theme.colors.heading} />
              </View>
            </RectButton>
            
            <View style={styles.field}>
              <View>
                <Text style={[
                  styles.label, 
                  {marginBottom: 12}
                ]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>

              <View>
                <Text style={[
                  styles.label, 
                  {marginBottom: 12}
                ]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput maxLength={2} onChangeText={setMinute} />
                </View>
              </View>
            </View>
                
          </View>

          <View style={[styles.field, {marginBottom: 12}]}>
            <Text style={styles.label}>
              Descrição
            </Text>

            <Text style={styles.caracteresLimit}>
              Max 100 caracteres
            </Text>
          </View>

          <Textarea 
            multiline 
            maxLength={100} 
            numberOfLines={5} 
            autoCorrect={false}
            onChangeText={setDescription} />


          <View style={styles.footer}>
            <Button title="Agendar" onPress={handleSave} />
          </View>
        </ScrollView>
      </Background>


      <ModalView closeModal={handleCloseGuilds} visible={openGuildsModal}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>

    </KeyboardAvoidingView>
    
  )
}
