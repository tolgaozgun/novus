import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function scheduleDailyNotification() {
    const hasLaunched = await checkHasLaunched();
    if (hasLaunched) return; // Only schedule once

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Daily Motivation",
            body: "Your daily quote is ready!",
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            hour: 9,
            minute: 0,
            repeats: true,
        },
    });

    await markHasLaunched();
}

// Simple check to avoid rescheduling every time (could use AsyncStorage)
import AsyncStorage from '@react-native-async-storage/async-storage';

async function checkHasLaunched() {
    try {
        const value = await AsyncStorage.getItem('@notifications_scheduled');
        return value === 'true';
    } catch (e) {
        return false;
    }
}

async function markHasLaunched() {
    try {
        await AsyncStorage.setItem('@notifications_scheduled', 'true');
    } catch (e) {
        // ignore
    }
}
