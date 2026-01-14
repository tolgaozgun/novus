import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import SelectionOption from '../../components/onboarding/SelectionOption';

type Step = 'focus' | 'obstacles';

const FOCUS_AREAS = [
    { id: 'anxiety', label: 'Reducing Anxiety', icon: 'cloud' },
    { id: 'depression', label: 'Managing Depression', icon: 'rainy' },
    { id: 'stress', label: 'Handling Stress', icon: 'thunderstorm' },
    { id: 'confidence', label: 'Building Confidence', icon: 'sunny' },
    { id: 'focus', label: 'Improving Focus', icon: 'glasses' },
    { id: 'sleep', label: 'Better Sleep', icon: 'moon' },
];

const OBSTACLES = [
    { id: 'procrastination', label: 'Procrastination', icon: 'hourglass' },
    { id: 'overthinking', label: 'Overthinking', icon: 'sync' },
    { id: 'imposter', label: 'Imposter Syndrome', icon: 'person' },
    { id: 'burnout', label: 'Burnout', icon: 'battery-dead' },
    { id: 'loneliness', label: 'Loneliness', icon: 'people' },
];

export default function WellnessScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { updateUser } = useUser();
    const [step, setStep] = useState<Step>('focus');
    const [selectedFocus, setSelectedFocus] = useState<string[]>([]);
    const [selectedObstacles, setSelectedObstacles] = useState<string[]>([]);

    const toggleSelection = (id: string, list: string[], setList: (l: string[]) => void) => {
        if (list.includes(id)) {
            setList(list.filter(item => item !== id));
        } else {
            setList([...list, id]);
        }
    };

    const handleContinue = async () => {
        if (step === 'focus') {
            await updateUser({ wellnessFocus: selectedFocus });
            setStep('obstacles');
        } else {
            await updateUser({ wellnessObstacles: selectedObstacles });
            router.push('/onboarding/mood-baseline');
        }
    };

    const handleBack = () => {
        if (step === 'obstacles') {
            setStep('focus');
        } else {
            router.back();
        }
    };

    const handleSkip = async () => {
        if (step === 'focus') {
            await updateUser({ wellnessFocus: [] });
            setStep('obstacles');
        } else {
            await updateUser({ wellnessObstacles: [] });
            router.push('/onboarding/mood-baseline');
        }
    };

    const getProgress = () => {
        return step === 'focus' ? 0.25 : 0.3; // Resetting progress scale for Phase 3 context or continuing? 
        // Let's assume continuous progress: Phase 1 ended ~0.2, Phase 2 ~0.4? 
        // Actually previous screens were 0.75, 0.8, 0.9, 1.0. 
        // Wait, Customization was 1.0? That might be confusing if there are more phases.
        // Let's recalibrate. Phase 1: 0-25%. Phase 2: 25-50%. Phase 3: 50-75%. Phase 4: 75-100%.
        // Let's just use a relative scale for now.
        // Let's say Phase 3 starts at 0.5
        return step === 'focus' ? 0.5 : 0.55;
    };

    const renderFocusStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>Mental Wellness</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Are there specific areas you'd like to focus on?
            </Text>
            <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                {FOCUS_AREAS.map((item) => (
                    <SelectionOption
                        key={item.id}
                        label={item.label}
                        icon={item.icon as any}
                        selected={selectedFocus.includes(item.id)}
                        onSelect={() => toggleSelection(item.id, selectedFocus, setSelectedFocus)}
                    />
                ))}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );

    const renderObstaclesStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>Current Obstacles</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                What's currently standing in your way?
            </Text>
            <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
                {OBSTACLES.map((item) => (
                    <SelectionOption
                        key={item.id}
                        label={item.label}
                        icon={item.icon as any}
                        selected={selectedObstacles.includes(item.id)}
                        onSelect={() => toggleSelection(item.id, selectedObstacles, setSelectedObstacles)}
                    />
                ))}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );

    return (
        <OnboardingWrapper progress={getProgress()} onBack={handleBack} onSkip={handleSkip}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {step === 'focus' && renderFocusStep()}
                    {step === 'obstacles' && renderObstaclesStep()}
                </View>

                <View style={styles.footer}>
                    <SelectionOption
                        label="Continue"
                        selected={true}
                        onSelect={handleContinue}
                        isButton
                    />
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
        flex: 1,
        width: '100%',
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
    footer: {
        padding: 20,
        paddingBottom: 40,
    },
});
