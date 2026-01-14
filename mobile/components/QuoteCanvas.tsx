import React, { forwardRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Quote } from '../types';

interface QuoteCanvasProps {
    quote: Quote;
    options: {
        backgroundColor: string;
        textColor: string;
        fontFamily: string;
        backgroundImage?: string;
        textSize: number;
    };
}

const { width } = Dimensions.get('window');
const CANVAS_SIZE = width - 40;

export const QuoteCanvas = forwardRef<View, QuoteCanvasProps>(({ quote, options }, ref) => {
    const containerStyle = {
        backgroundColor: options.backgroundImage ? 'transparent' : options.backgroundColor,
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
    };

    const textStyle = {
        color: options.textColor,
        fontFamily: options.fontFamily,
        fontSize: options.textSize,
    };

    const content = (
        <View style={[styles.inner, { padding: 30 }]}>
            <Text style={[styles.text, textStyle]}>{quote.text}</Text>
            <Text style={[styles.author, { color: options.textColor, fontFamily: options.fontFamily }]}>
                - {quote.author}
            </Text>
        </View>
    );

    return (
        <View ref={ref} collapsable={false} style={[styles.container, containerStyle]}>
            {options.backgroundImage ? (
                <ImageBackground source={{ uri: options.backgroundImage }} style={styles.background} resizeMode="cover">
                    {content}
                </ImageBackground>
            ) : (
                content
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600',
    },
    author: {
        fontSize: 16,
        opacity: 0.8,
    },
});
