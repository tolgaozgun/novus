import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { QuoteCard } from '../../components/QuoteCard';
import { Quote } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import quotesData from '../../data/quotes.json';

const { width, height } = Dimensions.get('window');

export default function CollectionDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const { isFavorite, toggleFavorite } = useFavorites();

    const category = Array.isArray(id) ? id[0] : id;
    const collectionQuotes = quotesData.filter(q => q.category === category);

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
                <Text style={[styles.title, { color: theme.text }]}>{category}</Text>
            </BlurView>

            <FlatList
                data={collectionQuotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
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
});
