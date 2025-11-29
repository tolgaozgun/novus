import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Background Elements for Glassmorphism */}
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={[styles.orb, { backgroundColor: theme.accentSecondary, top: height * 0.1, left: -50 }]} />
            <View style={[styles.orb, { backgroundColor: theme.accent, bottom: height * 0.2, right: -50 }]} />

            <BlurView intensity={80} tint="dark" style={styles.contentContainer}>
                <View style={styles.header}>
                    <Ionicons name="sparkles" size={48} color={theme.text} />
                    <Text style={[styles.title, { color: theme.text }]}>Novus</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Your daily source of AI-driven motivation.
                    </Text>
                </View>

                <View style={styles.featureList}>
                    <FeatureItem
                        icon="infinite"
                        text="Infinite Inspiration"
                        theme={theme}
                    />
                    <FeatureItem
                        icon="analytics"
                        text="Mood Tracking"
                        theme={theme}
                    />
                    <FeatureItem
                        icon="color-palette"
                        text="Beautiful Themes"
                        theme={theme}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.accent }]}
                    onPress={() => router.push('/onboarding/attribution')}
                >
                    <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Get Started</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </BlurView>
        </View>
    );
}

function FeatureItem({ icon, text, theme }: { icon: any; text: string; theme: any }) {
    return (
        <View style={styles.featureItem}>
            <View style={[styles.iconContainer, { backgroundColor: theme.cardBackground }]}>
                <Ionicons name={icon} size={24} color={theme.accent} />
            </View>
            <Text style={[styles.featureText, { color: theme.text }]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: height,
        opacity: 0.3,
    },
    orb: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.4,
        filter: 'blur(50px)', // Note: standard React Native doesn't support CSS filter, but we'll leave it for concept or use an image
    },
    contentContainer: {
        width: width * 0.9,
        padding: 30,
        borderRadius: 30,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 42,
        fontWeight: '800',
        marginTop: 10,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        opacity: 0.8,
    },
    featureList: {
        width: '100%',
        marginBottom: 40,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    featureText: {
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        flexDirection: 'row',
        width: '100%',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
