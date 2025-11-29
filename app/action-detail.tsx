import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function ActionDetailScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const params = useLocalSearchParams();

    const { title, subtitle, icon, description } = params;

    const handleComplete = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        router.back();
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <BlurView intensity={80} tint="dark" style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={theme.text}
                    style={{ position: 'absolute', left: 20, bottom: 20 }}
                    onPress={() => router.back()}
                />
                <Text style={[styles.headerTitle, { color: theme.text }]}>Daily Action</Text>
            </BlurView>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={[styles.iconContainer, { backgroundColor: theme.cardBackground, borderColor: theme.accent }]}>
                    <Ionicons name={icon as any} size={64} color={theme.accent} />
                </View>

                <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{subtitle}</Text>

                <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                    <Text style={[styles.description, { color: theme.text }]}>
                        {description}
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.completeButton, { backgroundColor: theme.accent }]}
                    onPress={handleComplete}
                >
                    <Text style={[styles.buttonText, { color: '#000' }]}>Complete Action</Text>
                    <Ionicons name="checkmark-circle" size={24} color="#000" />
                </TouchableOpacity>
            </ScrollView>
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
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 30,
        alignItems: 'center',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40,
        opacity: 0.8,
    },
    card: {
        padding: 25,
        borderRadius: 20,
        width: '100%',
        marginBottom: 40,
    },
    description: {
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
    },
    completeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        gap: 10,
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
