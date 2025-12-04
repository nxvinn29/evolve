import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <ImageBackground
            source={require('@/assets/images/welcome_background_1764872204883.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
                style={styles.overlay}
            >
                <View style={styles.content}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>The Art of Evolve</Text>
                        <Text style={styles.subtitle}>"Ancient Wisdom for Modern Growth"</Text>
                    </View>

                    <Text style={styles.description}>
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
                            <Text style={styles.buttonText}>Begin Journey</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: Typography.h1 + 8,
        fontWeight: '700',
        color: Colors.gold,
        textAlign: 'center',
        marginBottom: Spacing.sm,
        textShadowColor: Colors.shadow,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: Typography.h4,
        fontStyle: 'italic',
        color: Colors.parchment,
        textAlign: 'center',
    },
    description: {
        fontSize: Typography.body,
        color: Colors.parchment,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: Spacing.xxl,
    },
    button: {
        width: '100%',
        maxWidth: 300,
        borderRadius: BorderRadius.lg,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
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
