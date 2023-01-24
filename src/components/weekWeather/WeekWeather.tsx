import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import DayWeather from '../dayWeather/DayWeather';

import { WeekDays } from '../../types/days';

interface DayWeatherConfig {
    dayName: WeekDays;
    degrees: number;
}

const DAYS_WEATHER_RENDER_LIMIT = 3;

interface Props {
    style?: ViewStyle;
    daysWeatherConfigs?: DayWeatherConfig[];
}

const WeekWeather: React.FC<Props> = (props) => {
    const { style = {}, daysWeatherConfigs = [] } = props;

    const weekDaysWeather = React.useMemo(() => {
        return daysWeatherConfigs
            .splice(0, DAYS_WEATHER_RENDER_LIMIT)
            .map((config: DayWeatherConfig, index: number) => {
                return (
                    <DayWeather
                        key={index}
                        style={styles.dayWeather}
                        weekDay={config.dayName}
                        degrees={config.degrees}
                    />
                );
            });
    }, []);

    return <View style={[styles.container, style]}>{weekDaysWeather}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: '#272536',
        paddingLeft: 20,
        paddingRight: 20,

        // TODO move to the parent component
        marginTop: -1,
    },
    dayWeather: {
        marginBottom: 15,
    },
});

export default WeekWeather;
