import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Colors } from '../constants/Colors';

import { FavoritesProvider } from '../context/FavoritesContext';
import { HistoryProvider } from '../context/HistoryContext';
import { JournalProvider } from '../context/JournalContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { UserProvider } from '../context/UserContext';

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
            <UserProvider>
                <FavoritesProvider>
                    <HistoryProvider>
                        <JournalProvider>
                            <AppLayout />
                        </JournalProvider>
                    </HistoryProvider>
                </FavoritesProvider>
            </UserProvider>
        </ThemeProvider>
    );
}
