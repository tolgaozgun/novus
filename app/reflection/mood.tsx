import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const MOODS = [
    { id: 'happy', label: 'Happy', icon: 'happy' },
    { id: 'excited', label: 'Excited', icon: 'flash' },
    { id: 'neutral', label: 'Neutral', icon: 'remove' },
    { id: 'tired', label: 'Tired', icon: 'bed' },
    { id: 'anxious', label: 'Anxious', icon: 'thunderstorm' },
    { id: 'sad', label: 'Sad', icon: 'rainy' },
];

export default function ReflectionMoodScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    const handleSelectMood = (moodId: string) => {
        Haptics.selectionAsync();
        router.push({
            pathname: '/reflection/focus',
            params: { mood: moodId }
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.stepIndicator, { color: theme.textSecondary }]}>Step 1 of 3</Text>
            </View>

            <View style={styles.content}>
                <Text style={[styles.title, { color: theme.text }]}>How are you feeling?</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Take a moment to check in with yourself.
                </Text>

                <View style={styles.grid}>
                    {MOODS.map((mood) => (
                        <TouchableOpacity
                            key={mood.id}
                            style={[styles.card, { backgroundColor: theme.cardBackground }]}
                            onPress={() => handleSelectMood(mood.id)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Ionicons name={mood.icon as any} size={32} color={theme.accent} />
                            </View>
                            <Text style={[styles.label, { color: theme.text }]}>{mood.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
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
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    stepIndicator: {
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 50,
        opacity: 0.8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        justifyContent: 'center',
    },
    card: {
        width: (width - 90) / 2,
        aspectRatio: 1,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
});
