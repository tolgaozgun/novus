import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '../constants/Colors';

type ThemeType = typeof Themes.dark;

interface ThemeContextType {
    theme: ThemeType;
    setThemeId: (id: string) => Promise<void>;
    currentThemeId: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentThemeId, setCurrentThemeId] = useState<string>('dark');

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const storedThemeId = await AsyncStorage.getItem('@theme_pref');
            if (storedThemeId && Themes[storedThemeId as keyof typeof Themes]) {
                setCurrentThemeId(storedThemeId);
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
        }
    };

    const setThemeId = async (id: string) => {
        if (Themes[id as keyof typeof Themes]) {
            setCurrentThemeId(id);
            await AsyncStorage.setItem('@theme_pref', id);
        }
    };

    const theme = Themes[currentThemeId as keyof typeof Themes];

    return (
        <ThemeContext.Provider value={{ theme, setThemeId, currentThemeId }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
