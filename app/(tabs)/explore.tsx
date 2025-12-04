import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { ScrollView, View } from 'react-native';

const JOURNEYS = [
  { id: '1', title: '7-Day Gratitude', desc: 'Build a habit of thankfulness.' },
  { id: '2', title: 'Calm Mind', desc: 'Reduce anxiety in 5 minutes.' },
  { id: '3', title: 'Finding Purpose', desc: 'Discover your core values.' },
];

export default function ExploreScreen() {
  return (
    <ScreenWrapper>
      <ScrollView contentContainerClassName="py-6 gap-6">
        <ThemedText className="text-3xl font-serif font-bold">Explore</ThemedText>

        <View className="gap-4">
          {JOURNEYS.map(j => (
            <Card key={j.id} className="gap-2">
              <ThemedText className="font-serif text-lg font-bold">{j.title}</ThemedText>
              <ThemedText className="text-ink/70">{j.desc}</ThemedText>
              <Button title="Start" variant="outline" className="mt-2 py-2" textClassName="text-sm" />
            </Card>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
