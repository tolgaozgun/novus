import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import SelectionOption from '../../components/onboarding/SelectionOption';
import { Ionicons } from '@expo/vector-icons';

type Step = 'name' | 'age' | 'gender';

const AGE_RANGES = [
    '13-17', '18-24', '25-34', '35-44', '45-54', '55+'
];

const GENDERS = [
    'Male', 'Female', 'Non-binary', 'Prefer not to say'
];

export default function DemographicsScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const [step, setStep] = useState<Step>('name');

    const [name, setName] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [gender, setGender] = useState('');

    const handleContinue = () => {
        if (step === 'name' && name.trim()) {
            setStep('age');
        } else if (step === 'age' && ageRange) {
            setStep('gender');
        } else if (step === 'gender' && gender) {
            // TODO: Save demographics
            router.push('/onboarding/psychographics');
        }
    };

    const handleBack = () => {
        if (step === 'gender') {
            setStep('age');
        } else if (step === 'age') {
            setStep('name');
        } else {
            router.back();
        }
    };

    const getProgress = () => {
        switch (step) {
            case 'name': return 0.2;
            case 'age': return 0.3;
            case 'gender': return 0.4;
            default: return 0.2;
        }
    };

    const renderNameStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>What should we call you?</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Your name will be used to personalize your daily briefings.
            </Text>
            <TextInput
                style={[styles.input, {
                    color: theme.text,
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.accent
                }]}
                placeholder="Your Name"
                placeholderTextColor={theme.textSecondary}
                value={name}
                onChangeText={setName}
                autoFocus
            />
        </View>
    );

    const renderAgeStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>How old are you?</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                We use this to curate content that resonates with your life stage.
            </Text>
            <View style={styles.optionsContainer}>
                {AGE_RANGES.map((range) => (
                    <SelectionOption
                        key={range}
                        label={range}
                        selected={ageRange === range}
                        onSelect={() => setAgeRange(range)}
                    />
                ))}
            </View>
        </View>
    );

    const renderGenderStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>How do you identify?</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Helps us tailor the tone of voice.
            </Text>
            <View style={styles.optionsContainer}>
                {GENDERS.map((g) => (
                    <SelectionOption
                        key={g}
                        label={g}
                        selected={gender === g}
                        onSelect={() => setGender(g)}
                    />
                ))}
            </View>
        </View>
    );

    const isStepValid = () => {
        if (step === 'name') return name.trim().length > 0;
        if (step === 'age') return ageRange.length > 0;
        if (step === 'gender') return gender.length > 0;
        return false;
    };

    const handleSkip = () => {
        if (step === 'name') {
            setStep('age');
        } else if (step === 'age') {
            setStep('gender');
        } else {
            router.push('/onboarding/psychographics');
        }
    };

    return (
        <OnboardingWrapper progress={getProgress()} onBack={handleBack} onSkip={handleSkip}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.content}>
                    {step === 'name' && renderNameStep()}
                    {step === 'age' && renderAgeStep()}
                    {step === 'gender' && renderGenderStep()}
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
    stepContainer: {
        flex: 1,
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
    input: {
        height: 60,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 20,
        borderWidth: 1,
    },
    optionsContainer: {
        flex: 1,
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
