import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useJournal } from '../../context/JournalContext';
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

export default function DiaryDetailScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { id } = useLocalSearchParams();
    const { entries, deleteEntry } = useJournal();

    const entry = entries.find(e => e.id === id);

    if (!entry) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: theme.text }}>Entry not found.</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: theme.accent }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteEntry(entry.id);
                        router.back();
                    }
                }
            ]
        );
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
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>
                    {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={24} color={theme.text} />
                </TouchableOpacity>
            </BlurView>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <View style={[styles.moodContainer, { backgroundColor: theme.cardBackground }]}>
                        <View style={[styles.moodIcon, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                            <Ionicons name={MOOD_ICONS[entry.mood] as any} size={40} color={theme.accent} />
                        </View>
                        <Text style={[styles.moodLabel, { color: theme.text }]}>Feeling {entry.mood}</Text>
                    </View>
                </View>

                {entry.topics.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>FOCUS AREA</Text>
                        <View style={styles.topicsContainer}>
                            {entry.topics.map((topic, index) => (
                                <View key={index} style={[styles.topicTag, { backgroundColor: theme.cardBackground }]}>
                                    <Text style={[styles.topicText, { color: theme.text }]}>{topic}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {entry.note && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>NOTES</Text>
                        <View style={[styles.noteCard, { backgroundColor: theme.cardBackground }]}>
                            <Text style={[styles.noteText, { color: theme.text }]}>{entry.note}</Text>
                        </View>
                    </View>
                )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    deleteButton: {
        padding: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
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
    moodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
    },
    moodIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    moodLabel: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    topicTag: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
    },
    topicText: {
        fontSize: 16,
        fontWeight: '500',
    },
    noteCard: {
        padding: 20,
        borderRadius: 20,
    },
    noteText: {
        fontSize: 16,
        lineHeight: 26,
    },
});
