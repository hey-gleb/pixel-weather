import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    View,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Snowfall from 'react-snowfall';

interface Props {
    children: React.ReactNode;
    onRefresh?: () => void;
    bgColor?: string[];
    styles?: ViewStyle;
}

const MainLayout: React.FC<Props> = (props) => {
    const { bgColor = [], onRefresh, children } = props;
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        onRefresh?.();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={[styles.container, props.styles]}>
            <StatusBar style="auto" />
            <SafeAreaView style={styles.safeArea}>
                <LinearGradient colors={bgColor} style={styles.background} />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    }
                >
                    {/*<View style={styles.snowFall}>*/}
                    {/*    <Snowfall snowflakeCount={100} />*/}
                    {/*</View>*/}
                    {children}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    // TODO Rework safeArea without hard-coding bg color. Bug with white bg on scroll
    safeArea: { flex: 1, backgroundColor: '#272536' },
    scrollView: { flex: 1 },
    scrollViewContainer: { flex: 1, flexGrow: 1 },
    container: { flex: 1 },
    snowFall: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: -2,
    },
});

export default MainLayout;
