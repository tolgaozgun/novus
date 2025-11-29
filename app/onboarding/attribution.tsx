import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import SelectionOption from '../../components/onboarding/SelectionOption';

const OPTIONS = [
    { id: 'tiktok', label: 'TikTok', icon: 'logo-tiktok' },
    { id: 'instagram', label: 'Instagram', icon: 'logo-instagram' },
    { id: 'appstore', label: 'App Store Search', icon: 'search' },
    { id: 'friend', label: 'Friend Recommendation', icon: 'people' },
    { id: 'other', label: 'Other', icon: 'ellipsis-horizontal' },
];

export default function AttributionScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [selected, setSelected] = useState<string | null>(null);

    const handleContinue = () => {
        if (selected) {
            // TODO: Save attribution data
            router.push('/onboarding/demographics');
        }
    };

    const handleSkip = () => {
        router.push('/onboarding/demographics');
    };

    return (
        <OnboardingWrapper progress={0.1} onSkip={handleSkip}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>
                        How did you hear about us?
                    </Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Help us understand where our community comes from.
                    </Text>
                </View>

                <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
                    {OPTIONS.map((option) => (
                        <SelectionOption
                            key={option.id}
                            label={option.label}
                            icon={option.icon}
                            selected={selected === option.id}
                            onSelect={() => setSelected(option.id)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor: selected ? theme.accent : theme.cardBackground,
                                opacity: selected ? 1 : 0.5
                            }
                        ]}
                        onPress={handleContinue}
                        disabled={!selected}
                    >
                        <Text style={[styles.buttonText, { color: selected ? '#000' : theme.textSecondary }]}>
                            Continue
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
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    optionsList: {
        flex: 1,
    },
    footer: {
        paddingVertical: 20,
    },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
