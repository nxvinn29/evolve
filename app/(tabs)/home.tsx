import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Moon, Sun } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const [morningDone, setMorningDone] = useState(false);
    const { moderateScale } = useResponsive();

    // Breathing animation for Nataraja
    const breatheAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Continuous breathing animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(breatheAnim, {
                    toValue: 1.05,
                    duration: 3000,
                    useNativeDriver: true,
                }),
                Animated.timing(breatheAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Subtle rotation animation
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 20000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleMorningToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setMorningDone(!morningDone);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Nataraja Header */}
                <View style={styles.header}>
                    <Animated.View
                        style={[
                            styles.natarajaContainer,
                            {
                                transform: [
                                    { scale: breatheAnim },
                                    { rotate: spin },
                                ],
                            },
                        ]}
                    >
                        <Image
                            source={require('@/assets/images/cultural/nataraja.png')}
                            style={styles.natarajaImage}
                            resizeMode="contain"
                        />
                    </Animated.View>
                    <Text style={[styles.headerTitle, { fontSize: moderateScale(Typography.h2) }]}>
                        Today's Practice
                    </Text>
                    <Text style={[styles.headerSubtitle, { fontSize: moderateScale(Typography.small) }]}>
                        The cosmic dance of transformation
                    </Text>
                </View>

                {/* Morning Intention */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleMorningToggle}
                >
                    <LinearGradient
                        colors={morningDone ? [Colors.teal, Colors.deepTeal] : [Colors.gold, Colors.darkGold]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.card}
                    >
                        <View style={styles.cardHeader}>
                            <View style={styles.iconCircle}>
                                <Sun size={moderateScale(24)} color={Colors.white} strokeWidth={2} />
                            </View>
                            <View style={styles.cardTitleContainer}>
                                <Text style={[styles.cardTitle, { fontSize: moderateScale(Typography.h4) }]}>
                                    Morning Intention
                                </Text>
                                <Text style={[styles.cardTime, { fontSize: moderateScale(Typography.tiny) }]}>
                                    Start your day with purpose
                                </Text>
                            </View>
                            {morningDone && (
                                <CheckCircle size={moderateScale(24)} color={Colors.white} fill={Colors.white} />
                            )}
                        </View>
                        <Text style={[styles.cardDescription, { fontSize: moderateScale(Typography.small) }]}>
                            Take 3 deep breaths and set your intention for the day ahead
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Daily Practice */}
                <LinearGradient
                    colors={[Colors.terracotta, '#C85A47']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.iconCircle}>
                            <Image
                                source={require('@/assets/images/cultural/temple_bells.png')}
                                style={styles.bellIcon}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.cardTitleContainer}>
                            <Text style={[styles.cardTitle, { fontSize: moderateScale(Typography.h4) }]}>
                                Daily Practice
                            </Text>
                            <Text style={[styles.cardTime, { fontSize: moderateScale(Typography.tiny) }]}>
                                5 minutes of mindfulness
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.cardDescription, { fontSize: moderateScale(Typography.small) }]}>
                        Practice mindful breathing or meditation to center yourself
                    </Text>
                    <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
                        <Text style={[styles.startButtonText, { fontSize: moderateScale(Typography.small) }]}>
                            Start Practice
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* Night Reflection */}
                <LinearGradient
                    colors={[Colors.olive, '#6B8E23']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <View style={styles.cardHeader}>
                        <View style={styles.iconCircle}>
                            <Moon size={moderateScale(24)} color={Colors.white} strokeWidth={2} />
                        </View>
                        <View style={styles.cardTitleContainer}>
                            <Text style={[styles.cardTitle, { fontSize: moderateScale(Typography.h4) }]}>
                                Night Reflection
                            </Text>
                            <Text style={[styles.cardTime, { fontSize: moderateScale(Typography.tiny) }]}>
                                End your day with gratitude
                            </Text>
                        </View>
                    </View>
                    <Text style={[styles.cardDescription, { fontSize: moderateScale(Typography.small) }]}>
                        Reflect on three things you're grateful for today
                    </Text>
                </LinearGradient>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ink,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
        paddingTop: Spacing.md,
    },
    natarajaContainer: {
        width: 120,
        height: 120,
        marginBottom: Spacing.md,
    },
    natarajaImage: {
        width: '100%',
        height: '100%',
        tintColor: Colors.gold,
    },
    headerTitle: {
        fontWeight: '700',
        color: Colors.gold,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    headerSubtitle: {
        color: Colors.darkParchment,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    card: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.md,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.sm,
    },
    bellIcon: {
        width: 24,
        height: 24,
        tintColor: Colors.white,
    },
    cardTitleContainer: {
        flex: 1,
    },
    cardTitle: {
        fontWeight: '700',
        color: Colors.white,
        marginBottom: 2,
    },
    cardTime: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    cardDescription: {
        color: 'rgba(255, 255, 255, 0.9)',
        lineHeight: 20,
    },
    startButton: {
        marginTop: Spacing.sm,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.md,
        alignSelf: 'flex-start',
    },
    startButtonText: {
        color: Colors.white,
        fontWeight: '600',
    },
});
