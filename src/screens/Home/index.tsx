import React from "react";
import {View, Text} from 'react-native';
import { styles } from "./styles";
import {Profile} from '../../components/Profile';
import {ButtonAdd} from '../../components/ButtonAdd';
import {CategorySelect} from '../../components/CategorySelect';
import {Appointment} from '../../components/Appointment';
import {ListDivider} from '../../components/ListDivider';
import {ListHeader} from '../../components/ListHeader';
import { useState } from "react";
import { FlatList } from "react-native";

export function Home(){
    const [category, setCategory] = useState("");
    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: "é hoje que vamos chegar no chellenge"
        }
    ]

    function handleCategorySelect(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    return (
        <View>
            <View style={styles.header}> 
                <Profile />
                <ButtonAdd />
            </View>

            <CategorySelect 
                categorySelected={category}
                handleCategorySelect={handleCategorySelect}
            />

            <View style={styles.content}>
                <ListHeader title="Partidas agendadas" subtitle="Total 6"/>

                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <ListDivider/>}
                    renderItem={({item}) => (
                        <Appointment 
                            data={item}
                        />
                    )}
                    style={styles.matches}
                />
            </View>
        </View>
    )
}