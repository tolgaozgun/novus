import { Redirect } from 'expo-router';

export default function Index() {
    // TODO: Check if onboarding is completed
    // For now, force redirect to onboarding to show changes
    return <Redirect href="/onboarding/welcome" />;
}
