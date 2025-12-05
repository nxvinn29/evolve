import { ANIMATION_DURATION, getStaggerDelay } from '@/constants/animations';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Brain, Heart, Sparkles, Zap } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const INTENTS = [
    {
        id: 'inner-peace',
        title: 'Inner Peace',
        description: 'Cultivate calm and balance through mindfulness',
        icon: Sparkles,
        gradient: [Colors.teal, Colors.deepTeal],
    },
    {
        id: 'self-awareness',
        title: 'Self-Awareness',
        description: 'Deepen understanding of your thoughts and emotions',
        icon: Brain,
        gradient: [Colors.gold, Colors.darkGold],
    },
    {
        id: 'emotional-growth',
        title: 'Emotional Growth',
        description: 'Build resilience and emotional intelligence',
        icon: Heart,
        gradient: [Colors.terracotta, '#C85A47'],
    },
    {
        id: 'purpose',
        title: 'Purpose & Meaning',
        description: 'Discover your path and life\'s direction',
        icon: Zap,
        gradient: [Colors.olive, '#6B8E23'],
    },
];

export default function IntentScreen() {
    const router = useRouter();
    const [selectedIntents, setSelectedIntents] = useState<string[]>([]);
    const { moderateScale, isSmallDevice } = useResponsive();
    const fadeAnims = useRef(INTENTS.map(() => new Animated.Value(0))).current;
    const scaleAnims = useRef(INTENTS.map(() => new Animated.Value(0.8))).current;

    useEffect(() => {
        // Stagger animation for cards
        const animations = INTENTS.map((_, index) => {
            return Animated.parallel([
                Animated.timing(fadeAnims[index], {
                    toValue: 1,
                    duration: ANIMATION_DURATION.slow,
                    delay: getStaggerDelay(index, 150),
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnims[index], {
                    toValue: 1,
                    delay: getStaggerDelay(index, 150),
                    useNativeDriver: true,
                    tension: 50,
                    friction: 7,
                }),
            ]);
        });

        Animated.stagger(100, animations).start();
    }, []);

    const toggleIntent = (intentId: string, index: number) => {
        // Haptic feedback
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        // Pulse animation
        Animated.sequence([
            Animated.timing(scaleAnims[index], {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnims[index], {
                toValue: 1,
                useNativeDriver: true,
                tension: 100,
                friction: 3,
            }),
        ]).start();

        setSelectedIntents((prev) =>
            prev.includes(intentId)
                ? prev.filter((id) => id !== intentId)
                : [...prev, intentId]
        );
    };

    const handleContinue = () => {
        if (selectedIntents.length > 0) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.push('/(tabs)/home');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/cultural/temple_bells.png')}
                style={styles.backgroundImage}
                blurRadius={8}
            />
            <LinearGradient
                colors={['rgba(26, 20, 16, 0.85)', 'rgba(26, 20, 16, 0.95)']}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={[styles.title, { fontSize: moderateScale(Typography.h2) }]}>
                        Choose Your Path
                    </Text>
                    <Text style={[styles.subtitle, { fontSize: moderateScale(Typography.body) }]}>
                        Select one or more areas you'd like to focus on
                    </Text>
                </View>

                <View style={styles.cardsContainer}>
                    {INTENTS.map((intent, index) => {
                        const isSelected = selectedIntents.includes(intent.id);
                        const IconComponent = intent.icon;

                        return (
                            <Animated.View
                                key={intent.id}
                                style={[
                                    styles.cardWrapper,
                                    {
                                        opacity: fadeAnims[index],
                                        transform: [{ scale: scaleAnims[index] }],
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => toggleIntent(intent.id, index)}
                                >
                                    <LinearGradient
                                        colors={isSelected ? intent.gradient : ['#3E2723', '#2A1F1A']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={[
                                            styles.card,
                                            isSelected && styles.cardSelected,
                                        ]}
                                    >
                                        <View style={styles.iconContainer}>
                                            <IconComponent
                                                size={moderateScale(32)}
                                                color={isSelected ? Colors.white : Colors.gold}
                                                strokeWidth={2}
                                            />
                                        </View>
                                        <Text style={[styles.cardTitle, { fontSize: moderateScale(Typography.h4) }]}>
                                            {intent.title}
                                        </Text>
                                        <Text style={[styles.cardDescription, { fontSize: moderateScale(Typography.small) }]}>
                                            {intent.description}
                                        </Text>
                                        {isSelected && (
                                            <View style={styles.selectedBadge}>
                                                <Text style={styles.selectedText}>✓</Text>
                                            </View>
                                        )}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })}
                </View>

                <TouchableOpacity
                    style={[styles.continueButton, !selectedIntents.length && styles.continueButtonDisabled]}
                    onPress={handleContinue}
                    disabled={!selectedIntents.length}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={selectedIntents.length ? [Colors.gold, Colors.terracotta] : ['#4A3F35', '#3E2723']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.continueGradient}
                    >
                        <Text style={[styles.continueText, { fontSize: moderateScale(Typography.h4) }]}>
                            Continue
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ink,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.3,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    title: {
        fontWeight: '700',
        color: Colors.gold,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    subtitle: {
        color: Colors.darkParchment,
        textAlign: 'center',
    },
    cardsContainer: {
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    cardWrapper: {
        width: '100%',
    },
    card: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        borderWidth: 2,
        borderColor: 'transparent',
        minHeight: 140,
    },
    cardSelected: {
        borderColor: Colors.gold,
        elevation: 8,
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    iconContainer: {
        marginBottom: Spacing.sm,
    },
    cardTitle: {
        fontWeight: '700',
        color: Colors.white,
        marginBottom: Spacing.xs,
    },
    cardDescription: {
        color: Colors.darkParchment,
        lineHeight: 20,
    },
    selectedBadge: {
        position: 'absolute',
        top: Spacing.sm,
        right: Spacing.sm,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedText: {
        color: Colors.teal,
        fontSize: 16,
        fontWeight: '700',
    },
    continueButton: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        marginTop: Spacing.md,
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueGradient: {
        paddingVertical: Spacing.md + 4,
        alignItems: 'center',
    },
    continueText: {
        fontWeight: '700',
        color: Colors.white,
    },
});
