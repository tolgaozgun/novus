import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Colors } from '../constants/Colors';

import { FavoritesProvider } from '../context/FavoritesContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function AppLayout() {
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <StatusBar style={theme.id === 'light' ? 'dark' : 'light'} hidden />
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.background },
                    animation: 'fade',
                }}
            />
        </View>
    );
}

export default function RootLayout() {
    return (
        <ThemeProvider>
            <FavoritesProvider>
                <AppLayout />
            </FavoritesProvider>
        </ThemeProvider>
    );
}
