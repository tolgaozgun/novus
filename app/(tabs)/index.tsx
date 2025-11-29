import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useHistory } from '../../context/HistoryContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

import quotesData from '../../data/quotes.json';

const { width, height } = Dimensions.get('window');

const ACTION_MAPPING: Record<string, { label: string; icon: string; actionTitle: string; actionSubtitle: string; actionIcon: string; collectionCategory: string; description: string }> = {
    // Wellness Focus
    anxiety: {
        label: 'Reducing Anxiety', icon: 'cloud',
        actionTitle: 'Take a Deep Breath', actionSubtitle: '2 min breathing exercise', actionIcon: 'leaf',
        collectionCategory: 'Mindfulness',
        description: 'Inhale deeply through your nose for 4 seconds, hold for 7 seconds, and exhale slowly through your mouth for 8 seconds. Repeat this cycle 4 times to calm your nervous system.'
    },
    depression: {
        label: 'Managing Mood', icon: 'rainy',
        actionTitle: 'Journal Your Thoughts', actionSubtitle: 'Write down 3 feelings', actionIcon: 'create',
        collectionCategory: 'Hope',
        description: 'Take a moment to write down three emotions you are feeling right now. Acknowledging them is the first step to processing them.'
    },
    stress: {
        label: 'Handling Stress', icon: 'thunderstorm',
        actionTitle: 'Quick Meditation', actionSubtitle: '5 min stress relief', actionIcon: 'radio',
        collectionCategory: 'Mindfulness',
        description: 'Find a quiet comfortable seat. Close your eyes. Focus entirely on the sensation of your breath entering and leaving your body.'
    },
    confidence: {
        label: 'Building Confidence', icon: 'sunny',
        actionTitle: 'Power Pose', actionSubtitle: 'Stand tall for 2 mins', actionIcon: 'body',
        collectionCategory: 'Confidence',
        description: 'Stand with your feet apart, hands on your hips, and chin up. Holding this "Wonder Woman" pose for 2 minutes can boost testosterone and lower cortisol.'
    },
    focus: {
        label: 'Improving Focus', icon: 'glasses',
        actionTitle: 'Clear Distractions', actionSubtitle: 'Turn off notifications', actionIcon: 'notifications-off',
        collectionCategory: 'Focus',
        description: 'Identify your biggest distraction right now (phone, email, noise) and eliminate it for the next 25 minutes of deep work.'
    },
    sleep: {
        label: 'Better Sleep', icon: 'moon',
        actionTitle: 'Wind Down', actionSubtitle: 'No screens for 30 mins', actionIcon: 'bed',
        collectionCategory: 'Mindfulness',
        description: 'Turn off all screens. Read a physical book, stretch gently, or listen to calming music to signal to your body that it is time to rest.'
    },

    // Goals
    productivity: {
        label: 'Boost Productivity', icon: 'rocket',
        actionTitle: 'Top 3 Priorities', actionSubtitle: 'List today\'s main tasks', actionIcon: 'list',
        collectionCategory: 'Work',
        description: 'Write down the 3 most important tasks you must complete today. Do not start anything else until these are done.'
    },
    mindset: {
        label: 'Positive Mindset', icon: 'happy',
        actionTitle: 'Gratitude Practice', actionSubtitle: 'List 3 things you are grateful for', actionIcon: 'heart',
        collectionCategory: 'Mindset',
        description: 'Reflect on your day or week. Identify three specific things, big or small, that you are grateful for and write them down.'
    },
    discipline: {
        label: 'Build Discipline', icon: 'barbell',
        actionTitle: 'Do the Hardest Thing First', actionSubtitle: 'Eat the frog', actionIcon: 'checkbox',
        collectionCategory: 'Habit',
        description: 'Identify the one task you are dreading the most. Do it immediately. The rest of your day will feel easier and lighter.'
    },
    calm: {
        label: 'Find Calm', icon: 'leaf',
        actionTitle: 'Nature Walk', actionSubtitle: '10 min walk outside', actionIcon: 'walk',
        collectionCategory: 'Mindfulness',
        description: 'Step outside. Leave your phone behind if possible. Walk slowly and notice the trees, the sky, and the air on your skin.'
    },
    leadership: {
        label: 'Leadership Skills', icon: 'people',
        actionTitle: 'Active Listening', actionSubtitle: 'Listen more than you speak', actionIcon: 'ear',
        collectionCategory: 'Leadership',
        description: 'In your next conversation, focus entirely on understanding the other person. Do not interrupt or plan your response while they are speaking.'
    },

    // Default
    default: {
        label: 'Personal Growth', icon: 'star',
        actionTitle: 'Reflect on Your Day', actionSubtitle: 'What went well?', actionIcon: 'book',
        collectionCategory: 'Growth',
        description: 'Take a few minutes to review your day. What is one thing you learned? What is one thing you could have done better?'
    },
};

export default function DailyBriefingScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { user } = useUser();
    const { addToHistory } = useHistory();
    const [greeting, setGreeting] = useState('Good Morning');
    const [dailyQuote, setDailyQuote] = useState(quotesData[0]);
    const [focusData, setFocusData] = useState(ACTION_MAPPING['default']);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        // Pick a random quote
        const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
        setDailyQuote(randomQuote);
        addToHistory(randomQuote);
    }, []);

    useEffect(() => {
        // Pick focus area from user's selection or dailyFocusId
        if (user.dailyFocusId) {
            setFocusData(ACTION_MAPPING[user.dailyFocusId] || ACTION_MAPPING['default']);
        } else {
            const allFocusAreas = [...(user.wellnessFocus || []), ...(user.goals || [])];
            if (allFocusAreas.length > 0) {
                const randomFocusId = allFocusAreas[Math.floor(Math.random() * allFocusAreas.length)];
                setFocusData(ACTION_MAPPING[randomFocusId] || ACTION_MAPPING['default']);
            } else {
                setFocusData(ACTION_MAPPING['default']);
            }
        }
    }, [user.wellnessFocus, user.goals, user.dailyFocusId]);

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
                    <TouchableOpacity
                        style={[styles.profileButton, { backgroundColor: theme.cardBackground }]}
                        onPress={() => router.push('/(tabs)/profile')}
                    >
                        <Ionicons name="person" size={20} color={theme.text} />
                    </TouchableOpacity>
                </View>

                {/* Daily Fuel Card (Quote) */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>YOUR DAILY FUEL</Text>
                    <BlurView intensity={80} tint="dark" style={styles.quoteCard}>
                        <Ionicons name="chatbox-ellipses" size={32} color={theme.accent} style={styles.quoteIcon} />
                        <Text style={[styles.quoteText, { color: theme.text }]}>"{dailyQuote.text}"</Text>
                        <Text style={[styles.quoteAuthor, { color: theme.accent }]}>— {dailyQuote.author}</Text>

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
                        <View style={styles.focusHeader}>
                            <View style={[styles.focusIcon, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                                <Ionicons name={focusData.icon as any} size={24} color={theme.accent} />
                            </View>
                            <View style={styles.focusContent}>
                                <Text style={[styles.focusLabel, { color: theme.textSecondary }]}>Working on</Text>
                                <Text style={[styles.focusTitle, { color: theme.text }]}>{focusData.label}</Text>
                            </View>
                        </View>

                        <View style={styles.focusActions}>
                            <TouchableOpacity
                                style={[styles.focusButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}
                                onPress={() => router.push('/change-focus')}
                            >
                                <Text style={[styles.focusButtonText, { color: theme.text }]}>Change Focus</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.focusButton, { backgroundColor: theme.accent }]}
                                onPress={() => router.push({ pathname: '/(tabs)/discovery', params: { filter: 'focus' } })}
                            >
                                <Text style={[styles.focusButtonText, { color: '#000', fontWeight: 'bold' }]}>Work</Text>
                                <Ionicons name="arrow-forward" size={16} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Daily Action */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>DAILY ACTION</Text>
                    <TouchableOpacity
                        style={[styles.actionCard, { backgroundColor: theme.accent }]}
                        onPress={() => router.push('/reflection/mood')}
                    >
                        <View style={styles.actionContent}>
                            <Text style={[styles.actionTitle, { color: '#000' }]}>Reflect on Your Day</Text>
                            <Text style={[styles.actionSubtitle, { color: 'rgba(0,0,0,0.7)' }]}>Log your mood & thoughts</Text>
                        </View>
                        <View style={[styles.playButton, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                            <Ionicons name="journal" size={24} color="#000" />
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
        padding: 20,
        borderRadius: 24,
    },
    focusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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
    focusActions: {
        flexDirection: 'row',
        gap: 10,
    },
    focusButton: {
        flex: 1,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    focusButtonText: {
        fontSize: 14,
        fontWeight: '500',
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
