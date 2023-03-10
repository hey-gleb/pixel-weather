import React from 'react';
import { StyleSheet, Text, View, ViewStyle, Image } from 'react-native';

import { WeekDays } from '../../types/days';

export interface Props {
    style?: ViewStyle;
    weekDay: WeekDays;
    degrees: number;
}

const DayWeather: React.FC<Props> = (props) => {
    const { style = {}, weekDay, degrees } = props;

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.dayName}>{weekDay}</Text>
            <View style={styles.details}>
                <Text style={styles.degrees}>{degrees}&#8451;</Text>
                <Image
                    style={styles.icon}
                    // TODO: replace with svg
                    source={require('./images/sun-icon.png')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        maxHeight: 65,
        width: '100%',
        borderStyle: 'solid',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayName: {
        color: '#fff',
        fontSize: 18,
        lineHeight: 22,
        width: '100%',
        flex: 4,
    },
    details: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    degrees: {
        color: '#fff',
        fontSize: 18,
        lineHeight: 22,
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 15,
    },
});

export default DayWeather;
