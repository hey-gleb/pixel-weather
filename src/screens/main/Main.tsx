import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import CityName from '../../components/cityName/CityName';
import CurrentWeather from '../../components/currentWeather/CurrentWeather';

import getWeather from '../../api/getWeather';

const Main: React.FC = () => {
    const [currentWeather, setCurrentWeather] = useState<number>();

    useEffect(() => {
        getWeather().then((response) => {
            console.log(response);
            const curDegrees = Math.round(response.current_weather.temperature);
            setCurrentWeather(curDegrees);
        });
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1D2B64', '#F8CDDA']}
                style={styles.background}
            />
            <StatusBar style="auto" />

            <View style={styles.currentWeather}>
                <CityName cityName={'Katowice'} />
                <CurrentWeather
                    curWeather={{
                        degrees: currentWeather,
                    }}
                />
            </View>
            <Image style={styles.image} source={require('./images/city.png')} />
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
    currentWeather: {
        paddingBottom: 100,
    },
    image: {
        width: 370,
        height: 240,
        flexShrink: 0,
    },
});

export default Main;
