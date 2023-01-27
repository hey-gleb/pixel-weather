import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import CityName from '../../components/cityName/CityName';
import WeekWeather, {
    DayWeatherConfig,
} from '../../components/weekWeather/WeekWeather';
import CurrentWeather from '../../components/currentWeather/CurrentWeather';
import MainLayout from '../../layouts/mainLayout/MainLayout';

import getWeather from '../../api/getWeather';
import { getDayOfWeek } from '../../utils/date';

const NIGHT_STARTING_HOURS = 20;
const NEXT_DAYS_WEATHER_LIMIT = 3;

const bgStyles: Record<string, string[]> = {
    day: ['#2976B8', '#FFFDE4'],
    night: ['#1D2B64', '#F8CDDA'],
};

const Main: React.FC = () => {
    const [currentWeather, setCurrentWeather] = useState<number>();
    const [daysWeather, setDaysWeather] = useState<DayWeatherConfig[]>([]);

    const [bgColor, setBgColor] = useState<string[]>([]);

    const updateBgStyle = useCallback(() => {
        const curHours = new Date().getHours();
        setBgColor(
            curHours >= NIGHT_STARTING_HOURS ? bgStyles.night : bgStyles.day
        );
    }, []);

    useEffect(() => updateBgStyle(), []);

    useEffect(() => {
        // TODO rework dates handling
        const curDate = new Date();
        const startDate = new Date();
        const endDate = new Date();
        startDate.setDate(curDate.getDate() + 1);
        endDate.setDate(curDate.getDate() + NEXT_DAYS_WEATHER_LIMIT);
        getWeather({
            latitude: 59.26,
            longitude: 19.03,
            currentWeather: true,
            startDate: startDate.toJSON().slice(0, 10),
            endDate: endDate.toJSON().slice(0, 10),
            // TODO add min degrees
            daily: 'temperature_2m_max',
            timezone: 'GMT',
        }).then((response) => {
            const curDegrees = Math.round(response.current_weather.temperature);
            setCurrentWeather(curDegrees);
            const daysWeather = [...Array(NEXT_DAYS_WEATHER_LIMIT).keys()].map(
                (_, i) => {
                    curDate.setDate(curDate.getDate() + 1);
                    return {
                        dayName: getDayOfWeek(curDate),
                        degrees: Math.round(
                            response.daily.temperature_2m_max[i]
                        ),
                    };
                }
            );
            setDaysWeather(daysWeather);
        });
    }, []);

    return (
        <MainLayout bgColor={bgColor}>
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
                daysWeatherConfigs={daysWeather}
            />
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    currentWeather: {},
    image: {
        width: '100%',
        height: 240,
        flexShrink: 0,
    },
    weekWeather: {
        marginTop: -5,
    },
});

export default Main;
