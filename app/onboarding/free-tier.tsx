import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import { Ionicons } from '@expo/vector-icons';

export default function FreeTierScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    const handleContinue = () => {
        // Complete onboarding
        // TODO: Set onboarding completed flag
        router.replace('/(tabs)');
    };

    return (
        <OnboardingWrapper progress={1.0} showBack={true} onBack={() => router.back()}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                        <Ionicons name="gift" size={64} color={theme.accent} />
                    </View>

                    <Text style={[styles.title, { color: theme.text }]}>Totally Free.</Text>
                    <Text style={[styles.title, { color: theme.accent }]}>Forever.</Text>

                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Novus is a community-driven project. No paywalls, no hidden fees, just pure motivation.
                    </Text>

                    <View style={[styles.featureList, { backgroundColor: theme.cardBackground }]}>
                        <View style={styles.featureItem}>
                            <Ionicons name="infinite" size={24} color={theme.accent} style={styles.featureIcon} />
                            <Text style={[styles.featureText, { color: theme.text }]}>Unlimited Quotes</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="notifications" size={24} color={theme.accent} style={styles.featureIcon} />
                            <Text style={[styles.featureText, { color: theme.text }]}>Daily Briefings</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="color-palette" size={24} color={theme.accent} style={styles.featureIcon} />
                            <Text style={[styles.featureText, { color: theme.text }]}>Full Customization</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.accent }]}
                        onPress={handleContinue}
                    >
                        <Text style={[styles.buttonText, { color: '#000' }]}>Start My Journey</Text>
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
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 42,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20,
        marginBottom: 40,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    featureList: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    featureIcon: {
        marginRight: 15,
    },
    featureText: {
        fontSize: 18,
        fontWeight: '600',
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
