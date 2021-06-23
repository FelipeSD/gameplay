import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthRoutes} from './auth.routes';

export function Routes(){ // contexto de navegacao
    return(
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
}
