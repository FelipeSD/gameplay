import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthRoutes} from './app.routes';
import { useAuth } from '../hooks/auth';
import {SignIn} from '../screens/SignIn';

export function Routes(){ // contexto de navegacao
    const {user} = useAuth()
   
    return(
        <NavigationContainer>
            {user.id ? <AuthRoutes /> : <SignIn />}
        </NavigationContainer>
    )
}
