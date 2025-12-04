import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { ScrollView, View } from 'react-native';

export default function ProfileScreen() {
    return (
        <ScreenWrapper>
            <ScrollView contentContainerClassName="py-6 gap-6">
                <ThemedText className="text-3xl font-serif font-bold">Evolution Map</ThemedText>

                <Card className="items-center py-8">
                    <ThemedText className="text-4xl font-serif font-bold text-terracotta">Level 1</ThemedText>
                    <ThemedText className="text-ink/60 mt-2">Seeker</ThemedText>
                </Card>

                <View className="gap-4">
                    <ThemedText className="font-serif text-xl font-bold">Dimensions</ThemedText>
                    <Card>
                        <View className="flex-row justify-between mb-2">
                            <ThemedText>Awareness</ThemedText>
                            <ThemedText className="font-bold">30%</ThemedText>
                        </View>
                        <View className="h-2 bg-ink/10 rounded-full overflow-hidden">
                            <View className="h-full bg-olive w-[30%]" />
                        </View>
                    </Card>
                    <Card>
                        <View className="flex-row justify-between mb-2">
                            <ThemedText>Calm</ThemedText>
                            <ThemedText className="font-bold">15%</ThemedText>
                        </View>
                        <View className="h-2 bg-ink/10 rounded-full overflow-hidden">
                            <View className="h-full bg-olive w-[15%]" />
                        </View>
                    </Card>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}
