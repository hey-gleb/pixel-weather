import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    children: React.ReactNode;
    bgColor?: string[];
}

const MainLayout: React.FC<Props> = (props) => {
    const { bgColor = [], children } = props;
    return (
        <View style={styles.container}>
            <LinearGradient colors={bgColor} style={styles.background} />
            <StatusBar style="auto" />
            {children}
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
});

export default MainLayout;
