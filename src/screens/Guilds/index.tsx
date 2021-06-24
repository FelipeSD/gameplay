import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { GuildProps } from '../../components/Guild';
import { Guild } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void
}

export const Guilds = ({handleGuildSelect} : Props) => {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true
        }
    ]
    return (
        <View style={styles.container}>
            <FlatList 
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Guild data={item} onPress={() => handleGuildSelect(item)} />
                )}
                contentContainerStyle={{paddingBottom: 68, paddingTop: 104}}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={()=><ListDivider isCentered/>}
                ItemSeparatorComponent={() => <ListDivider isCentered/>}
                style={styles.guilds}
            />
        </View>
    )
}
