import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { useResponsive } from '@/hooks/useResponsive';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const INTENTS = [
    { id: 'peace', label: 'Inner Peace', icon: '🕊️', desc: 'Find calm in chaos' },
    { id: 'focus', label: 'Deep Focus', icon: '👁️', desc: 'Sharpen your mind' },
    { id: 'energy', label: 'Vitality', icon: '🔥', desc: 'Awaken your power' },
    { id: 'growth', label: 'Growth', icon: '🌱', desc: 'Expand your spirit' },
];

export default function IntentScreen() {
    const router = useRouter();
    const { wp, fontSize } = useResponsive();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        Haptics.selectionAsync();
        setSelected(id);
    };

    const handleContinue = () => {
        if (selected) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            router.replace('/(tabs)/home');
        }
    };

    return (
        <View className="flex-1 bg-stone-950">
            <Stack.Screen options={{ headerShown: false }} />

            {/* Background */}
            <View className="absolute inset-0">
                <Animated.Image
                    source={require('@/assets/images/cultural/temple_bells.png')}
                    className="w-full h-full opacity-40"
                    resizeMode="cover"
                    style={{ transform: [{ scale: 1.1 }] }}
                />
                <LinearGradient
                    colors={['rgba(12,10,9,0.8)', 'rgba(12,10,9,0.95)']}
                    className="absolute inset-0"
                />
            </View>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                className="flex-1 px-6 pt-16"
            >
                <Animated.View entering={FadeIn.duration(1000)} className="mb-10">
                    <ThemedText
                        type="title"
                        className="text-amber-400 text-center mb-2"
                        style={{ fontSize: fontSize(28) }}
                    >
                        Set Your Intent
                    </ThemedText>
                    <ThemedText className="text-stone-400 text-center italic">
                        "What do you seek on this path?"
                    </ThemedText>
                </Animated.View>

                <View className="gap-4">
                    {INTENTS.map((intent, index) => (
                        <Animated.View
                            key={intent.id}
                            entering={FadeInDown.delay(index * 200).springify()}
                        >
                            <TouchableOpacity
                                activeOpacity={0.9}
                                onPress={() => handleSelect(intent.id)}
                            >
                                <Card
                                    variant={selected === intent.id ? 'glass' : 'outline'}
                                    className={cn(
                                        "flex-row items-center transition-all duration-300",
                                        selected === intent.id
                                            ? "bg-amber-900/30 border-amber-500/50"
                                            : "bg-stone-900/40 border-stone-800"
                                    )}
                                >
                                    <View className="w-12 h-12 rounded-full bg-stone-800/50 items-center justify-center mr-4 border border-stone-700">
                                        <ThemedText style={{ fontSize: 24 }}>{intent.icon}</ThemedText>
                                    </View>
                                    <View className="flex-1">
                                        <ThemedText
                                            type="subtitle"
                                            className={selected === intent.id ? "text-amber-200" : "text-stone-300"}
                                        >
                                            {intent.label}
                                        </ThemedText>
                                        <ThemedText className="text-stone-500 text-xs mt-1">
                                            {intent.desc}
                                        </ThemedText>
                                    </View>
                                    {selected === intent.id && (
                                        <Animated.View entering={FadeIn} className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-500/50" />
                                    )}
                                </Card>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>

            {selected && (
                <Animated.View
                    entering={FadeInDown}
                    className="absolute bottom-10 left-6 right-6"
                >
                    <Button
                        variant="primary"
                        title="CONTINUE"
                        onPress={handleContinue}
                        className="w-full bg-amber-600 hover:bg-amber-500 border-amber-400/30 shadow-xl shadow-amber-900/20"
                    />
                </Animated.View>
            )}
        </View>
    );
}
