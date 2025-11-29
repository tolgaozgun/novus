import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SelectionOptionProps {
    label: string;
    selected: boolean;
    onSelect: () => void;
    icon?: any; // Ionicons name
}

export default function SelectionOption({ label, selected, onSelect, icon }: SelectionOptionProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    backgroundColor: selected ? theme.accent : theme.cardBackground,
                    borderColor: selected ? theme.accent : 'rgba(255,255,255,0.1)',
                }
            ]}
            onPress={onSelect}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={selected ? '#000' : theme.text}
                        style={{ marginRight: 12 }}
                    />
                )}
                <Text
                    style={[
                        styles.label,
                        { color: selected ? '#000' : theme.text }
                    ]}
                >
                    {label}
                </Text>
            </View>

            {selected && (
                <Ionicons name="checkmark-circle" size={24} color="#000" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
});
