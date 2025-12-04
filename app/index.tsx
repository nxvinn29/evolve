import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ui/ThemedText';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <ScreenWrapper className="justify-center items-center">
            <View className="items-center gap-8 w-full">
                <View className="items-center gap-2">
                    <ThemedText className="text-4xl font-serif text-center text-ink font-bold">
                        The Art of Evolve
                    </ThemedText>
                    <ThemedText className="text-lg text-center text-ink/80 px-4 italic font-serif">
                        "Ancient Wisdom for Modern Growth"
                    </ThemedText>
                </View>

                <ThemedText className="text-base text-center text-ink/70 px-8 leading-6">
                    Evolve by building small daily practices that increase awareness, purpose, and emotional balance.
                </ThemedText>

                <Button
                    title="Begin Journey"
                    onPress={() => router.push('/onboarding/intent')}
                    className="w-full max-w-xs mt-8"
                />
            </View>
        </ScreenWrapper>
    );
}
