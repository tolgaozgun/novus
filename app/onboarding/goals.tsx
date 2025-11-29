import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import SelectionOption from '../../components/onboarding/SelectionOption';

const GOALS = [
    { id: 'productivity', label: 'Boost Productivity', icon: 'rocket' },
    { id: 'mindset', label: 'Positive Mindset', icon: 'happy' },
    { id: 'discipline', label: 'Build Discipline', icon: 'barbell' },
    { id: 'calm', label: 'Find Calm', icon: 'leaf' },
    { id: 'leadership', label: 'Leadership Skills', icon: 'people' },
];

export default function GoalsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [customGoal, setCustomGoal] = useState('');

    const toggleSelection = (id: string) => {
        if (selectedGoals.includes(id)) {
            setSelectedGoals(selectedGoals.filter(item => item !== id));
        } else {
            setSelectedGoals([...selectedGoals, id]);
        }
    };

    const handleContinue = () => {
        // TODO: Save goals
        // End of Phase 3, move to Phase 4 (Free Tier)
        router.push('/onboarding/free-tier');
    };

    const handleBack = () => {
        router.back();
    };

    const handleSkip = () => {
        router.push('/onboarding/free-tier');
    };

    return (
        <OnboardingWrapper progress={0.7} onBack={handleBack} onSkip={handleSkip}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.content}>
                    <Text style={[styles.title, { color: theme.text }]}>What's your main goal?</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Select all that apply or add your own.
                    </Text>

                    <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                        {GOALS.map((item) => (
                            <SelectionOption
                                key={item.id}
                                label={item.label}
                                icon={item.icon as any}
                                selected={selectedGoals.includes(item.id)}
                                onSelect={() => toggleSelection(item.id)}
                            />
                        ))}

                        <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground }]}>
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Something else..."
                                placeholderTextColor={theme.textSecondary}
                                value={customGoal}
                                onChangeText={setCustomGoal}
                            />
                        </View>

                        <View style={{ height: 100 }} />
                    </ScrollView>
                </View>

                <View style={styles.footer}>
                    <SelectionOption
                        label="Continue"
                        selected={true}
                        onSelect={handleContinue}
                        isButton
                    />
                </View>
            </KeyboardAvoidingView>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    scrollList: {
        flex: 1,
        paddingHorizontal: 20,
    },
    inputContainer: {
        borderRadius: 16,
        padding: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    input: {
        fontSize: 16,
        height: 24,
    },
    footer: {
        padding: 20,
        paddingBottom: 40,
    },
});
