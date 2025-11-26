import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useJournal, JournalEntry } from '../../context/JournalContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function JournalScreen() {
    const { theme } = useTheme();
    const { entries, deleteEntry } = useJournal();

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    const renderItem = ({ item }: { item: JournalEntry }) => (
        <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: 'rgba(255,255,255,0.1)' }]}>
            <View style={styles.cardHeader}>
                <View style={styles.moodContainer}>
                    <Ionicons name={getMoodIcon(item.mood) as any} size={24} color={theme.text} />
                    <Text style={[styles.moodText, { color: theme.text }]}>{item.mood}</Text>
                </View>
                <Text style={[styles.date, { color: theme.textSecondary }]}>{formatDate(item.date)}</Text>
            </View>

            {item.topics.length > 0 && (
                <View style={styles.topicsRow}>
                    {item.topics.map(topic => (
                        <View key={topic} style={[styles.topicChip, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                            <Text style={[styles.topicText, { color: theme.textSecondary }]}>{topic}</Text>
                        </View>
                    ))}
                </View>
            )}

            {item.note ? (
                <Text style={[styles.note, { color: theme.text }]}>{item.note}</Text>
            ) : null}

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteEntry(item.id)}
            >
                <Ionicons name="trash-outline" size={18} color={theme.textSecondary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <BlurView intensity={80} tint="dark" style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                <Text style={[styles.title, { color: theme.text }]}>Journal</Text>
            </BlurView>

            <FlatList
                data={entries}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No entries yet.</Text>
                        <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>Complete a daily check-in to see your history.</Text>
                    </View>
                }
            />
        </View>
    );
}

const getMoodIcon = (mood: string) => {
    switch (mood) {
        case 'happy': return 'happy-outline';
        case 'excited': return 'flash-outline';
        case 'neutral': return 'remove-circle-outline';
        case 'tired': return 'bed-outline';
        case 'anxious': return 'pulse-outline';
        case 'sad': return 'sad-outline';
        default: return 'help-circle-outline';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    moodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    moodText: {
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    date: {
        fontSize: 12,
    },
    topicsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    topicChip: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    topicText: {
        fontSize: 12,
    },
    note: {
        fontSize: 14,
        lineHeight: 20,
    },
    deleteButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    emptySubtext: {
        textAlign: 'center',
    },
});
