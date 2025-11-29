import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    const MENU_ITEMS = [
        { id: 'favorites', label: 'My Favorites', icon: 'heart', route: '/(tabs)/favorites' },
        { id: 'history', label: 'History', icon: 'time', route: '/history' },
        { id: 'collections', label: 'Collections', icon: 'albums', route: '/collections' },
        { id: 'settings', label: 'Settings', icon: 'settings', route: '/settings' },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={[styles.avatar, { backgroundColor: theme.cardBackground }]}>
                        <Ionicons name="person" size={40} color={theme.textSecondary} />
                    </View>
                    <Text style={[styles.name, { color: theme.text }]}>Traveler</Text>
                    <Text style={[styles.stats, { color: theme.textSecondary }]}>7 Day Streak • 42 Quotes Read</Text>
                </View>

                <View style={styles.menuContainer}>
                    {MENU_ITEMS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.menuItem, { backgroundColor: theme.cardBackground }]}
                            onPress={() => item.route && router.push(item.route as any)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Ionicons name={item.icon as any} size={24} color={theme.accent} />
                            </View>
                            <Text style={[styles.menuLabel, { color: theme.text }]}>{item.label}</Text>
                            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={[styles.logoutText, { color: theme.textSecondary }]}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
        opacity: 0.3,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 80,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    stats: {
        fontSize: 14,
        opacity: 0.8,
    },
    menuContainer: {
        gap: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        marginTop: 40,
        alignItems: 'center',
        padding: 15,
    },
    logoutText: {
        fontSize: 16,
    }
});
