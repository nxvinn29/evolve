import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GOALS = [
    { id: 'peace', label: 'Inner Peace', description: 'Reduce stress and anxiety', icon: '🧘' },
    { id: 'focus', label: 'Mental Focus', description: 'Improve concentration and clarity', icon: '🎯' },
    { id: 'confidence', label: 'Self Confidence', description: 'Build belief in yourself', icon: '💪' },
    { id: 'spiritual', label: 'Spiritual Growth', description: 'Connect with deeper purpose', icon: '✨' },
];

export default function IntentScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([]);

    const toggleGoal = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

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
                    <View style={styles.header}>
                        <Text style={styles.title}>Your Intent</Text>
                        <Text style={styles.subtitle}>What are you seeking to evolve?</Text>
                    </View>

                    <View style={styles.goalsContainer}>
                        {GOALS.map((goal) => (
                            <TouchableOpacity
                                key={goal.id}
                                onPress={() => toggleGoal(goal.id)}
                                activeOpacity={0.8}
                                style={styles.goalCard}
                            >
                                <LinearGradient
                                    colors={selected.includes(goal.id)
                                        ? [Colors.gold, Colors.terracotta]
                                        : ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                                    style={styles.goalGradient}
                                >
                                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                                    <Text style={[styles.goalLabel, selected.includes(goal.id) && styles.goalLabelSelected]}>
                                        {goal.label}
                                    </Text>
                                    <Text style={[styles.goalDescription, selected.includes(goal.id) && styles.goalDescriptionSelected]}>
                                        {goal.description}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, selected.length === 0 && styles.buttonDisabled]}
                        onPress={() => router.push('/(tabs)/home')}
                        activeOpacity={0.8}
                        disabled={selected.length === 0}
                    >
                        <LinearGradient
                            colors={selected.length > 0 ? [Colors.gold, Colors.terracotta] : [Colors.shadow, Colors.shadow]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
        padding: Spacing.xl,
        paddingTop: Spacing.xxl + 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: Typography.h1,
        fontWeight: '700',
        color: Colors.gold,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    subtitle: {
        fontSize: Typography.body,
        color: Colors.parchment,
        textAlign: 'center',
    },
    goalsContainer: {
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    goalCard: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    goalGradient: {
        padding: Spacing.lg,
        alignItems: 'center',
        minHeight: 120,
        justifyContent: 'center',
    },
    goalIcon: {
        fontSize: 40,
        marginBottom: Spacing.sm,
    },
    goalLabel: {
        fontSize: Typography.h4,
        fontWeight: '700',
        color: Colors.parchment,
        marginBottom: Spacing.xs,
    },
    goalLabelSelected: {
        color: Colors.white,
    },
    goalDescription: {
        fontSize: Typography.small,
        color: 'rgba(240, 230, 210, 0.7)',
        textAlign: 'center',
    },
    goalDescriptionSelected: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginTop: Spacing.md,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonGradient: {
        paddingVertical: Spacing.md + 4,
        paddingHorizontal: Spacing.xl,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: Typography.h4,
        fontWeight: '700',
        color: Colors.white,
    },
});
