import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function MoodBaselineScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [mood, setMood] = useState(5);

    const handleContinue = () => {
        // TODO: Save mood baseline
        router.push('/onboarding/goals');
    };

    const handleBack = () => {
        router.back();
    };

    const handleSkip = () => {
        router.push('/onboarding/goals');
    };

    const getMoodLabel = (value: number) => {
        if (value <= 2) return "Struggling";
        if (value <= 4) return "Not Great";
        if (value <= 6) return "Okay";
        if (value <= 8) return "Good";
        return "Amazing";
    };

    const getMoodIcon = (value: number) => {
        if (value <= 2) return "thunderstorm";
        if (value <= 4) return "rainy";
        if (value <= 6) return "cloud";
        if (value <= 8) return "partly-sunny";
        return "sunny";
    };

    return (
        <OnboardingWrapper progress={0.6} onBack={handleBack} onSkip={handleSkip}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.text }]}>How are you feeling?</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        This helps us tailor your first briefing.
                    </Text>

                    <View style={styles.moodContainer}>
                        <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                            <Ionicons name={getMoodIcon(mood) as any} size={64} color={theme.accent} />
                        </View>
                        <Text style={[styles.moodLabel, { color: theme.accent }]}>{getMoodLabel(mood)}</Text>

                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            value={mood}
                            onValueChange={setMood}
                            minimumTrackTintColor={theme.accent}
                            maximumTrackTintColor={theme.textSecondary}
                            thumbTintColor={theme.text}
                        />
                        <View style={styles.scaleLabels}>
                            <Text style={[styles.scaleText, { color: theme.textSecondary }]}>1</Text>
                            <Text style={[styles.scaleText, { color: theme.textSecondary }]}>10</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.accent }]}
                        onPress={handleContinue}
                    >
                        <Text style={[styles.buttonText, { color: '#000' }]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </OnboardingWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 40,
        textAlign: 'center',
        color: '#888',
    },
    moodContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    moodLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    scaleLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    scaleText: {
        fontSize: 14,
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
    },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
