import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { QuoteCanvas } from '../../components/QuoteCanvas';
import quotesData from '../../data/quotes.json';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

const BACKGROUNDS = [
    '#FFFFFF', '#000000', '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9',
    '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9'
];

const TEXT_COLORS = ['#000000', '#FFFFFF', '#333333', '#555555'];

export default function EditorScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useTheme();
    const canvasRef = useRef(null);

    const quote = quotesData.find(q => q.id === id);

    const [options, setOptions] = useState({
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        fontFamily: 'System',
        textSize: 24,
    });

    if (!quote) {
        return <View style={styles.container}><Text>Quote not found</Text></View>;
    }

    const handleShare = async () => {
        try {
            const uri = await captureRef(canvasRef, {
                format: 'png',
                quality: 1,
            });
            await Sharing.shareAsync(uri);
        } catch (error) {
            Alert.alert('Error', 'Failed to share image');
            console.error(error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>Editor</Text>
                <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
                    <Ionicons name="share-outline" size={24} color={theme.tint} />
                </TouchableOpacity>
            </View>

            <View style={styles.canvasContainer}>
                <QuoteCanvas ref={canvasRef} quote={quote} options={options} />
            </View>

            <ScrollView style={styles.controls} showsVerticalScrollIndicator={false}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Background</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsRow}>
                    {BACKGROUNDS.map(bg => (
                        <TouchableOpacity
                            key={bg}
                            style={[styles.colorOption, { backgroundColor: bg, borderWidth: options.backgroundColor === bg ? 2 : 0, borderColor: theme.tint }]}
                            onPress={() => setOptions({ ...options, backgroundColor: bg })}
                        />
                    ))}
                </ScrollView>

                <Text style={[styles.sectionTitle, { color: theme.text }]}>Text Color</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsRow}>
                    {TEXT_COLORS.map(color => (
                        <TouchableOpacity
                            key={color}
                            style={[styles.colorOption, { backgroundColor: color, borderWidth: options.textColor === color ? 2 : 0, borderColor: theme.tint }]}
                            onPress={() => setOptions({ ...options, textColor: color })}
                        />
                    ))}
                </ScrollView>

                <Text style={[styles.sectionTitle, { color: theme.text }]}>Text Size</Text>
                <View style={styles.sizeControls}>
                    <TouchableOpacity onPress={() => setOptions({ ...options, textSize: Math.max(12, options.textSize - 2) })}>
                        <Ionicons name="remove-circle-outline" size={30} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.sizeValue, { color: theme.text }]}>{options.textSize}</Text>
                    <TouchableOpacity onPress={() => setOptions({ ...options, textSize: Math.min(48, options.textSize + 2) })}>
                        <Ionicons name="add-circle-outline" size={30} color={theme.text} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        padding: 5,
    },
    shareButton: {
        padding: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    canvasContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    controls: {
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    sizeControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
    },
    sizeValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
