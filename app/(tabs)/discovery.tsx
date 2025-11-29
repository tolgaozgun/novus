import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { QuoteCard } from '../../components/QuoteCard';
import quotesData from '../../data/quotes.json';
import { Quote } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import { useHistory } from '../../context/HistoryContext';
import { useUser } from '../../context/UserContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

// Helper to map focus ID to category
const FOCUS_TO_CATEGORY: Record<string, string> = {
    anxiety: 'Mindfulness',
    depression: 'Hope',
    stress: 'Mindfulness',
    confidence: 'Confidence',
    focus: 'Focus',
    sleep: 'Mindfulness',
    productivity: 'Work',
    mindset: 'Mindset',
    discipline: 'Habit',
    calm: 'Mindfulness',
    leadership: 'Leadership',
    default: 'Growth',
};

export default function DiscoveryScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [quotes, setQuotes] = useState<Quote[]>(quotesData);
    const [filter, setFilter] = useState<'all' | 'focus'>('all');
    const { isFavorite, toggleFavorite } = useFavorites();
    const { addToHistory } = useHistory();
    const { user } = useUser();
    const { theme } = useTheme();

    useEffect(() => {
        if (params.filter === 'focus') {
            setFilter('focus');
        }
    }, [params.filter]);

    useEffect(() => {
        if (filter === 'all') {
            setQuotes(quotesData);
        } else {
            const focusId = user.dailyFocusId || 'default';
            const category = FOCUS_TO_CATEGORY[focusId] || 'Growth';
            // Filter by category, or fallback to all if no matches (shouldn't happen with good data)
            const filtered = quotesData.filter(q => q.category === category);
            setQuotes(filtered.length > 0 ? filtered : quotesData);
        }
    }, [filter, user.dailyFocusId]);

    const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const currentItem = viewableItems[0].item;
            addToHistory(currentItem);
        }
    }).current;

    const handleShare = (quote: Quote) => {
        console.log('Share', quote);
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

            {/* Filter Switch */}
            <View style={styles.filterContainer}>
                <BlurView intensity={80} tint="dark" style={styles.filterSwitch}>
                    <TouchableOpacity
                        style={[styles.filterOption, filter === 'all' && { backgroundColor: theme.accent }]}
                        onPress={() => setFilter('all')}
                    >
                        <Text style={[styles.filterText, { color: filter === 'all' ? '#000' : theme.text }]}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, filter === 'focus' && { backgroundColor: theme.accent }]}
                        onPress={() => setFilter('focus')}
                    >
                        <Text style={[styles.filterText, { color: filter === 'focus' ? '#000' : theme.text }]}>Today's Focus</Text>
                    </TouchableOpacity>
                </BlurView>
            </View>

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
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
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
    filterContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    filterSwitch: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 4,
        overflow: 'hidden',
    },
    filterOption: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    filterText: {
        fontWeight: '600',
        fontSize: 14,
    },
});
