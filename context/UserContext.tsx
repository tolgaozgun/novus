import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
    name: string;
    age: string;
    gender: string;
    motivationSources: string[];
    painPoints: string[];
    toneTriggers: string[];
    pledgeSigned: boolean;
    alarmTime: string | null;
    notificationsEnabled: boolean;
    notificationFrequency: string;
    appIcon: string;
    wellnessFocus: string[];
    wellnessObstacles: string[];
    moodBaseline: number;
    goals: string[];
    customGoal: string;
}

const defaultProfile: UserProfile = {
    name: 'Traveler',
    age: '',
    gender: '',
    motivationSources: [],
    painPoints: [],
    toneTriggers: [],
    pledgeSigned: false,
    alarmTime: null,
    notificationsEnabled: false,
    notificationFrequency: '5',
    appIcon: 'classic',
    wellnessFocus: [],
    wellnessObstacles: [],
    moodBaseline: 5,
    goals: [],
    customGoal: '',
};

interface UserContextType {
    user: UserProfile;
    updateUser: (updates: Partial<UserProfile>) => Promise<void>;
    resetUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile>(defaultProfile);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('userProfile');
            if (storedUser) {
                setUser({ ...defaultProfile, ...JSON.parse(storedUser) });
            }
        } catch (error) {
            console.error('Failed to load user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (updates: Partial<UserProfile>) => {
        try {
            const newUser = { ...user, ...updates };
            setUser(newUser);
            await AsyncStorage.setItem('userProfile', JSON.stringify(newUser));
        } catch (error) {
            console.error('Failed to save user profile:', error);
        }
    };

    const resetUser = async () => {
        try {
            setUser(defaultProfile);
            await AsyncStorage.removeItem('userProfile');
            await AsyncStorage.removeItem('onboardingCompleted');
        } catch (error) {
            console.error('Failed to reset user profile:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, updateUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
