import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { QuoteCard } from '../../components/QuoteCard';
import quotesData from '../../data/quotes.json';
import { Quote } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export default function DiscoveryScreen() {
    const router = useRouter();
    const [quotes] = useState<Quote[]>(quotesData);
    const { isFavorite, toggleFavorite } = useFavorites();
    const { theme } = useTheme();

    const handleShare = (quote: Quote) => {
        console.log('Share', quote);
        // Implement share logic later
    };

    const renderItem = ({ item }: { item: Quote }) => (
        <View style={styles.pageContainer}>
            <QuoteCard
                quote={item}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
                onShare={() => handleShare(item)}
            />
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Background Elements */}
            <LinearGradient
                colors={[theme.accent, 'transparent']}
                style={styles.backgroundGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />
            <View style={[styles.orb, { backgroundColor: theme.accentSecondary, top: height * 0.1, left: -50 }]} />
            <View style={[styles.orb, { backgroundColor: theme.accent, bottom: height * 0.2, right: -50 }]} />

            <FlatList
                data={quotes}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                snapToInterval={height}
                getItemLayout={(data, index) => ({
                    length: height,
                    offset: height * index,
                    index,
                })}
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
    orb: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        opacity: 0.2,
        filter: 'blur(50px)',
    },
    pageContainer: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
