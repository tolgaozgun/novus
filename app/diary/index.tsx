import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useJournal, JournalEntry } from '../../context/JournalContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const MOOD_ICONS: Record<string, string> = {
    happy: 'happy',
    excited: 'flash',
    neutral: 'remove',
    tired: 'bed',
    anxious: 'thunderstorm',
    sad: 'rainy',
};

export default function DiaryScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { entries } = useJournal();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const renderItem = ({ item }: { item: JournalEntry }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => router.push(`/diary/${item.id}`)}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.moodIcon, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                    <Ionicons name={MOOD_ICONS[item.mood] as any} size={20} color={theme.accent} />
                </View>
                <View style={styles.dateContainer}>
                    <Text style={[styles.date, { color: theme.text }]}>{formatDate(item.date)}</Text>
                    <Text style={[styles.time, { color: theme.textSecondary }]}>
                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            </View>

            {item.topics.length > 0 && (
                <View style={styles.topicsContainer}>
                    {item.topics.map((topic, index) => (
                        <View key={index} style={[styles.topicTag, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Text style={[styles.topicText, { color: theme.textSecondary }]}>{topic}</Text>
                        </View>
                    ))}
                </View>
            )}

            {item.note && (
                <Text style={[styles.notePreview, { color: theme.textSecondary }]} numberOfLines={2}>
                    {item.note}
                </Text>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <BlurView intensity={80} tint="dark" style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>My Diary</Text>
                <TouchableOpacity onPress={() => router.push('/reflection/mood')} style={styles.addButton}>
                    <Ionicons name="add" size={24} color={theme.text} />
                </TouchableOpacity>
            </BlurView>

            <FlatList
                data={entries}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Ionicons name="book-outline" size={64} color={theme.textSecondary} style={{ opacity: 0.5 }} />
                        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No entries yet.</Text>
                        <TouchableOpacity
                            style={[styles.ctaButton, { backgroundColor: theme.accent }]}
                            onPress={() => router.push('/reflection/mood')}
                        >
                            <Text style={[styles.ctaText, { color: '#000' }]}>Write First Entry</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    addButton: {
        padding: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
    },
    card: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    moodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    dateContainer: {
        flex: 1,
    },
    date: {
        fontSize: 16,
        fontWeight: '600',
    },
    time: {
        fontSize: 12,
    },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    topicTag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    topicText: {
        fontSize: 12,
        fontWeight: '500',
    },
    notePreview: {
        fontSize: 14,
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        marginTop: 20,
        marginBottom: 30,
    },
    ctaButton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 30,
    },
    ctaText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
