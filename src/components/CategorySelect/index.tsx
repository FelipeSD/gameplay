import React from "react";
import {ScrollView, Text} from 'react-native';
import { styles } from "./styles";
import {categories} from '../../utils/categories';
import {Category} from '../Category';

type Props = {
    categorySelected: string,
    handleCategorySelect: (categoryId: string) => void; 
    hasCheckBox?: boolean;
}
export function CategorySelect({
    categorySelected, 
    handleCategorySelect,
    hasCheckBox = false,
}: Props){
    return (
        <ScrollView
            horizontal
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                categories.map(category => (
                    <Category 
                        hasCheckBox={hasCheckBox}
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={()=> handleCategorySelect(category.id)}
                    />
                ))
            }
        </ScrollView>
    )
}