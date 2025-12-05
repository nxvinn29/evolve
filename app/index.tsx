import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { useResponsive } from '@/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export default function WelcomeScreen() {
    const router = useRouter();
    const { wp, fontSize } = useResponsive();
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.1, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <View className="flex-1 bg-stone-950">
            <Stack.Screen options={{ headerShown: false }} />

            <View className="absolute inset-0">
                <Animated.Image
                    source={require('@/assets/images/cultural/ancient_temple.png')}
                    className="w-full h-full opacity-60"
                    resizeMode="cover"
                    style={animatedStyle}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(12,10,9,0.9)', '#0c0a09']}
                    className="absolute inset-0"
                />
            </View>

            <View className="flex-1 justify-end items-center pb-20 px-6">
                <ThemedText
                    type="title"
                    className="text-amber-400 text-center mb-4"
                    style={{ fontSize: fontSize(42), fontFamily: 'Cinzel' }}
                >
                    EVOLVE
                </ThemedText>

                <ThemedText
                    className="text-stone-300 text-center mb-12 leading-relaxed"
                    style={{ fontSize: fontSize(18) }}
                >
                    "Journey through the ancient wisdom of self-mastery."
                </ThemedText>

                <Button
                    title="BEGIN JOURNEY"
                    onPress={() => router.push('/onboarding/intent')}
                    variant="primary"
                    className="w-full bg-amber-600 hover:bg-amber-500 border-amber-400/30 shadow-xl shadow-amber-900/20"
                />
            </View>
        </View>
    );
}
