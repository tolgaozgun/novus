import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function NoteScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { theme } = useTheme();
    const [note, setNote] = useState('');

    const handleNext = () => {
        router.push({
            pathname: '/checkin/result',
            params: { ...params, note }
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.title, { color: theme.text }]}>Journaling</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Write down your thoughts (optional)</Text>

                    <TextInput
                        style={[styles.input, { color: theme.text, backgroundColor: theme.cardBackground, borderColor: theme.textSecondary }]}
                        multiline
                        placeholder="Today I feel..."
                        placeholderTextColor={theme.textSecondary}
                        value={note}
                        onChangeText={setNote}
                    />

                    <TouchableOpacity
                        style={[styles.nextButton, { backgroundColor: theme.tint }]}
                        onPress={handleNext}
                    >
                        <Text style={styles.nextButtonText}>Complete Check-in</Text>
                        <Ionicons name="checkmark" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginTop: 40,
        marginBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        padding: 20,
        fontSize: 16,
        textAlignVertical: 'top',
        marginBottom: 20,
        borderWidth: 1,
    },
    nextButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 30,
        marginBottom: 20,
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
});
