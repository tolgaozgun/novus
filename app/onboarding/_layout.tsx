import { Stack } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function OnboardingLayout() {
    const { theme } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.background },
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="welcome" />
            <Stack.Screen name="attribution" />
            <Stack.Screen name="demographics" />
            <Stack.Screen name="psychographics" />
            <Stack.Screen name="commitment" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="customization" />
        </Stack>
    );
}
