import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

interface OnboardingWrapperProps {
    children: React.ReactNode;
    showBack?: boolean;
    onBack?: () => void;
    onSkip?: () => void;
    progress?: number; // 0 to 1
}

export default function OnboardingWrapper({ children, showBack = true, onBack, onSkip, progress }: OnboardingWrapperProps) {
    const { theme } = useTheme();
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Background Elements */}
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={[styles.orb, { backgroundColor: theme.accentSecondary, top: height * 0.1, left: -50 }]} />
            <View style={[styles.orb, { backgroundColor: theme.accent, bottom: height * 0.2, right: -50 }]} />

            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        {showBack && (
                            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                                <Ionicons name="chevron-back" size={28} color={theme.text} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {progress !== undefined && (
                        <View style={styles.progressBarContainer}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    {
                                        backgroundColor: theme.accent,
                                        width: `${progress * 100}%`
                                    }
                                ]}
                            />
                        </View>
                    )}

                    <View style={styles.headerRight}>
                        {onSkip && (
                            <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
                                <Text style={[styles.skipText, { color: theme.textSecondary }]}>Skip</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <View style={styles.content}>
                    {children}
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 50,
    },
    headerLeft: {
        width: 60,
        alignItems: 'flex-start',
    },
    headerRight: {
        width: 60,
        alignItems: 'flex-end',
    },
    backButton: {
        padding: 5,
    },
    skipButton: {
        padding: 5,
    },
    skipText: {
        fontSize: 16,
        fontWeight: '600',
    },
    progressBarContainer: {
        flex: 1,
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
});
