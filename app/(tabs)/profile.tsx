import { ANIMATION_DURATION } from '@/constants/animations';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const EVOLUTION_STAGES = [
    { level: 1, name: 'Awakening', progress: 100, color: Colors.teal },
    { level: 2, name: 'Growing', progress: 75, color: Colors.gold },
    { level: 3, name: 'Transforming', progress: 40, color: Colors.terracotta },
    { level: 4, name: 'Mastering', progress: 0, color: Colors.olive },
];

const DIMENSIONS = [
    { name: 'Awareness', level: 2, progress: 65 },
    { name: 'Calm', level: 1, progress: 80 },
    { name: 'Purpose', level: 1, progress: 45 },
];

export default function EvolutionScreen() {
    const { moderateScale } = useResponsive();
    const lotusAnim = useRef(new Animated.Value(0)).current;
    const progressAnims = useRef(DIMENSIONS.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        // Lotus bloom animation
        Animated.spring(lotusAnim, {
            toValue: 1,
            tension: 20,
            friction: 7,
            useNativeDriver: true,
        }).start();

        // Animate progress bars
        DIMENSIONS.forEach((dim, index) => {
            Animated.timing(progressAnims[index], {
                toValue: dim.progress,
                duration: ANIMATION_DURATION.verySlow,
                delay: index * 200,
                useNativeDriver: false,
            }).start();
        });
    }, []);

    const lotusScale = lotusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    const lotusRotate = lotusAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['-45deg', '0deg'],
    });

    return (
        <View style={styles.container}>
            {/* Stone carving background */}
            <Image
                source={require('@/assets/images/cultural/stone_carving.png')}
                style={styles.backgroundImage}
                blurRadius={8}
            />
            <LinearGradient
                colors={['rgba(26, 20, 16, 0.9)', 'rgba(26, 20, 16, 0.95)']}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Lotus */}
                <View style={styles.header}>
                    <Animated.View
                        style={[
                            styles.lotusContainer,
                            {
                                transform: [
                                    { scale: lotusScale },
                                    { rotate: lotusRotate },
                                ],
                                opacity: lotusAnim,
                            },
                        ]}
                    >
                        <Image
                            source={require('@/assets/images/evolution_lotus_1764872232619.png')}
                            style={styles.lotusImage}
                            resizeMode="contain"
                        />
                    </Animated.View>
                    <Text style={[styles.title, { fontSize: moderateScale(Typography.h2) }]}>
                        Evolution Map
                    </Text>
                    <Text style={[styles.subtitle, { fontSize: moderateScale(Typography.body) }]}>
                        Your journey of transformation
                    </Text>
                </View>

                {/* Current Level */}
                <LinearGradient
                    colors={[Colors.gold, Colors.darkGold]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.levelCard}
                >
                    <View style={styles.levelHeader}>
                        <TrendingUp size={moderateScale(32)} color={Colors.white} strokeWidth={2.5} />
                        <View style={styles.levelInfo}>
                            <Text style={[styles.levelLabel, { fontSize: moderateScale(Typography.small) }]}>
                                Current Level
                            </Text>
                            <Text style={[styles.levelNumber, { fontSize: moderateScale(Typography.h1) }]}>
                                Level 2
                            </Text>
                            <Text style={[styles.levelName, { fontSize: moderateScale(Typography.h4) }]}>
                                Growing
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

                {/* Evolution Stages */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { fontSize: moderateScale(Typography.h3) }]}>
                        Evolution Stages
                    </Text>
                    {EVOLUTION_STAGES.map((stage, index) => (
                        <View key={stage.level} style={styles.stageRow}>
                            <View style={[styles.stageDot, { backgroundColor: stage.color }]}>
                                <Text style={[styles.stageLevel, { fontSize: moderateScale(Typography.small) }]}>
                                    {stage.level}
                                </Text>
                            </View>
                            <View style={styles.stageContent}>
                                <Text style={[styles.stageName, { fontSize: moderateScale(Typography.body) }]}>
                                    {stage.name}
                                </Text>
                                <View style={styles.progressBarContainer}>
                                    <View style={styles.progressBarBackground}>
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                {
                                                    width: `${stage.progress}%`,
                                                    backgroundColor: stage.color,
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text style={[styles.progressText, { fontSize: moderateScale(Typography.tiny) }]}>
                                        {stage.progress}%
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Dimensions */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { fontSize: moderateScale(Typography.h3) }]}>
                        Growth Dimensions
                    </Text>
                    {DIMENSIONS.map((dimension, index) => (
                        <View key={dimension.name} style={styles.dimensionCard}>
                            <View style={styles.dimensionHeader}>
                                <Text style={[styles.dimensionName, { fontSize: moderateScale(Typography.body) }]}>
                                    {dimension.name}
                                </Text>
                                <Text style={[styles.dimensionLevel, { fontSize: moderateScale(Typography.small) }]}>
                                    Level {dimension.level}
                                </Text>
                            </View>
                            <View style={styles.progressBarBackground}>
                                <Animated.View
                                    style={[
                                        styles.progressBarFill,
                                        {
                                            width: progressAnims[index].interpolate({
                                                inputRange: [0, 100],
                                                outputRange: ['0%', '100%'],
                                            }),
                                            backgroundColor: Colors.gold,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    ))}
                </View>
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
        opacity: 0.15,
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
    lotusContainer: {
        width: 100,
        height: 100,
        marginBottom: Spacing.md,
    },
    lotusImage: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontWeight: '700',
        color: Colors.gold,
        textAlign: 'center',
        marginBottom: Spacing.xs,
    },
    subtitle: {
        color: Colors.darkParchment,
        textAlign: 'center',
    },
    levelCard: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.xl,
        elevation: 6,
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    levelHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    levelInfo: {
        marginLeft: Spacing.md,
        flex: 1,
    },
    levelLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 2,
    },
    levelNumber: {
        fontWeight: '700',
        color: Colors.white,
    },
    levelName: {
        color: Colors.white,
        fontWeight: '600',
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontWeight: '700',
        color: Colors.gold,
        marginBottom: Spacing.md,
    },
    stageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    stageDot: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.sm,
    },
    stageLevel: {
        color: Colors.white,
        fontWeight: '700',
    },
    stageContent: {
        flex: 1,
    },
    stageName: {
        color: Colors.parchment,
        fontWeight: '600',
        marginBottom: Spacing.xs,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressBarBackground: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        overflow: 'hidden',
        marginRight: Spacing.sm,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        color: Colors.darkParchment,
        fontWeight: '600',
        minWidth: 40,
    },
    dimensionCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(197, 160, 89, 0.2)',
    },
    dimensionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    dimensionName: {
        color: Colors.parchment,
        fontWeight: '600',
    },
    dimensionLevel: {
        color: Colors.gold,
        fontWeight: '600',
    },
});
