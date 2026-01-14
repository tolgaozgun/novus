import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const topicsList = [
    'Motivation', 'Peace', 'Love', 'Focus', 'Strength',
    'Gratitude', 'Confidence', 'Healing', 'Success'
];

export default function TopicsScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme } = useTheme();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const toggleTopic = (topic: string) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter(t => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const handleNext = () => {
        router.push({
            pathname: '/checkin/note',
            params: { ...params, topics: selectedTopics.join(',') }
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.title, { color: theme.text }]}>What do you need?</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Select up to 3 topics</Text>

            <ScrollView contentContainerStyle={styles.topicsContainer}>
                <View style={styles.topicsGrid}>
                    {topicsList.map((topic) => (
                        <TouchableOpacity
                            key={topic}
                            style={[
                                styles.topicChip,
                                {
                                    backgroundColor: selectedTopics.includes(topic) ? theme.tint : theme.cardBackground,
                                    borderColor: theme.textSecondary
                                }
                            ]}
                            onPress={() => toggleTopic(topic)}
                        >
                            <Text style={[
                                styles.topicText,
                                { color: selectedTopics.includes(topic) ? '#FFF' : theme.text }
                            ]}>{topic}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                style={[styles.nextButton, { backgroundColor: theme.tint, opacity: selectedTopics.length > 0 ? 1 : 0.5 }]}
                onPress={handleNext}
                disabled={selectedTopics.length === 0}
            >
                <Text style={styles.nextButtonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    topicsContainer: {
        flexGrow: 1,
    },
    topicsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },
    topicChip: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    topicText: {
        fontSize: 16,
        fontWeight: '500',
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 30,
        marginBottom: 20,
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
});
