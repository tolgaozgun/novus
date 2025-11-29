import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Platform, Pressable, Animated, Vibration } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import OnboardingWrapper from '../../components/onboarding/OnboardingWrapper';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';

type Step = 'contract' | 'alarm';

export default function CommitmentScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { updateUser } = useUser();
    const [step, setStep] = useState<Step>('contract');

    const [signed, setSigned] = useState(false);
    const [alarmTime, setAlarmTime] = useState(new Date());
    const [alarmEnabled, setAlarmEnabled] = useState(true);

    // Animation for hold effect
    const progressAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleContinue = async () => {
        if (step === 'contract') {
            await updateUser({ pledgeSigned: true });
            setStep('alarm');
        } else {
            await updateUser({ alarmTime: alarmEnabled ? alarmTime.toISOString() : null });
            router.push('/onboarding/notifications');
        }
    };

    const handleBack = () => {
        if (step === 'alarm') {
            setStep('contract');
        } else {
            router.back();
        }
    };

    const handleSkip = () => {
        // Pledge is unskippable
        if (step === 'contract') {
            return;
        } else {
            router.push('/onboarding/notifications');
        }
    };

    const getProgress = () => {
        return step === 'contract' ? 0.75 : 0.8;
    };

    const startHolding = () => {
        if (signed) return;

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        Animated.parallel([
            Animated.timing(progressAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false,
            }),
            Animated.spring(scaleAnim, {
                toValue: 0.9,
                useNativeDriver: true,
            })
        ]).start();

        // Haptic loop
        const interval = setInterval(() => {
            console.log('Triggering haptic...');
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }, 150);
        intervalRef.current = interval;

        timerRef.current = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setSigned(true);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }, 2000);
    };

    const stopHolding = () => {
        if (signed) return;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        Animated.parallel([
            Animated.timing(progressAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            })
        ]).start();
    };

    const renderContractStep = () => (
        <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name="flame" size={48} color={theme.accent} />
            </View>
            <Text style={[styles.title, { color: theme.text, textAlign: 'center' }]}>
                The Novus Pledge
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary, textAlign: 'center' }]}>
                I commit to spending 2 minutes every day to rewire my brain for success.
            </Text>

            <View style={styles.holdContainer}>
                <Pressable
                    onPressIn={startHolding}
                    onPressOut={stopHolding}
                    style={styles.fingerprintContainer}
                >
                    <Animated.View style={[
                        styles.fingerprintCircle,
                        {
                            borderColor: signed ? theme.accent : theme.textSecondary,
                            transform: [{ scale: scaleAnim }]
                        }
                    ]}>
                        <Ionicons
                            name={signed ? "checkmark-circle" : "finger-print"}
                            size={64}
                            color={signed ? theme.accent : theme.textSecondary}
                        />

                        {!signed && (
                            <Animated.View
                                style={[
                                    styles.progressFill,
                                    {
                                        backgroundColor: theme.accent,
                                        height: progressAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0%', '100%']
                                        }),
                                        opacity: 0.3
                                    }
                                ]}
                            />
                        )}
                    </Animated.View>
                </Pressable>
                <Text style={[styles.holdText, { color: theme.textSecondary }]}>
                    {signed ? "Pledge Signed" : "Hold to Sign"}
                </Text>
            </View>
        </View>
    );

    const renderAlarmStep = () => (
        <View style={styles.stepContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name="alarm" size={48} color={theme.accent} />
            </View>
            <Text style={[styles.title, { color: theme.text, textAlign: 'center' }]}>
                Set Your Anchor
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary, textAlign: 'center' }]}>
                When do you want your Daily Briefing?
            </Text>

            <View style={[styles.timeContainer, { backgroundColor: theme.cardBackground }]}>
                <View style={styles.switchRow}>
                    <Text style={[styles.label, { color: theme.text }]}>Daily Reminder</Text>
                    <Switch
                        value={alarmEnabled}
                        onValueChange={setAlarmEnabled}
                        trackColor={{ false: '#767577', true: theme.accent }}
                        thumbColor={alarmEnabled ? '#fff' : '#f4f3f4'}
                    />
                </View>

                {alarmEnabled && (
                    <View style={styles.pickerContainer}>
                        <DateTimePicker
                            value={alarmTime}
                            mode="time"
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || alarmTime;
                                setAlarmTime(currentDate);
                            }}
                            textColor={theme.text}
                            themeVariant={theme.id === 'light' ? 'light' : 'dark'}
                        />
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <OnboardingWrapper
            progress={getProgress()}
            onBack={handleBack}
            onSkip={step === 'contract' ? undefined : handleSkip}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    {step === 'contract' && renderContractStep()}
                    {step === 'alarm' && renderAlarmStep()}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                backgroundColor: (step === 'contract' && !signed) ? theme.cardBackground : theme.accent,
                                opacity: (step === 'contract' && !signed) ? 0.5 : 1
                            }
                        ]}
                        onPress={handleContinue}
                        disabled={step === 'contract' && !signed}
                    >
                        <Text style={[styles.buttonText, { color: (step === 'contract' && !signed) ? theme.textSecondary : '#000' }]}>
                            {step === 'contract' ? 'I Commit' : 'Set Reminder'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </OnboardingWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    stepContainer: {
        width: '100%',
        alignItems: 'center',
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    holdContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    fingerprintContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fingerprintCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    progressFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    holdText: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
    },
    timeContainer: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
    },
    pickerContainer: {
        alignItems: 'center',
    },
    footer: {
        paddingVertical: 20,
        width: '100%',
    },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
