import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

// Mock data - in a real app this would come from an API or local storage based on onboarding
const DAILY_QUOTE = {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Productivity"
};

const FOCUS_AREA = "Reducing Anxiety"; // Mock selection

export default function DailyBriefingScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { user } = useUser();
    const [greeting, setGreeting] = useState('Good Morning');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: theme.textSecondary }]}>{greeting},</Text>
                        <Text style={[styles.username, { color: theme.text }]}>{user.name}</Text>
                    </View>
                    <TouchableOpacity style={[styles.profileButton, { backgroundColor: theme.cardBackground }]}>
                        <Ionicons name="person" size={20} color={theme.text} />
                    </TouchableOpacity>
                </View>

                {/* Daily Fuel Card (Quote) */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>YOUR DAILY FUEL</Text>
                    <BlurView intensity={80} tint="dark" style={styles.quoteCard}>
                        <Ionicons name={"quote" as any} size={32} color={theme.accent} style={styles.quoteIcon} />
                        <Text style={[styles.quoteText, { color: theme.text }]}>"{DAILY_QUOTE.text}"</Text>
                        <Text style={[styles.quoteAuthor, { color: theme.accent }]}>— {DAILY_QUOTE.author}</Text>

                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="heart-outline" size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="share-outline" size={24} color={theme.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>

                {/* Focus Area */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>TODAY'S FOCUS</Text>
                    <View style={[styles.focusCard, { backgroundColor: theme.cardBackground }]}>
                        <View style={[styles.focusIcon, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Ionicons name="cloud" size={24} color={theme.accent} />
                        </View>
                        <View style={styles.focusContent}>
                            <Text style={[styles.focusLabel, { color: theme.textSecondary }]}>Working on</Text>
                            <Text style={[styles.focusTitle, { color: theme.text }]}>{FOCUS_AREA}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
                    </View>
                </View>

                {/* Daily Action */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>DAILY ACTION</Text>
                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: theme.accent }]}>
                        <View style={styles.actionContent}>
                            <Text style={[styles.actionTitle, { color: '#000' }]}>Take a Deep Breath</Text>
                            <Text style={[styles.actionSubtitle, { color: 'rgba(0,0,0,0.7)' }]}>2 min breathing exercise</Text>
                        </View>
                        <View style={[styles.playButton, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                            <Ionicons name="play" size={24} color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 100 }} />
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
    orb: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.2,
        filter: 'blur(50px)', // Note: filter might not work on all RN versions, but good for web/some
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 16,
        fontWeight: '500',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 10,
        opacity: 0.7,
    },
    quoteCard: {
        padding: 25,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    quoteIcon: {
        marginBottom: 15,
        opacity: 0.8,
    },
    quoteText: {
        fontSize: 22,
        fontWeight: '600',
        lineHeight: 32,
        marginBottom: 15,
    },
    quoteAuthor: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
    },
    actionButton: {
        padding: 5,
    },
    focusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
    },
    focusIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    focusContent: {
        flex: 1,
    },
    focusLabel: {
        fontSize: 12,
        marginBottom: 2,
    },
    focusTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 24,
    },
    actionContent: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    actionSubtitle: {
        fontSize: 14,
    },
    playButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
