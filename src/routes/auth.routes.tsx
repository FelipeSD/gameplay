import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Home} from '../screens/Home';
import { theme } from '../global/styles/theme';
import { Details } from '../screens/Details';
import { AppointmentCreate } from '../screens/AppointmentCreate';

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: theme.colors.secondary100
                }
            }}
        >
            
            <Screen 
                name="Home"
                component={Home}
            />
            <Screen 
                name="Details"
                component={Details}
            />
            <Screen 
                name="AppointmentCreate"
                component={AppointmentCreate}
            />
        </Navigator>
    )
}