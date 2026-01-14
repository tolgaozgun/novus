import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useJournal, Mood } from '../../context/JournalContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function ReflectionNotesScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const params = useLocalSearchParams();
    const { mood, focus } = params;
    const { addEntry } = useJournal();
    const [note, setNote] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (saving) return;
        setSaving(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        try {
            await addEntry({
                mood: mood as Mood,
                topics: [focus as string],
                note: note.trim(),
            });

            // Navigate to summary or back to home? 
            // Let's go to a summary/success screen or just back to profile/diary.
            // For now, let's go to a simple summary screen.
            router.push('/reflection/summary');
        } catch (error) {
            console.error('Failed to save entry', error);
            setSaving(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <LinearGradient
                    colors={[theme.accent, 'transparent']}
                    style={styles.backgroundGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.stepIndicator, { color: theme.textSecondary }]}>Step 3 of 3</Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}
                >
                    <Text style={[styles.title, { color: theme.text }]}>Any thoughts?</Text>
                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Write down what's on your mind. It's safe here.
                    </Text>

                    <View style={[styles.inputContainer, { backgroundColor: theme.cardBackground }]}>
                        <TextInput
                            style={[styles.input, { color: theme.text }]}
                            placeholder="Start typing..."
                            placeholderTextColor={theme.textSecondary}
                            multiline
                            value={note}
                            onChangeText={setNote}
                            autoFocus
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.saveButton, { backgroundColor: theme.accent }]}
                        onPress={handleSave}
                        disabled={saving}
                    >
                        <Text style={[styles.saveButtonText, { color: '#000' }]}>
                            {saving ? 'Saving...' : 'Save Entry'}
                        </Text>
                        {!saving && <Ionicons name="checkmark" size={24} color="#000" />}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    backButton: {
        padding: 10,
    },
    stepIndicator: {
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.8,
    },
    inputContainer: {
        flex: 1,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        lineHeight: 28,
        height: '100%',
        textAlignVertical: 'top',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 30,
        gap: 10,
        marginBottom: 20,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
