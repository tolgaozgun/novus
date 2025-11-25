import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { QuoteCard } from '../components/QuoteCard';
import quotesData from '../data/quotes.json';
import { Quote } from '../types';
import { Colors } from '../constants/Colors';

import { useFavorites } from '../context/FavoritesContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { useTheme } from '../context/ThemeContext';

const { height } = Dimensions.get('window');

export default function FeedScreen() {
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

            <View style={styles.topActions}>
                <TouchableOpacity onPress={() => router.push('/favorites')} style={styles.iconButtonWrapper}>
                    <BlurView intensity={20} tint="dark" style={styles.iconButton}>
                        <Ionicons name="albums-outline" size={24} color={theme.icon} />
                    </BlurView>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconButtonWrapper}>
                    <BlurView intensity={20} tint="dark" style={styles.iconButton}>
                        <Ionicons name="settings-outline" size={24} color={theme.icon} />
                    </BlurView>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageContainer: {
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topActions: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 10,
        gap: 15,
    },
    iconButtonWrapper: {
        marginBottom: 10,
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
});
