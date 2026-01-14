import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SelectionOptionProps {
    label: string;
    selected: boolean;
    onSelect: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    isButton?: boolean;
}

export default function SelectionOption({ label, selected, onSelect, icon, isButton }: SelectionOptionProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    borderColor: isButton ? 'transparent' : (selected ? theme.accent : 'rgba(255,255,255,0.1)'),
                    backgroundColor: isButton ? theme.accent : theme.cardBackground
                }
            ]}
            onPress={onSelect}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={isButton ? '#000' : (selected ? theme.accent : theme.textSecondary)}
                        style={styles.icon}
                    />
                )}
                <Text style={[
                    styles.label,
                    {
                        color: isButton ? '#000' : theme.text,
                        fontWeight: isButton ? 'bold' : 'normal',
                        textAlign: isButton ? 'center' : 'left',
                        flex: isButton ? 1 : 0
                    }
                ]}>
                    {label}
                </Text>
            </View>

            {!isButton && selected && (
                <View style={[styles.checkCircle, { backgroundColor: theme.accent }]}>
                    <Ionicons name="checkmark" size={14} color="#000" />
                </View>
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
    icon: {
        marginRight: 12,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
