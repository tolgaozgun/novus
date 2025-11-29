import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import SelectionOption from '../../components/onboarding/SelectionOption';
import { Ionicons } from '@expo/vector-icons';

type Step = 'source' | 'pain_points' | 'triggers';

const SOURCES = [
    'Career & Success', 'Health & Fitness', 'Relationships', 'Personal Growth', 'Mental Health', 'Spiritual'
];

const PAIN_POINTS = [
    'Procrastination', 'Anxiety & Stress', 'Lack of Focus', 'Low Confidence', 'Inconsistency', 'Burnout'
];

const TRIGGERS = [
    'Tough Love', 'Gentle Support', 'Logical/Stoic', 'Energetic Hype', 'Spiritual/Calm'
];

export default function PsychographicsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { updateUser } = useUser();
    const [step, setStep] = useState<Step>('source');

    const [source, setSource] = useState<string[]>([]);
    const [painPoints, setPainPoints] = useState<string[]>([]);
    const [trigger, setTrigger] = useState('');

    const handleContinue = async () => {
        if (step === 'source' && source.length > 0) {
            await updateUser({ motivationSources: source });
            setStep('pain_points');
        } else if (step === 'pain_points' && painPoints.length > 0) {
            await updateUser({ painPoints });
            setStep('triggers');
        } else if (step === 'triggers' && trigger) {
            await updateUser({ toneTriggers: [trigger] });
            router.push('/onboarding/commitment');
        }
    };

    const handleBack = () => {
        if (step === 'triggers') {
            setStep('pain_points');
        } else if (step === 'pain_points') {
            setStep('source');
        } else {
            router.back();
        }
    };

    const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const getProgress = () => {
        switch (step) {
            case 'source': return 0.5;
            case 'pain_points': return 0.6;
            case 'triggers': return 0.7;
            default: return 0.5;
        }
    };

    const isStepValid = () => {
        if (step === 'source') return source.length > 0;
        if (step === 'pain_points') return painPoints.length > 0;
        if (step === 'triggers') return trigger.length > 0;
        return false;
    };

    const renderStepContent = () => {
        switch (step) {
            case 'source':
                return (
                    <>
                        <Text style={[styles.title, { color: theme.text }]}>What drives you?</Text>
                        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                            Select all that apply.
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {SOURCES.map((item) => (
                                <SelectionOption
                                    key={item}
                                    label={item}
                                    selected={source.includes(item)}
                                    onSelect={() => toggleSelection(item, source, setSource)}
                                />
                            ))}
                        </ScrollView>
                    </>
                );
            case 'pain_points':
                return (
                    <>
                        <Text style={[styles.title, { color: theme.text }]}>What holds you back?</Text>
                        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                            We'll help you overcome these obstacles.
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {PAIN_POINTS.map((item) => (
                                <SelectionOption
                                    key={item}
                                    label={item}
                                    selected={painPoints.includes(item)}
                                    onSelect={() => toggleSelection(item, painPoints, setPainPoints)}
                                />
                            ))}
                        </ScrollView>
                    </>
                );
            case 'triggers':
                return (
                    <>
                        <Text style={[styles.title, { color: theme.text }]}>What tone works best?</Text>
                        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                            Choose the voice of your AI companion.
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {TRIGGERS.map((item) => (
                                <SelectionOption
                                    key={item}
                                    label={item}
                                    selected={trigger === item}
                                    onSelect={() => setTrigger(item)}
                                />
                            ))}
                        </ScrollView>
                    </>
                );
        }
    };

    const handleSkip = () => {
        if (step === 'source') {
            setStep('pain_points');
        } else if (step === 'pain_points') {
            setStep('triggers');
        } else {
            router.push('/onboarding/commitment');
        }
    };

    return (
        <OnboardingWrapper progress={getProgress()} onBack={handleBack} onSkip={handleSkip}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {renderStepContent()}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor: isStepValid() ? theme.accent : theme.cardBackground,
                                opacity: isStepValid() ? 1 : 0.5
                            }
                        ]}
                        onPress={handleContinue}
                        disabled={!isStepValid()}
                    >
                        <Text style={[styles.buttonText, { color: isStepValid() ? '#000' : theme.textSecondary }]}>
                            Continue
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color={isStepValid() ? '#000' : theme.textSecondary} style={{ marginLeft: 8 }} />
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 30,
    },
    footer: {
        paddingVertical: 20,
    },
    button: {
        height: 56,
        borderRadius: 28,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
