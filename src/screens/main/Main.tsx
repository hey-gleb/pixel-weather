import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import getWeather from '../../api/getWeather';

interface Props {}

const Main: React.FC<Props> = (props) => {
    const [currentWeather, setCurrentWeather] = useState();

    useEffect(() => {
        getWeather().then((response) => {
            console.log(response);
            setCurrentWeather(response.current_weather.temperature);
        });
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1D2B64', '#F8CDDA']}
                style={styles.background}
            />
            <Text>Current weather</Text>
            <Text>{currentWeather}</Text>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: -1,
    },
});

export default Main;
