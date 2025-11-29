import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ReflectionSummaryScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    const handleDone = () => {
        router.push('/(tabs)/profile');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <View style={styles.content}>
                <Animated.View entering={FadeIn.delay(200)} style={[styles.iconContainer, { backgroundColor: theme.accent }]}>
                    <Ionicons name="checkmark" size={64} color="#000" />
                </Animated.View>

                <Animated.Text entering={FadeInUp.delay(400)} style={[styles.title, { color: theme.text }]}>
                    Reflection Saved
                </Animated.Text>

                <Animated.Text entering={FadeInUp.delay(600)} style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Great job taking time for yourself today. Your entry has been added to your diary.
                </Animated.Text>

                <Animated.View entering={FadeInUp.delay(800)} style={{ width: '100%' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.cardBackground }]}
                        onPress={handleDone}
                    >
                        <Text style={[styles.buttonText, { color: theme.text }]}>View Diary</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, { marginTop: 15 }]}
                        onPress={() => router.push('/(tabs)/index')}
                    >
                        <Text style={[styles.buttonText, { color: theme.textSecondary }]}>Back to Home</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 60,
        opacity: 0.8,
        lineHeight: 26,
    },
    button: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
    },
});
