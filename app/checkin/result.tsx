import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useJournal, Mood } from '../../context/JournalContext';
import { Ionicons } from '@expo/vector-icons';
import quotesData from '../../data/quotes.json';
import { Quote } from '../../types';

export default function ResultScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme } = useTheme();
    const { addEntry } = useJournal();
    const [quote, setQuote] = useState<Quote | null>(null);
    const [saving, setSaving] = useState(true);

    useEffect(() => {
        const saveCheckIn = async () => {
            // 1. Select a quote
            const mood = params.mood as Mood;
            const topics = (params.topics as string)?.split(',') || [];
            const note = params.note as string;

            // Simple random selection for now, can be improved
            const randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
            setQuote(randomQuote);

            // 2. Save to Journal
            await addEntry({
                mood,
                topics,
                note,
                quoteId: randomQuote.id,
            });

            setSaving(false);
        };

        saveCheckIn();
    }, []);

    if (saving || !quote) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.tint} />
                <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Personalizing your quote...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.content}>
                <Text style={[styles.label, { color: theme.tint }]}>YOUR DAILY QUOTE</Text>

                <View style={styles.quoteContainer}>
                    <Text style={[styles.quoteText, { color: theme.text }]}>"{quote.text}"</Text>
                    <Text style={[styles.author, { color: theme.textSecondary }]}>- {quote.author}</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: theme.cardBackground }]}
                        onPress={() => router.push('/(tabs)/journal')}
                    >
                        <Ionicons name="book-outline" size={24} color={theme.text} />
                        <Text style={[styles.actionText, { color: theme.text }]}>View Journal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, { backgroundColor: theme.tint }]}
                        onPress={() => router.push(`/editor/${quote.id}`)}
                    >
                        <Ionicons name="color-palette-outline" size={24} color="#FFF" />
                        <Text style={[styles.actionText, { color: '#FFF' }]}>Customize & Share</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Text style={[styles.homeText, { color: theme.textSecondary }]}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginBottom: 40,
    },
    quoteContainer: {
        marginBottom: 60,
        alignItems: 'center',
    },
    quoteText: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 40,
    },
    author: {
        fontSize: 18,
        fontStyle: 'italic',
    },
    actions: {
        width: '100%',
        gap: 15,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 30,
        width: '100%',
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    homeButton: {
        marginTop: 30,
        padding: 10,
    },
    homeText: {
        fontSize: 16,
    },
});
