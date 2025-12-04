import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
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
                        <Text style={styles.title}>Today's Evolution</Text>
                        <Text style={styles.date}>Dec 04, 2025</Text>
                    </View>

                    {/* Morning Intention */}
                    <View style={styles.card}>
                        <LinearGradient
                            colors={[Colors.gold + '40', Colors.terracotta + '20']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardIcon}>🌅</Text>
                                <Text style={styles.cardTitle}>Morning Intention</Text>
                            </View>
                            <Text style={styles.cardQuote}>"I will remain calm and focused today."</Text>
                            <TouchableOpacity style={styles.cardButton}>
                                <Text style={styles.cardButtonText}>Edit Intention</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/* Daily Practice */}
                    <View style={styles.card}>
                        <LinearGradient
                            colors={[Colors.olive + '40', Colors.teal + '20']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardIcon}>✓</Text>
                                <Text style={styles.cardTitle}>Daily Practice</Text>
                            </View>
                            <Text style={styles.cardText}>Take 3 deep breaths before unlocking your phone.</Text>
                            <TouchableOpacity style={[styles.cardButton, styles.cardButtonPrimary]}>
                                <LinearGradient
                                    colors={[Colors.olive, Colors.teal]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.cardButtonTextPrimary}>Mark Complete</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                    {/* Night Reflection */}
                    <View style={[styles.card, styles.cardDisabled]}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
                            style={styles.cardGradient}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardIcon}>🌙</Text>
                                <Text style={styles.cardTitle}>Night Reflection</Text>
                            </View>
                            <Text style={styles.cardText}>Unlock at 8:00 PM</Text>
                        </LinearGradient>
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
    header: {
        marginBottom: Spacing.xl,
    },
    title: {
        fontSize: Typography.h2,
        fontWeight: '700',
        color: Colors.gold,
        marginBottom: Spacing.xs,
    },
    date: {
        fontSize: Typography.small,
        color: Colors.parchment,
    },
    card: {
        marginBottom: Spacing.lg,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardDisabled: {
        opacity: 0.6,
    },
    cardGradient: {
        padding: Spacing.lg,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    cardIcon: {
        fontSize: 24,
        marginRight: Spacing.sm,
    },
    cardTitle: {
        fontSize: Typography.h4,
        fontWeight: '700',
        color: Colors.white,
    },
    cardQuote: {
        fontSize: Typography.body,
        fontStyle: 'italic',
        color: Colors.parchment,
        marginBottom: Spacing.md,
    },
    cardText: {
        fontSize: Typography.body,
        color: Colors.parchment,
        marginBottom: Spacing.md,
    },
    cardButton: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.sm,
        borderWidth: 1,
        borderColor: Colors.parchment,
        alignSelf: 'flex-start',
    },
    cardButtonPrimary: {
        borderWidth: 0,
        borderRadius: BorderRadius.md,
        overflow: 'hidden',
        alignSelf: 'stretch',
    },
    buttonGradient: {
        paddingVertical: Spacing.md,
        alignItems: 'center',
    },
    cardButtonText: {
        fontSize: Typography.small,
        color: Colors.parchment,
        fontWeight: '600',
    },
    cardButtonTextPrimary: {
        fontSize: Typography.body,
        color: Colors.white,
        fontWeight: '700',
    },
});
