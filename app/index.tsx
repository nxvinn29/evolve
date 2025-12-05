import { ANIMATION_DURATION } from '@/constants/animations';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
    const router = useRouter();
    const { moderateScale } = useResponsive();

    // Animation values
    const scaleAnim = useRef(new Animated.Value(1.2)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const contentFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Background zoom animation
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION.verySlow * 2,
            useNativeDriver: true,
        }).start();

        // Fade in overlay
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION.slow,
            useNativeDriver: true,
        }).start();

        // Content fade in with delay
        Animated.timing(contentFadeAnim, {
            toValue: 1,
            duration: ANIMATION_DURATION.slow,
            delay: ANIMATION_DURATION.normal,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.backgroundContainer, { transform: [{ scale: scaleAnim }] }]}>
                <ImageBackground
                    source={require('@/assets/images/cultural/ancient_temple.png')}
                    style={styles.background}
                    resizeMode="cover"
                >
                    <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
                        <LinearGradient
                            colors={['rgba(26, 20, 16, 0.5)', 'rgba(26, 20, 16, 0.8)']}
                            style={StyleSheet.absoluteFill}
                        />
                    </Animated.View>
                </ImageBackground>
            </Animated.View>

            <Animated.View style={[styles.content, { opacity: contentFadeAnim }]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.title, { fontSize: moderateScale(Typography.h1 + 8) }]}>
                        The Art of Evolve
                    </Text>
                    <Text style={[styles.subtitle, { fontSize: moderateScale(Typography.h4) }]}>
                        "Ancient Wisdom for Modern Growth"
                    </Text>
                </View>

                <Text style={[styles.description, { fontSize: moderateScale(Typography.body) }]}>
                    Evolve by building small daily practices that increase awareness, purpose, and emotional balance.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('/onboarding/intent')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={[Colors.gold, Colors.terracotta]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                    >
                        <Text style={[styles.buttonText, { fontSize: moderateScale(Typography.h4) }]}>
                            Begin Journey
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.ink,
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.xl,
        maxWidth: 600,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    title: {
        fontWeight: '700',
        color: Colors.gold,
        textAlign: 'center',
        marginBottom: Spacing.sm,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontStyle: 'italic',
        color: Colors.parchment,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    description: {
        color: Colors.parchment,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: Spacing.xxl,
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    button: {
        width: '100%',
        maxWidth: 300,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    buttonGradient: {
        paddingVertical: Spacing.md + 4,
        paddingHorizontal: Spacing.xl,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '700',
        color: Colors.white,
    },
});
