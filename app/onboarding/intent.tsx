import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

const GOALS = [
    { id: 'peace', label: 'Inner Peace', description: 'Reduce stress and anxiety' },
    { id: 'focus', label: 'Mental Focus', description: 'Improve concentration and clarity' },
    { id: 'confidence', label: 'Self Confidence', description: 'Build belief in yourself' },
    { id: 'spiritual', label: 'Spiritual Growth', description: 'Connect with deeper purpose' },
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
        <ScreenWrapper>
            <ScrollView contentContainerClassName="py-8 gap-6">
                <View className="gap-2">
                    <ThemedText className="text-3xl font-serif font-bold text-center">
                        Your Intent
                    </ThemedText>
                    <ThemedText className="text-center text-ink/70">
                        What are you seeking to evolve?
                    </ThemedText>
                </View>

                <View className="gap-4">
                    {GOALS.map((goal) => (
                        <Pressable key={goal.id} onPress={() => toggleGoal(goal.id)}>
                            <Card
                                className={cn(
                                    "border-2 transition-all",
                                    selected.includes(goal.id) ? "border-terracotta bg-parchment" : "border-transparent bg-white/50"
                                )}
                            >
                                <View className="p-2">
                                    <ThemedText className="font-serif text-lg font-bold">{goal.label}</ThemedText>
                                    <ThemedText className="text-sm text-ink/60">{goal.description}</ThemedText>
                                </View>
                            </Card>
                        </Pressable>
                    ))}
                </View>

                <Button
                    title="Continue"
                    onPress={() => router.push('/(tabs)/home')}
                    className="mt-4"
                    disabled={selected.length === 0}
                    variant={selected.length > 0 ? 'primary' : 'outline'}
                />
            </ScrollView>
        </ScreenWrapper>
    );
}
