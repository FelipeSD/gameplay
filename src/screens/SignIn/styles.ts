import { theme } from './../../global/styles/theme';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 360
    },
    title: {
        fontFamily: theme.fonts.title700,
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 40,
        marginBottom: 16,
        lineHeight: 40
    },
    subtitle: {
        fontFamily: theme.fonts.title500,
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 64,
        lineHeight: 25
    },
    content: {
        marginTop: -80,
        paddingHorizontal: 50
    }
});