import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Mood } from '../../context/JournalContext';

const moods: { id: Mood; label: string; icon: string }[] = [
    { id: 'happy', label: 'Happy', icon: 'happy-outline' },
    { id: 'excited', label: 'Excited', icon: 'flash-outline' },
    { id: 'neutral', label: 'Neutral', icon: 'remove-circle-outline' },
    { id: 'tired', label: 'Tired', icon: 'bed-outline' },
    { id: 'anxious', label: 'Anxious', icon: 'pulse-outline' },
    { id: 'sad', label: 'Sad', icon: 'sad-outline' },
];

export default function MoodScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    const handleSelect = (mood: Mood) => {
        router.push({ pathname: '/checkin/topics', params: { mood } });
    };

    const renderItem = ({ item }: { item: typeof moods[0] }) => (
        <TouchableOpacity
            style={[styles.moodItem, { backgroundColor: theme.cardBackground, borderColor: theme.textSecondary }]}
            onPress={() => handleSelect(item.id)}
        >
            <Ionicons name={item.icon as any} size={40} color={theme.text} />
            <Text style={[styles.moodLabel, { color: theme.text }]}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: theme.text }]}>How are you feeling?</Text>

            <FlatList
                data={moods}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.grid}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    grid: {
        justifyContent: 'center',
    },
    row: {
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    moodItem: {
        width: '45%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    moodLabel: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
    },
});
