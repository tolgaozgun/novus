import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Mood = 'happy' | 'sad' | 'anxious' | 'neutral' | 'excited' | 'tired';

export interface JournalEntry {
    id: string;
    date: string;
    mood: Mood;
    topics: string[];
    note: string;
    quoteId?: string;
}

interface JournalContextType {
    entries: JournalEntry[];
    addEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => Promise<void>;
    deleteEntry: (id: string) => Promise<void>;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: React.ReactNode }) {
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            const stored = await AsyncStorage.getItem('@journal_entries');
            if (stored) {
                setEntries(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load journal entries', e);
        }
    };

    const addEntry = async (entry: Omit<JournalEntry, 'id' | 'date'>) => {
        const newEntry: JournalEntry = {
            ...entry,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };
        const updated = [newEntry, ...entries];
        setEntries(updated);
        await AsyncStorage.setItem('@journal_entries', JSON.stringify(updated));
    };

    const deleteEntry = async (id: string) => {
        const updated = entries.filter(e => e.id !== id);
        setEntries(updated);
        await AsyncStorage.setItem('@journal_entries', JSON.stringify(updated));
    };

    return (
        <JournalContext.Provider value={{ entries, addEntry, deleteEntry }}>
            {children}
        </JournalContext.Provider>
    );
}

export function useJournal() {
    const context = useContext(JournalContext);
    if (!context) {
        throw new Error('useJournal must be used within a JournalProvider');
    }
    return context;
}
