import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

import CityName from '../../atoms/cityName/CityName';
import DailyWeather, {
    DayWeatherConfig,
} from '../../components/dailyWeather/DailyWeather';
import CurrentWeather, {
    CurrentWeather as CurrentWeatherType,
} from '../../components/currentWeather/CurrentWeather';
import MainLayout from '../../layouts/mainLayout/MainLayout';

import getWeather from '../../api/getWeather';
import { getDayOfWeek } from '../../utils/date';

const NIGHT_STARTING_HOURS = 20;
const NEXT_DAYS_WEATHER_LIMIT = 3;
const DATE_FORMAT_TEMPLATE = 'YYYY-MM-DD';
const SUN_ICON_WIDTH = 100;
const SUN_ICON_HEIGHT = 100;

const bgStyles: Record<string, string[]> = {
    day: ['#2976B8', '#FFFDE4'],
    night: ['#1D2B64', '#F8CDDA'],
    rain: ['#3E4F5E', '#D7D2CC'],
    snow: ['#4B7186', '#E6DADA'],
    clouds: ['#4FA1DA', '#E4E5E6'],
};

const Main: React.FC = () => {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherType>();
    const [daysWeather, setDaysWeather] = useState<DayWeatherConfig[]>([]);

    const [bgColor, setBgColor] = useState<string[]>([]);

    const updateBgStyle = useCallback(() => {
        const curHours = new Date().getHours();
        setBgColor(
            // curHours >= NIGHT_STARTING_HOURS ? bgStyles.night : bgStyles.day
            bgStyles.day
        );
    }, []);

    const setupWeather = useCallback(() => {
        const curDate = dayjs();
        const startDate = curDate.add(1, 'day').format(DATE_FORMAT_TEMPLATE);
        const endDate = curDate
            .add(NEXT_DAYS_WEATHER_LIMIT, 'day')
            .format(DATE_FORMAT_TEMPLATE);
        getWeather({
            latitude: 59.26,
            longitude: 19.03,
            currentWeather: true,
            startDate,
            endDate,
            // TODO add min degrees
            daily: 'temperature_2m_max',
            timezone: 'GMT',
        }).then((response) => {
            console.log(response);
            const curDegrees = Math.round(response.current_weather.temperature);
            setCurrentWeather({
                degrees: curDegrees,
                weatherCode: response.current_weather.weathercode,
            });
            const daysWeather = Array.from(
                Array(NEXT_DAYS_WEATHER_LIMIT),
                (_, index) => index + 1
            ).map((_, i) => ({
                dayName: getDayOfWeek(curDate.date(curDate.date() + i + 1)),
                degrees: Math.round(response.daily.temperature_2m_max[i]),
            }));
            setDaysWeather(daysWeather);
        });
    }, []);

    const handleRefresh = useCallback(() => setupWeather(), []);

    useEffect(() => updateBgStyle(), []);

    useEffect(() => setupWeather(), []);

    return (
        <MainLayout bgColor={bgColor} onRefresh={handleRefresh}>
            <Image
                style={styles.sunImage}
                source={require('./images/sun.svg')}
            />
            <View style={styles.mainInfo}>
                <CityName styles={styles.cityName} cityName={'Katowice'} />
                <CurrentWeather
                    style={styles.currentWeather}
                    curWeather={currentWeather}
                />
            </View>
            <Image style={styles.image} source={require('./images/city.png')} />
            <DailyWeather
                style={styles.weekWeather}
                daysWeatherConfigs={daysWeather}
            />
        </MainLayout>
    );
};

const getSunPathCoordinate = (val: number) => {
    return -0.1667 * Math.pow(val, 2) + 2 * val;
};

const screenWidth = window.screen.width;
const currentHour = parseInt(dayjs().format('h').toString());
const xSlot = Math.round(screenWidth / 12);
const sunLeftPosition = xSlot * currentHour - SUN_ICON_WIDTH / 2;
// 400px is an offset from bottom border
// 100px is a place for the sun move
// TODO add calculation for offset and movable slot
const sunBottomPosition =
    Math.round((100 / 6) * getSunPathCoordinate(currentHour)) +
    450 -
    SUN_ICON_HEIGHT / 2;

const styles = StyleSheet.create({
    layout: {
        marginTop: 100,
    },
    cityName: {
        flex: 2,
        justifyContent: 'center',
    },
    currentWeather: {
        flex: 3,
        justifyContent: 'flex-start',
    },
    mainInfo: {
        flex: 2,
    },
    sunImage: {
        width: SUN_ICON_WIDTH,
        height: SUN_ICON_HEIGHT,
        position: 'absolute',
        bottom: sunBottomPosition,
        left: sunLeftPosition,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 240,
        flexShrink: 0,
    },
    weekWeather: {
        flex: 1,
        marginTop: -1,
    },
});

export default Main;
