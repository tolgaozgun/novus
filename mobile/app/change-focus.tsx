import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const ACTION_MAPPING: Record<string, { label: string; icon: string }> = {
    anxiety: { label: 'Reducing Anxiety', icon: 'cloud' },
    depression: { label: 'Managing Mood', icon: 'rainy' },
    stress: { label: 'Handling Stress', icon: 'thunderstorm' },
    confidence: { label: 'Building Confidence', icon: 'sunny' },
    focus: { label: 'Improving Focus', icon: 'glasses' },
    sleep: { label: 'Better Sleep', icon: 'moon' },
    productivity: { label: 'Boost Productivity', icon: 'rocket' },
    mindset: { label: 'Positive Mindset', icon: 'happy' },
    discipline: { label: 'Build Discipline', icon: 'barbell' },
    calm: { label: 'Find Calm', icon: 'leaf' },
    leadership: { label: 'Leadership Skills', icon: 'people' },
    default: { label: 'Personal Growth', icon: 'star' },
};

export default function ChangeFocusScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { user, updateUser } = useUser();

    const handleSelectFocus = async (focusId: string) => {
        await updateUser({ dailyFocusId: focusId });
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
                <Text style={[styles.title, { color: theme.text }]}>Set Today's Focus</Text>
            </BlurView>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                    Choose what you want to focus on today. This will update your Daily Action and recommendations.
                </Text>

                <View style={styles.grid}>
                    {Object.entries(ACTION_MAPPING).map(([id, data]) => {
                        if (id === 'default') return null;
                        const isSelected = user.dailyFocusId === id;

                        return (
                            <TouchableOpacity
                                key={id}
                                style={[
                                    styles.card,
                                    {
                                        backgroundColor: theme.cardBackground,
                                        borderColor: isSelected ? theme.accent : 'transparent',
                                        borderWidth: 2
                                    }
                                ]}
                                onPress={() => handleSelectFocus(id)}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                    <Ionicons name={data.icon as any} size={32} color={theme.accent} />
                                </View>
                                <Text style={[styles.label, { color: theme.text }]}>{data.label}</Text>
                                {isSelected && (
                                    <View style={[styles.checkIcon, { backgroundColor: theme.accent }]}>
                                        <Ionicons name="checkmark" size={12} color="#000" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 24,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    card: {
        width: (width - 55) / 2,
        aspectRatio: 1,
        borderRadius: 20,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
