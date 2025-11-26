import { Stack } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';

export default function CheckInLayout() {
    const { theme } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: theme.background },
                animation: 'slide_from_right',
            }}
        />
    );
}
