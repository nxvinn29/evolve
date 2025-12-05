import { ThemedText } from '@/components/ui/ThemedText';
import { ANIMATION_DURATION, getStaggerDelay } from '@/constants/animations';
import { useResponsive } from '@/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, TouchableOpacity, View } from 'react-native';

const JOURNEYS = [
  {
    id: '7-day-gratitude',
    title: '7-Day Gratitude Journey',
    description: 'Cultivate appreciation and abundance through daily gratitude practices',
    duration: '7 days',
    gradient: ['#d97706', '#92400e'], // gold
  },
  {
    id: 'mindful-breathing',
    title: 'Mindful Breathing',
    description: 'Master the art of conscious breathing for peace and clarity',
    duration: '5 days',
    gradient: ['#0d9488', '#115e59'], // teal
  },
  {
    id: 'emotional-awareness',
    title: 'Emotional Awareness',
    description: 'Develop deeper understanding of your emotional landscape',
    duration: '10 days',
    gradient: ['#e11d48', '#9f1239'], // terracotta
  },
];

export default function ExploreScreen() {
  const { fontSize } = useResponsive();
  const fadeAnims = useRef(JOURNEYS.map(() => new Animated.Value(0))).current;
  const slideAnims = useRef(JOURNEYS.map(() => new Animated.Value(50))).current;

  useEffect(() => {
    // Stagger animation for journey cards
    const animations = JOURNEYS.map((_, index) => {
      return Animated.parallel([
        Animated.timing(fadeAnims[index], {
          toValue: 1,
          duration: ANIMATION_DURATION.slow,
          delay: getStaggerDelay(index, 150),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnims[index], {
          toValue: 0,
          duration: ANIMATION_DURATION.slow,
          delay: getStaggerDelay(index, 150),
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View className="flex-1 bg-stone-950">
      {/* Background with overlay */}
      <View className="absolute inset-0">
        <Image
          source={require('@/assets/images/cultural/ancient_temple.png')}
          className="w-full h-full opacity-20"
          blurRadius={10}
        />
        <LinearGradient
          colors={['rgba(26, 20, 16, 0.9)', 'rgba(26, 20, 16, 0.95)']}
          className="absolute inset-0"
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8 pt-4">
          <ThemedText
            type="title"
            className="text-amber-400 text-center mb-1"
            style={{ fontSize: fontSize(28) }}
          >
            Spiritual Journeys
          </ThemedText>
          <ThemedText className="text-stone-400 text-center italic">
            Guided paths for transformation
          </ThemedText>
        </View>

        <View className="gap-6">
          {JOURNEYS.map((journey, index) => (
            <Animated.View
              key={journey.id}
              style={{
                opacity: fadeAnims[index],
                transform: [{ translateY: slideAnims[index] }],
              }}
            >
              <TouchableOpacity activeOpacity={0.9} className="shadow-lg shadow-black/50">
                <LinearGradient
                  colors={journey.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="rounded-2xl overflow-hidden border border-white/10"
                >
                  <View className="p-6">
                    <View className="flex-row justify-between items-start mb-2">
                      <ThemedText type="subtitle" className="text-white flex-1 mr-4">
                        {journey.title}
                      </ThemedText>
                      <View className="bg-white/25 px-2 py-1 rounded">
                        <ThemedText className="text-white text-xs font-semibold">
                          {journey.duration}
                        </ThemedText>
                      </View>
                    </View>
                    <ThemedText className="text-white/90 text-sm leading-5 mb-4">
                      {journey.description}
                    </ThemedText>
                    <View className="flex-row items-center bg-white/20 self-start px-4 py-2 rounded-lg">
                      <View className="mr-2">
                        <Play size={16} color="white" fill="white" />
                      </View>
                      <ThemedText className="text-white font-semibold text-sm">
                        Start Journey
                      </ThemedText>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
