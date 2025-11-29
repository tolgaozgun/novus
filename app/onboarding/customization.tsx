import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { Themes } from '../../constants/Colors';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import { Ionicons } from '@expo/vector-icons';

type Step = 'icon' | 'theme';

const ICONS = [
    { id: 'default', label: 'Classic', icon: 'sparkles' },
    { id: 'dark', label: 'Midnight', icon: 'moon' },
    { id: 'gold', label: 'Premium', icon: 'star' },
    { id: 'neon', label: 'Neon', icon: 'flash' },
];

const THEMES_LIST = [
    { id: 'dark', label: 'Midnight', color: '#050505' },
    { id: 'light', label: 'Sunrise', color: '#F0F0F0' },
    { id: 'nature', label: 'Forest', color: '#1A2F1A' },
];

export default function CustomizationScreen() {
    const router = useRouter();
    const { theme, setThemeId, currentThemeId } = useTheme();
    const { updateUser } = useUser();
    const [step, setStep] = useState<Step>('icon');
    const [selectedIcon, setSelectedIcon] = useState('default');

    const handleContinue = async () => {
        if (step === 'icon') {
            await updateUser({ appIcon: selectedIcon });
            setStep('theme');
        } else {
            // Theme is already handled by ThemeContext, but we can save it to user profile too if needed
            // For now, just proceed
            router.push('/onboarding/wellness');
        }
    };

    const handleBack = () => {
        if (step === 'theme') {
            setStep('icon');
        } else {
            router.back();
        }
    };

    const handleSkip = async () => {
        if (step === 'icon') {
            await updateUser({ appIcon: 'default' });
            setStep('theme');
        } else {
            router.push('/onboarding/wellness');
        }
    };

    const getProgress = () => {
        return step === 'icon' ? 0.95 : 1.0;
    };

    const renderIconStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>Choose Your Icon</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Make Novus look great on your home screen.
            </Text>

            <View style={styles.grid}>
                {ICONS.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.iconOption,
                            {
                                borderColor: selectedIcon === item.id ? theme.accent : 'rgba(255,255,255,0.1)',
                                backgroundColor: theme.cardBackground
                            }
                        ]}
                        onPress={() => setSelectedIcon(item.id)}
                    >
                        <View style={[styles.appIconPlaceholder, { backgroundColor: theme.background }]}>
                            <Ionicons name={item.icon as any} size={32} color={theme.text} />
                        </View>
                        <Text style={[styles.optionLabel, { color: theme.text }]}>{item.label}</Text>
                        {selectedIcon === item.id && (
                            <View style={[styles.checkBadge, { backgroundColor: theme.accent }]}>
                                <Ionicons name="checkmark" size={12} color="#000" />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderThemeStep = () => (
        <View style={styles.stepContainer}>
            <Text style={[styles.title, { color: theme.text }]}>Select a Theme</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Customize the look and feel of your experience.
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeScroll}>
                {THEMES_LIST.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.themeOption,
                            {
                                borderColor: currentThemeId === item.id ? theme.accent : 'transparent',
                            }
                        ]}
                        onPress={() => setThemeId(item.id)}
                    >
                        <View style={[styles.themePreview, { backgroundColor: item.color }]}>
                            <View style={[styles.miniOrb, { backgroundColor: Themes[item.id as keyof typeof Themes].accent }]} />
                            <Text style={[styles.themeLabel, { color: Themes[item.id as keyof typeof Themes].text }]}>
                                {item.label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <OnboardingWrapper progress={getProgress()} onBack={handleBack} onSkip={handleSkip}>
            <View style={styles.container}>
                <View style={styles.content}>
                    {step === 'icon' && renderIconStep()}
                    {step === 'theme' && renderThemeStep()}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.accent }]}
                        onPress={handleContinue}
                    >
                        <Text style={[styles.buttonText, { color: '#000' }]}>
                            {step === 'icon' ? 'Next' : 'Finish Setup'}
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    iconOption: {
        width: 140,
        height: 160,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    appIconPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    checkBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeScroll: {
        flexGrow: 0,
        width: '100%',
    },
    themeOption: {
        marginHorizontal: 10,
        borderWidth: 3,
        borderRadius: 24,
        padding: 4,
    },
    themePreview: {
        width: 140,
        height: 240,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    miniOrb: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.5,
    },
    themeLabel: {
        fontSize: 18,
        fontWeight: 'bold',
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
