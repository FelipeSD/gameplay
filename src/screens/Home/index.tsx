import React, {useCallback} from "react";
import {View} from 'react-native';
import { styles } from "./styles";
import {Profile} from '../../components/Profile';
import {ButtonAdd} from '../../components/ButtonAdd';
import {CategorySelect} from '../../components/CategorySelect';
import {Background} from '../../components/Background';
import {Appointment, AppointmentProps} from '../../components/Appointment';
import {ListDivider} from '../../components/ListDivider';
import {ListHeader} from '../../components/ListHeader';
import {Load} from '../../components/Load';
import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../config/database";

export function Home(){
    const [category, setCategory] = useState("");
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigarion = useNavigation();

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps){
        navigarion.navigate('Details', {guildSelected});
    }

    function handleAppointmentCreate(){
        navigarion.navigate('AppointmentCreate');
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        }else{
            setAppointments(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();

    }, [category]))

    return (
        <Background>
            <View style={styles.header}> 
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect 
                categorySelected={category}
                handleCategorySelect={handleCategorySelect}
            />

            
            
            {
                loading
                    ? <Load />
                    : <>
                        <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`}/>
                        <FlatList
                            data={appointments}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => <ListDivider/>}
                            contentContainerStyle={{paddingBottom: 69}}
                            renderItem={({item}) => (
                                <Appointment
                                    onPress={() => handleAppointmentDetails(item)}
                                    data={item}
                                />
                            )}
                            style={styles.matches}
                        />
                    </>
            }
        </Background>
    )
}