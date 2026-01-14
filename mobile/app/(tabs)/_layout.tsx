import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function TabLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: (theme.id === 'dark' || theme.id === 'nature') ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarBackground: () => (
                    <BlurView intensity={80} tint={(theme.id === 'dark' || theme.id === 'nature') ? 'dark' : 'light'} style={{ flex: 1 }} />
                ),
                tabBarActiveTintColor: theme.tint,
                tabBarInactiveTintColor: theme.textSecondary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Briefing',
                    tabBarIcon: ({ color, size }) => <Ionicons name="today-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="discovery"
                options={{
                    title: 'Discovery',
                    tabBarIcon: ({ color, size }) => <Ionicons name="compass-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
