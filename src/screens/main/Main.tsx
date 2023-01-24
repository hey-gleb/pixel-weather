import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

import CityName from '../../components/cityName/CityName';
import CurrentWeather from '../../components/currentWeather/CurrentWeather';

import getWeather from '../../api/getWeather';
import WeekWeather from '../../components/weekWeather/WeekWeather';

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
                // Night
                // colors={['#1D2B64', '#F8CDDA']}
                // Day
                colors={['#2976B8', '#FFFDE4']}
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
            <WeekWeather
                style={styles.weekWeather}
                daysWeatherConfigs={[
                    {
                        dayName: 'Monday',
                        degrees: 9,
                    },
                    {
                        dayName: 'Tuesday',
                        degrees: 13,
                    },
                    {
                        dayName: 'Wednesday',
                        degrees: 15,
                    },
                ]}
            />
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
        width: '100%',
        height: 240,
        flexShrink: 0,
    },
    weekWeather: {
        marginTop: -1,
    },
});

export default Main;
