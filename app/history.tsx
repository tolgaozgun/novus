import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import { useHistory } from '../context/HistoryContext';
import { useFavorites } from '../context/FavoritesContext';
import { QuoteCard } from '../components/QuoteCard';
import { Quote } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function HistoryScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { history, clearHistory } = useHistory();
    const { isFavorite, toggleFavorite } = useFavorites();

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
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={theme.text}
                    style={{ position: 'absolute', left: 20, bottom: 20 }}
                    onPress={() => router.back()}
                />
                <Text style={[styles.title, { color: theme.text }]}>History</Text>
                {history.length > 0 && (
                    <Ionicons
                        name="trash-outline"
                        size={24}
                        color={theme.text}
                        style={{ position: 'absolute', right: 20, bottom: 20 }}
                        onPress={clearHistory}
                    />
                )}
            </BlurView>

            {history.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="time-outline" size={64} color={theme.textSecondary} />
                    <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No history yet</Text>
                    <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
                        Quotes you view will appear here.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
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
        flexDirection: 'row',
        justifyContent: 'center',
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
