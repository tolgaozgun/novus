import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Quote } from '../types';
import * as Haptics from 'expo-haptics';
import { shareQuoteAsImage } from '../utils/share';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

interface QuoteCardProps {
    quote: Quote;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    onShare?: () => void;
    mode?: 'full' | 'compact';
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
    quote,
    isFavorite,
    onToggleFavorite,
    mode = 'full',
}) => {
    const cardRef = useRef<View>(null);
    const { theme } = useTheme();

    const handleFavorite = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onToggleFavorite();
    };

    const handleShare = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await shareQuoteAsImage(cardRef);
    };

    if (mode === 'compact') {
        return (
            <View style={[styles.compactContainer, { backgroundColor: theme.cardBackground }]}>
                <View style={styles.compactContent}>
                    <Text style={[styles.compactCategory, { color: theme.accent }]}>{quote.category.toUpperCase()}</Text>
                    <Text style={[styles.compactText, { color: theme.text }]}>"{quote.text}"</Text>
                    <Text style={[styles.compactAuthor, { color: theme.textSecondary }]}>- {quote.author}</Text>
                </View>

                <View style={styles.compactActions}>
                    <TouchableOpacity onPress={handleFavorite} style={styles.compactActionButton}>
                        <Ionicons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFavorite ? theme.heart : theme.textSecondary}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare} style={styles.compactActionButton}>
                        <Ionicons name="share-social-outline" size={24} color={theme.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.contentContainer}>
                <View ref={cardRef} collapsable={false} style={[styles.captureContainer, { backgroundColor: theme.background }]}>
                    <BlurView intensity={20} tint="dark" style={[styles.card, { backgroundColor: theme.cardBackground }]}>
                        <Text style={[styles.category, { color: theme.accent }]}>{quote.category.toUpperCase()}</Text>
                        <Text style={[styles.text, { color: theme.text }]}>"{quote.text}"</Text>
                        <Text style={[styles.author, { color: theme.textSecondary }]}>- {quote.author}</Text>
                    </BlurView>
                </View>
            </Animated.View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={handleFavorite}>
                    <BlurView intensity={20} tint="dark" style={styles.actionButton}>
                        <Ionicons
                            name={isFavorite ? 'heart' : 'heart-outline'}
                            size={32}
                            color={isFavorite ? theme.heart : theme.icon}
                        />
                    </BlurView>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShare}>
                    <BlurView intensity={20} tint="dark" style={styles.actionButton}>
                        <Ionicons name="share-social-outline" size={32} color={theme.icon} />
                    </BlurView>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    contentContainer: {
        width: width * 0.85,
        alignItems: 'center',
    },
    captureContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    card: {
        padding: 30,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    category: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 20,
    },
    text: {
        fontSize: 28,
        fontWeight: '300',
        textAlign: 'center',
        lineHeight: 40,
        fontFamily: 'System',
    },
    author: {
        fontSize: 16,
        marginTop: 20,
        fontStyle: 'italic',
    },
    actions: {
        position: 'absolute',
        bottom: 80,
        right: 30,
        gap: 20,
    },
    actionButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    // Compact styles
    compactContainer: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
        width: '100%',
    },
    compactContent: {
        marginBottom: 15,
    },
    compactCategory: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 10,
        opacity: 0.8,
    },
    compactText: {
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 26,
        marginBottom: 10,
    },
    compactAuthor: {
        fontSize: 14,
        fontStyle: 'italic',
        opacity: 0.7,
    },
    compactActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 15,
    },
    compactActionButton: {
        padding: 5,
    },
});
