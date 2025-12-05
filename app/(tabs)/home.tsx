import { ThemedText } from '@/components/ui/ThemedText';
import { useResponsive } from '@/hooks/useResponsive';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Moon, Sun } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
    const [morningDone, setMorningDone] = useState(false);
    const { fontSize } = useResponsive();

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
        <View className="flex-1 bg-stone-950">
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Nataraja Header */}
                <View className="items-center mb-10 pt-4">
                    <Animated.View
                        className="w-40 h-40 mb-6"
                        style={{
                            transform: [
                                { scale: breatheAnim },
                                { rotate: spin },
                            ],
                        }}
                    >
                        <Image
                            source={require('@/assets/images/cultural/nataraja.png')}
                            className="w-full h-full"
                            resizeMode="contain"
                            style={{ tintColor: '#fbbf24' }} // amber-400
                        />
                    </Animated.View>
                    <ThemedText
                        type="title"
                        className="text-amber-400 text-center mb-1 tracking-widest"
                        style={{ fontSize: fontSize(28) }}
                    >
                        Today's Practice
                    </ThemedText>
                    <ThemedText className="text-stone-400 text-center italic">
                        The cosmic dance of transformation
                    </ThemedText>
                </View>

                {/* Morning Intention */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={handleMorningToggle}
                    className="mb-6 shadow-lg shadow-black/50"
                >
                    <LinearGradient
                        colors={morningDone ? ['#0d9488', '#115e59'] : ['#d97706', '#92400e']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="rounded-2xl p-6 border border-white/10"
                    >
                        <View className="flex-row items-center mb-3">
                            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                                <Sun size={24} color="white" strokeWidth={2} />
                            </View>
                            <View className="flex-1">
                                <ThemedText type="subtitle" className="text-white mb-0.5">
                                    Morning Intention
                                </ThemedText>
                                <ThemedText className="text-white/80 text-xs">
                                    Start your day with purpose
                                </ThemedText>
                            </View>
                            {morningDone && (
                                <CheckCircle size={24} color="white" fill="white" />
                            )}
                        </View>
                        <ThemedText className="text-white/90 text-sm leading-5">
                            Take 3 deep breaths and set your intention for the day ahead
                        </ThemedText>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Daily Practice */}
                <View className="mb-6 shadow-lg shadow-black/50">
                    <LinearGradient
                        colors={['#e11d48', '#9f1239']} // Rose/Red
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="rounded-2xl p-6 border border-white/10"
                    >
                        <View className="flex-row items-center mb-3">
                            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                                <Image
                                    source={require('@/assets/images/cultural/temple_bells.png')}
                                    className="w-6 h-6 tint-white"
                                    resizeMode="contain"
                                    style={{ tintColor: 'white' }}
                                />
                            </View>
                            <View className="flex-1">
                                <ThemedText type="subtitle" className="text-white mb-0.5">
                                    Daily Practice
                                </ThemedText>
                                <ThemedText className="text-white/80 text-xs">
                                    5 minutes of mindfulness
                                </ThemedText>
                            </View>
                        </View>
                        <ThemedText className="text-white/90 text-sm leading-5 mb-4">
                            Practice mindful breathing or meditation to center yourself
                        </ThemedText>
                        <TouchableOpacity
                            className="bg-white/20 self-start px-4 py-2 rounded-lg active:bg-white/30"
                            activeOpacity={0.8}
                        >
                            <Text className="text-white font-semibold text-sm">
                                Start Practice
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {/* Night Reflection */}
                <View className="shadow-lg shadow-black/50">
                    <LinearGradient
                        colors={['#65a30d', '#3f6212']} // Lime/Olive
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="rounded-2xl p-6 border border-white/10"
                    >
                        <View className="flex-row items-center mb-3">
                            <View className="w-12 h-12 rounded-full bg-white/20 items-center justify-center mr-4">
                                <Moon size={24} color="white" strokeWidth={2} />
                            </View>
                            <View className="flex-1">
                                <ThemedText type="subtitle" className="text-white mb-0.5">
                                    Night Reflection
                                </ThemedText>
                                <ThemedText className="text-white/80 text-xs">
                                    End your day with gratitude
                                </ThemedText>
                            </View>
                        </View>
                        <ThemedText className="text-white/90 text-sm leading-5">
                            Reflect on three things you're grateful for today
                        </ThemedText>
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
    );
}
