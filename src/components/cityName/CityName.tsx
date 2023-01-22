import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface Props {
    styles?: StyleSheet;
    cityName: string;
}

const CityName: React.FC<Props> = (props) => {
    const { styles: propsStyles, cityName } = props;
    return (
        <View style={[styles.container]}>
            <Text style={styles.cityName}>{cityName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
    },
    cityName: {
        fontSize: 20,
        lineHeight: 24,
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'bottom',
    },
});

export default CityName;
