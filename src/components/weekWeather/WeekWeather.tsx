import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import DayWeather from '../dayWeather/DayWeather';

import { WeekDays } from '../../types/days';

export interface DayWeatherConfig {
    dayName: WeekDays;
    degrees: number;
}

interface Props {
    style?: ViewStyle;
    daysWeatherConfigs?: DayWeatherConfig[];
}

const WeekWeather: React.FC<Props> = (props) => {
    const { style = {}, daysWeatherConfigs = [] } = props;

    const weekDaysWeather = React.useMemo(() => {
        return daysWeatherConfigs.map(
            (config: DayWeatherConfig, index: number) => (
                <DayWeather
                    key={index}
                    style={styles.dayWeather}
                    weekDay={config.dayName}
                    degrees={config.degrees}
                />
            )
        );
    }, [daysWeatherConfigs]);

    return <View style={[styles.container, style]}>{weekDaysWeather}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: '#272536',
        paddingLeft: 20,
        paddingRight: 20,
    },
    dayWeather: {
        marginBottom: 15,
    },
});

export default WeekWeather;
