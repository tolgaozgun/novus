import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { QuoteCard } from '../../components/QuoteCard';
import { Quote } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

import quotesData from '../../data/quotes.json';

const { width, height } = Dimensions.get('window');

export default function FavoritesScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { favorites, isFavorite, toggleFavorite } = useFavorites();

    const favoriteQuotes = quotesData.filter(quote => favorites.includes(quote.id));

    const renderItem = ({ item }: { item: Quote }) => (
        <View style={styles.quoteContainer}>
            <QuoteCard
                quote={item}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onShare={() => console.log('Share', item)}
                mode="compact"
            />
        </View>
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
                <Text style={[styles.title, { color: theme.text }]}>My Favorites</Text>
            </BlurView>

            {favorites.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="heart-outline" size={64} color={theme.textSecondary} />
                    <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No favorites yet</Text>
                    <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
                        Tap the heart icon on quotes you love to save them here.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteQuotes}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
    },
    quoteContainer: {
        marginBottom: 20,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    emptySubtext: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.7,
    },
});
