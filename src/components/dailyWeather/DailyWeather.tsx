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

const DailyWeather: React.FC<Props> = (props) => {
    const { style = {}, daysWeatherConfigs = [] } = props;

    const dailyWeather = React.useMemo(() => {
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

    return <View style={[styles.container, style]}>{dailyWeather}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: '#272536',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
    },
    dayWeather: {
        flex: 1,
    },
});

export default DailyWeather;
