import { Redirect, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
    const [isLoading, setIsLoading] = useState(true);
    const [onboardingCompleted, setOnboardingCompleted] = useState(false);

    useEffect(() => {
        checkOnboarding();
    }, []);

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('onboardingCompleted');
            if (value === 'true') {
                setOnboardingCompleted(true);
            }
        } catch (e) {
            console.error('Failed to load onboarding status');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    if (onboardingCompleted) {
        return <Redirect href="/(tabs)" />;
    }

    return <Redirect href="/onboarding/welcome" />;
}
