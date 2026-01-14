import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

const FOCUS_AREAS = [
    { id: 'anxiety', label: 'Reducing Anxiety', icon: 'cloud' },
    { id: 'depression', label: 'Managing Mood', icon: 'rainy' },
    { id: 'stress', label: 'Handling Stress', icon: 'thunderstorm' },
    { id: 'confidence', label: 'Building Confidence', icon: 'sunny' },
    { id: 'focus', label: 'Improving Focus', icon: 'glasses' },
    { id: 'sleep', label: 'Better Sleep', icon: 'moon' },
    { id: 'productivity', label: 'Boost Productivity', icon: 'rocket' },
    { id: 'mindset', label: 'Positive Mindset', icon: 'happy' },
    { id: 'discipline', label: 'Build Discipline', icon: 'barbell' },
    { id: 'calm', label: 'Find Calm', icon: 'leaf' },
    { id: 'leadership', label: 'Leadership Skills', icon: 'people' },
    { id: 'growth', label: 'Personal Growth', icon: 'star' },
];

export default function ReflectionFocusScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const params = useLocalSearchParams();
    const { mood } = params;

    const handleSelectFocus = (focusId: string) => {
        Haptics.selectionAsync();
        router.push({
            pathname: '/reflection/notes',
            params: { mood, focus: focusId }
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
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.stepIndicator, { color: theme.textSecondary }]}>Step 2 of 3</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.title, { color: theme.text }]}>What's on your mind?</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Select an area you'd like to focus on or reflect about.
                </Text>

                <View style={styles.grid}>
                    {FOCUS_AREAS.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, { backgroundColor: theme.cardBackground }]}
                            onPress={() => handleSelectFocus(item.id)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Ionicons name={item.icon as any} size={28} color={theme.accent} />
                            </View>
                            <Text style={[styles.label, { color: theme.text }]}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    stepIndicator: {
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.8,
        paddingHorizontal: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        justifyContent: 'center',
    },
    card: {
        width: (width - 55) / 2,
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        marginBottom: 5,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
