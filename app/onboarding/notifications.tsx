import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import SelectionOption from '../../components/onboarding/SelectionOption';
import { Ionicons } from '@expo/vector-icons';

type Step = 'soft_ask' | 'frequency';

const FREQUENCIES = [
    { id: '3', label: '3x Daily (Morning, Noon, Night)' },
    { id: '5', label: '5x Daily (Keep me focused)' },
    { id: '10', label: '10x Daily (Obsessed)' },
    { id: '1', label: '1x Daily (Just the briefing)' },
];

export default function NotificationsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [step, setStep] = useState<Step>('soft_ask');
    const [frequency, setFrequency] = useState('5');

    const handleContinue = async () => {
        if (step === 'soft_ask') {
            // Mock permission request
            // In a real app, we would call Notifications.requestPermissionsAsync() here
            Alert.alert(
                "\"Novus\" Would Like to Send You Notifications",
                "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.",
                [
                    {
                        text: "Don't Allow",
                        style: "cancel",
                        onPress: () => router.push('/onboarding/customization')
                    },
                    {
                        text: "Allow",
                        onPress: () => setStep('frequency')
                    }
                ]
            );
        } else {
            // TODO: Save notification settings
            router.push('/onboarding/customization');
        }
    };

    const handleBack = () => {
        if (step === 'frequency') {
            setStep('soft_ask');
        } else {
            router.back();
        }
    };

    const handleSkip = () => {
        if (step === 'soft_ask') {
            router.push('/onboarding/customization');
        } else {
            router.push('/onboarding/customization');
        }
    };

    const getProgress = () => {
        return step === 'soft_ask' ? 0.85 : 0.9;
    };

    const renderSoftAskStep = () => (
        <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name="notifications" size={48} color={theme.accent} />
            </View>
            <Text style={[styles.title, { color: theme.text, textAlign: 'center' }]}>
                Stay on Track
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary, textAlign: 'center' }]}>
                Motivation is fleeting. We'll send you timely reminders to keep your mindset sharp.
            </Text>

            <View style={[styles.previewCard, { backgroundColor: theme.cardBackground }]}>
                <View style={styles.previewHeader}>
                    <View style={styles.previewIcon}>
                        <Ionicons name="sparkles" size={12} color="#fff" />
                    </View>
                    <Text style={[styles.previewAppName, { color: theme.textSecondary }]}>NOVUS</Text>
                    <Text style={[styles.previewTime, { color: theme.textSecondary }]}>now</Text>
                </View>
                <Text style={[styles.previewTitle, { color: theme.text }]}>Time to focus, {theme.name === 'Midnight' ? 'User' : 'Friend'}</Text>
                <Text style={[styles.previewBody, { color: theme.textSecondary }]}>
                    "The only way to do great work is to love what you do."
                </Text>
            </View>
        </View>
    );

    const renderFrequencyStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>How often?</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Customize your daily dose of motivation.
            </Text>
            <View style={styles.optionsContainer}>
                {FREQUENCIES.map((item) => (
                    <SelectionOption
                        key={item.id}
                        label={item.label}
                        selected={frequency === item.id}
                        onSelect={() => setFrequency(item.id)}
                    />
                ))}
            </View>
        </View>
    );

    return (
        <OnboardingWrapper progress={getProgress()} onBack={handleBack} onSkip={handleSkip}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {step === 'soft_ask' && renderSoftAskStep()}
                    {step === 'frequency' && renderFrequencyStep()}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.accent }]}
                        onPress={handleContinue}
                    >
                        <Text style={[styles.buttonText, { color: '#000' }]}>
                            {step === 'soft_ask' ? 'Enable Notifications' : 'Continue'}
                        </Text>
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
        paddingTop: 20,
    },
    stepContainer: {
        width: '100%',
        alignItems: 'center',
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    previewCard: {
        width: '100%',
        padding: 15,
        borderRadius: 16,
        marginTop: 20,
    },
    previewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    previewIcon: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    previewAppName: {
        fontSize: 12,
        fontWeight: '600',
        flex: 1,
    },
    previewTime: {
        fontSize: 12,
    },
    previewTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    previewBody: {
        fontSize: 14,
    },
    optionsContainer: {
        width: '100%',
    },
    footer: {
        paddingVertical: 20,
        width: '100%',
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
