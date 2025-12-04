import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { CheckCircle, Moon, Sun } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export default function HomeScreen() {
    return (
        <ScreenWrapper>
            <ScrollView contentContainerClassName="py-6 gap-6">
                <View>
                    <ThemedText className="text-3xl font-serif font-bold">Today's Evolution</ThemedText>
                    <ThemedText className="text-ink/60">Dec 04, 2025</ThemedText>
                </View>

                {/* Morning Intention */}
                <Card className="gap-4">
                    <View className="flex-row items-center gap-2">
                        <Sun size={24} color="#E07A5F" />
                        <ThemedText className="font-serif text-xl font-bold">Morning Intention</ThemedText>
                    </View>
                    <ThemedText className="italic text-ink/80">"I will remain calm and focused today."</ThemedText>
                    <Button title="Edit Intention" variant="outline" className="py-2" textClassName="text-sm" />
                </Card>

                {/* Daily Micro-Habit */}
                <Card className="gap-4 bg-white/50">
                    <View className="flex-row items-center gap-2">
                        <CheckCircle size={24} color="#556B2F" />
                        <ThemedText className="font-serif text-xl font-bold">Daily Practice</ThemedText>
                    </View>
                    <ThemedText>Take 3 deep breaths before unlocking your phone.</ThemedText>
                    <Button title="Mark Complete" variant="primary" />
                </Card>

                {/* Night Reflection */}
                <Card className="gap-4 opacity-50">
                    <View className="flex-row items-center gap-2">
                        <Moon size={24} color="#2C2C2C" />
                        <ThemedText className="font-serif text-xl font-bold">Night Reflection</ThemedText>
                    </View>
                    <ThemedText>Unlock at 8:00 PM</ThemedText>
                </Card>
            </ScrollView>
        </ScreenWrapper>
    );
}
