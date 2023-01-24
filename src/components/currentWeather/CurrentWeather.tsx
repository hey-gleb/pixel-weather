import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CurrentWeather {
    degrees?: number;
}

interface Props {
    curWeather: CurrentWeather;
}

const CurrentWeather: React.FC<Props> = (props) => {
    const { curWeather } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.degrees}>
                {curWeather.degrees}
                <Text style={styles.unit}>&#8451;</Text>
            </Text>
            <Text style={styles.description}>Sunny</Text>
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
        fontSize: 64,
        lineHeight: 77,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
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
