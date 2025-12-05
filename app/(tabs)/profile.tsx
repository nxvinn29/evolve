import { ThemedText } from '@/components/ui/ThemedText';
import { ANIMATION_DURATION } from '@/constants/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { TrendingUp } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, View } from 'react-native';

const EVOLUTION_STAGES = [
    { level: 1, name: 'Awakening', progress: 100, color: '#0d9488' }, // teal
    { level: 2, name: 'Growing', progress: 75, color: '#d97706' }, // gold
    { level: 3, name: 'Transforming', progress: 40, color: '#e11d48' }, // terracotta
    { level: 4, name: 'Mastering', progress: 0, color: '#65a30d' }, // olive
];

const DIMENSIONS = [
    { name: 'Awareness', level: 2, progress: 65 },
    { name: 'Calm', level: 1, progress: 80 },
    { name: 'Purpose', level: 1, progress: 45 },
];

export default function EvolutionScreen() {
    const { fontSize } = useResponsive();
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
        <View className="flex-1 bg-stone-950">
            {/* Stone carving background */}
            <View className="absolute inset-0">
                <Image
                    source={require('@/assets/images/cultural/stone_carving.png')}
                    className="w-full h-full opacity-15"
                    blurRadius={8}
                />
                <LinearGradient
                    colors={['rgba(26, 20, 16, 0.9)', 'rgba(26, 20, 16, 0.95)']}
                    className="absolute inset-0"
                />
            </View>

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header with Lotus */}
                <View className="items-center mb-10 pt-4">
                    <Animated.View
                        className="w-32 h-32 mb-6"
                        style={{
                            transform: [
                                { scale: lotusScale },
                                { rotate: lotusRotate },
                            ],
                            opacity: lotusAnim,
                        }}
                    >
                        <Image
                            source={require('@/assets/images/cultural/evolution_lotus.png')}
                            className="w-full h-full"
                            resizeMode="contain"
                        />
                    </Animated.View>
                    <ThemedText
                        type="title"
                        className="text-amber-400 text-center mb-1"
                        style={{ fontSize: fontSize(28) }}
                    >
                        Evolution Map
                    </ThemedText>
                    <ThemedText className="text-stone-400 text-center italic">
                        Your journey of transformation
                    </ThemedText>
                </View>

                {/* Current Level */}
                <LinearGradient
                    colors={['#d97706', '#92400e']} // gold
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="rounded-2xl p-6 mb-8 shadow-lg shadow-black/50 border border-white/10"
                >
                    <View className="flex-row items-center">
                        <TrendingUp size={32} color="white" strokeWidth={2.5} />
                        <View className="ml-4 flex-1">
                            <ThemedText className="text-white/80 text-xs mb-0.5">
                                Current Level
                            </ThemedText>
                            <ThemedText className="text-white font-bold text-3xl">
                                Level 2
                            </ThemedText>
                            <ThemedText type="subtitle" className="text-white">
                                Growing
                            </ThemedText>
                        </View>
                    </View>
                </LinearGradient>

                {/* Evolution Stages */}
                <View className="mb-8">
                    <ThemedText type="subtitle" className="text-amber-400 mb-4">
                        Evolution Stages
                    </ThemedText>
                    {EVOLUTION_STAGES.map((stage, index) => (
                        <View key={stage.level} className="flex-row items-start mb-4">
                            <View
                                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                                style={{ backgroundColor: stage.color }}
                            >
                                <ThemedText className="text-white font-bold">
                                    {stage.level}
                                </ThemedText>
                            </View>
                            <View className="flex-1">
                                <ThemedText className="text-stone-200 font-semibold mb-1">
                                    {stage.name}
                                </ThemedText>
                                <View className="flex-row items-center">
                                    <View className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden mr-3">
                                        <View
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${stage.progress}%`,
                                                backgroundColor: stage.color,
                                            }}
                                        />
                                    </View>
                                    <ThemedText className="text-stone-400 font-semibold text-xs min-w-[32px]">
                                        {stage.progress}%
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Dimensions */}
                <View className="mb-8">
                    <ThemedText type="subtitle" className="text-amber-400 mb-4">
                        Growth Dimensions
                    </ThemedText>
                    {DIMENSIONS.map((dimension, index) => (
                        <View
                            key={dimension.name}
                            className="bg-white/5 p-4 rounded-lg mb-3 border border-amber-400/20"
                        >
                            <View className="flex-row justify-between items-center mb-2">
                                <ThemedText className="text-stone-200 font-semibold">
                                    {dimension.name}
                                </ThemedText>
                                <ThemedText className="text-amber-400 font-semibold text-xs">
                                    Level {dimension.level}
                                </ThemedText>
                            </View>
                            <View className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <Animated.View
                                    className="h-full bg-amber-400 rounded-full"
                                    style={{
                                        width: progressAnims[index].interpolate({
                                            inputRange: [0, 100],
                                            outputRange: ['0%', '100%'],
                                        }),
                                    }}
                                />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
