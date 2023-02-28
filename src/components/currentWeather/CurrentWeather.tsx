import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { translateCodeWeather } from '../../utils/weather';

export interface CurrentWeather {
    degrees?: number;
    weatherCode?: number;
}

const DEFAULT_CURRENT_WEATHER: CurrentWeather = {
    degrees: 0,
    weatherCode: 0,
};

interface Props {
    style?: ViewStyle;
    curWeather?: CurrentWeather;
}

const CurrentWeather: React.FC<Props> = (props) => {
    const { curWeather = DEFAULT_CURRENT_WEATHER, style } = props;
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.degrees}>
                {curWeather.degrees}
                <Text style={styles.unit}>&#8451;</Text>
            </Text>
            <Text style={styles.description}>
                {translateCodeWeather(curWeather.weatherCode)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    degrees: {
        fontSize: 76,
        lineHeight: 85,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        marginBottom: 15,
    },
    unit: {
        fontSize: 38,
        lineHeight: 44,
    },
    description: {
        fontSize: 28,
        lineHeight: 34,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
    },
});

export default CurrentWeather;
