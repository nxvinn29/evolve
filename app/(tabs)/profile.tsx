import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

const DIMENSIONS = [
    { name: 'Awareness', progress: 0.30, color: Colors.gold },
    { name: 'Calm', progress: 0.15, color: Colors.teal },
    { name: 'Purpose', progress: 0.25, color: Colors.terracotta },
    { name: 'Discipline', progress: 0.40, color: Colors.olive },
];

export default function ProfileScreen() {
    return (
        <ImageBackground
            source={require('@/assets/images/welcome_background_1764872204883.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
                style={styles.overlay}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.title}>Evolution Map</Text>

                    {/* Level Card */}
                    <View style={styles.levelCard}>
                        <LinearGradient
                            colors={[Colors.gold + '60', Colors.terracotta + '40']}
                            style={styles.levelGradient}
                        >
                            <Image
                                source={require('@/assets/images/evolution_lotus_1764872222920.png')}
                                style={styles.lotusImage}
                                resizeMode="contain"
                            />
                            <Text style={styles.levelNumber}>Level 1</Text>
                            <Text style={styles.levelName}>Seeker</Text>
                            <Text style={styles.levelDesc}>Beginning the journey of self-discovery</Text>
                        </LinearGradient>
                    </View>

                    {/* Dimensions */}
                    <View style={styles.dimensionsContainer}>
                        <Text style={styles.dimensionsTitle}>Dimensions of Growth</Text>
                        {DIMENSIONS.map((dimension) => (
                            <View key={dimension.name} style={styles.dimensionCard}>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                    style={styles.dimensionGradient}
                                >
                                    <View style={styles.dimensionHeader}>
                                        <Text style={styles.dimensionName}>{dimension.name}</Text>
                                        <Text style={styles.dimensionPercent}>{Math.round(dimension.progress * 100)}%</Text>
                                    </View>
                                    <View style={styles.progressBar}>
                                        <LinearGradient
                                            colors={[dimension.color, dimension.color + '80']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={[styles.progressFill, { width: `${dimension.progress * 100}%` }]}
                                        />
                                    </View>
                                </LinearGradient>
                            </View>
                        ))}
                    </View>

                    {/* Evolution Stages Reference */}
                    <View style={styles.stagesContainer}>
                        <Text style={styles.stagesTitle}>Stages of Evolution</Text>
                        <View style={styles.stagesList}>
                            <View style={styles.stageItem}>
                                <Text style={styles.stageIcon}>🌱</Text>
                                <Text style={styles.stageName}>Unconscious Reacting</Text>
                            </View>
                            <View style={styles.stageItem}>
                                <Text style={styles.stageIcon}>👁️</Text>
                                <Text style={styles.stageName}>Conscious Noticing</Text>
                            </View>
                            <View style={styles.stageItem}>
                                <Text style={styles.stageIcon}>🧘</Text>
                                <Text style={styles.stageName}>Inner Alignment</Text>
                            </View>
                            <View style={styles.stageItem}>
                                <Text style={styles.stageIcon}>✨</Text>
                                <Text style={styles.stageName}>Self-Transcendence</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
    },
    scrollContent: {
        padding: Spacing.lg,
        paddingTop: Spacing.xl,
    },
    title: {
        fontSize: Typography.h2,
        fontWeight: '700',
        color: Colors.gold,
        marginBottom: Spacing.xl,
    },
    levelCard: {
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        marginBottom: Spacing.xl,
        elevation: 8,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    levelGradient: {
        padding: Spacing.xl,
        alignItems: 'center',
    },
    lotusImage: {
        width: 120,
        height: 120,
        marginBottom: Spacing.md,
    },
    levelNumber: {
        fontSize: Typography.h1 + 8,
        fontWeight: '700',
        color: Colors.white,
        marginBottom: Spacing.xs,
    },
    levelName: {
        fontSize: Typography.h3,
        fontWeight: '600',
        color: Colors.parchment,
        marginBottom: Spacing.sm,
    },
    levelDesc: {
        fontSize: Typography.small,
        color: Colors.parchment,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    dimensionsContainer: {
        marginBottom: Spacing.xl,
    },
    dimensionsTitle: {
        fontSize: Typography.h4,
        fontWeight: '700',
        color: Colors.gold,
        marginBottom: Spacing.md,
    },
    dimensionCard: {
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        marginBottom: Spacing.md,
    },
    dimensionGradient: {
        padding: Spacing.md,
    },
    dimensionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    dimensionName: {
        fontSize: Typography.body,
        fontWeight: '600',
        color: Colors.parchment,
    },
    dimensionPercent: {
        fontSize: Typography.body,
        fontWeight: '700',
        color: Colors.gold,
    },
    progressBar: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: BorderRadius.sm,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: BorderRadius.sm,
    },
    stagesContainer: {
        marginBottom: Spacing.xl,
    },
    stagesTitle: {
        fontSize: Typography.h4,
        fontWeight: '700',
        color: Colors.gold,
        marginBottom: Spacing.md,
    },
    stagesList: {
        gap: Spacing.sm,
    },
    stageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: BorderRadius.md,
    },
    stageIcon: {
        fontSize: 24,
        marginRight: Spacing.md,
    },
    stageName: {
        fontSize: Typography.body,
        color: Colors.parchment,
        fontWeight: '500',
    },
});
