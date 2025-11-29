import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import quotesData from '../data/quotes.json';

const { width, height } = Dimensions.get('window');

export default function CollectionsScreen() {
    const router = useRouter();
    const { theme } = useTheme();

    // Extract unique categories
    const categories = Array.from(new Set(quotesData.map(q => q.category))).sort();

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
                <Text style={[styles.title, { color: theme.text }]}>Collections</Text>
            </BlurView>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.grid}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            style={[styles.card, { backgroundColor: theme.cardBackground }]}
                            onPress={() => router.push(`/collection/${category}`)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                                <Ionicons name="albums-outline" size={32} color={theme.accent} />
                            </View>
                            <Text style={[styles.categoryName, { color: theme.text }]}>{category}</Text>
                            <Text style={[styles.count, { color: theme.textSecondary }]}>
                                {quotesData.filter(q => q.category === category).length} Quotes
                            </Text>
                        </TouchableOpacity>
                    ))}
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    card: {
        width: (width - 55) / 2, // 2 columns with gap
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
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    count: {
        fontSize: 12,
    },
});
