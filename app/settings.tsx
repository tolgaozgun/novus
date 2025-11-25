import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { Themes } from '../constants/Colors';

export default function SettingsScreen() {
    const router = useRouter();
    const { theme, setThemeId, currentThemeId } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <BlurView intensity={80} tint="dark" style={[styles.header, { borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
            </BlurView>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.sectionTitle, { color: theme.accent }]}>APPEARANCE</Text>

                <View style={styles.themesContainer}>
                    {Object.values(Themes).map((t) => (
                        <TouchableOpacity
                            key={t.id}
                            style={[
                                styles.themeOption,
                                {
                                    backgroundColor: t.background,
                                    borderColor: currentThemeId === t.id ? theme.accent : 'rgba(255,255,255,0.1)'
                                }
                            ]}
                            onPress={() => setThemeId(t.id)}
                        >
                            <View style={styles.themePreview}>
                                <View style={[styles.colorDot, { backgroundColor: t.accent }]} />
                                <View style={[styles.colorDot, { backgroundColor: t.text }]} />
                            </View>
                            <Text style={[styles.themeName, { color: t.text }]}>{t.name}</Text>
                            {currentThemeId === t.id && (
                                <View style={[styles.checkIcon, { backgroundColor: theme.accent }]}>
                                    <Ionicons name="checkmark" size={12} color="#000" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
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
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 2,
        marginBottom: 20,
    },
    themesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
    },
    themeOption: {
        width: '47%',
        aspectRatio: 1.5,
        borderRadius: 15,
        padding: 15,
        borderWidth: 2,
        justifyContent: 'space-between',
    },
    themePreview: {
        flexDirection: 'row',
        gap: 8,
    },
    colorDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    themeName: {
        fontSize: 16,
        fontWeight: '600',
    },
    checkIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
