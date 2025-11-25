import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useFavorites } from '../context/FavoritesContext';
import quotesData from '../data/quotes.json';
import { Quote } from '../types';
import { useTheme } from '../context/ThemeContext';

export default function FavoritesScreen() {
    const router = useRouter();
    const { favorites, toggleFavorite } = useFavorites();
    const { theme } = useTheme();

    const favoriteQuotes = quotesData.filter((quote) => favorites.includes(quote.id));

    const renderItem = ({ item }: { item: Quote }) => (
        <View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: 'rgba(255,255,255,0.1)' }]}>
            <Text style={[styles.quoteText, { color: theme.text }]}>"{item.text}"</Text>
            <Text style={[styles.author, { color: theme.textSecondary }]}>- {item.author}</Text>
            <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.removeButton}
            >
                <Ionicons name="trash-outline" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <BlurView intensity={80} tint="dark" style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>Your Collection</Text>
            </BlurView>

            <FlatList
                data={favoriteQuotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No favorites yet.</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    backButton: {
        marginRight: 15,
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
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
    },
    quoteText: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
    author: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    removeButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
    },
    emptyContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
    },
});
