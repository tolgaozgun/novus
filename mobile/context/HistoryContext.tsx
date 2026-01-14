import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote } from '../types';

interface HistoryContextType {
    history: Quote[];
    addToHistory: (quote: Quote) => Promise<void>;
    clearHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<Quote[]>([]);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const savedHistory = await AsyncStorage.getItem('userHistory');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    };

    const addToHistory = async (quote: Quote) => {
        try {
            // Avoid duplicates at the top of the list
            const newHistory = [quote, ...history.filter(q => q.id !== quote.id)].slice(0, 50);
            setHistory(newHistory);
            await AsyncStorage.setItem('userHistory', JSON.stringify(newHistory));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    };

    const clearHistory = async () => {
        try {
            setHistory([]);
            await AsyncStorage.removeItem('userHistory');
        } catch (error) {
            console.error('Failed to clear history:', error);
        }
    };

    return (
        <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};
