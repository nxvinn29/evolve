import { ANIMATION_DURATION, getStaggerDelay } from '@/constants/animations';
import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { useResponsive } from '@/hooks/useResponsive';
import { LinearGradient } from 'expo-linear-gradient';
import { Play } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const JOURNEYS = [
  {
    id: '7-day-gratitude',
    title: '7-Day Gratitude Journey',
    description: 'Cultivate appreciation and abundance through daily gratitude practices',
    duration: '7 days',
    gradient: [Colors.gold, Colors.darkGold],
  },
  {
    id: 'mindful-breathing',
    title: 'Mindful Breathing',
    description: 'Master the art of conscious breathing for peace and clarity',
    duration: '5 days',
    gradient: [Colors.teal, Colors.deepTeal],
  },
  {
    id: 'emotional-awareness',
    title: 'Emotional Awareness',
    description: 'Develop deeper understanding of your emotional landscape',
    duration: '10 days',
    gradient: [Colors.terracotta, '#C85A47'],
  },
];

export default function ExploreScreen() {
  const { moderateScale } = useResponsive();
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
    <View style={styles.container}>
      {/* Background with overlay */}
      <Image
        source={require('@/assets/images/cultural/ancient_temple.png')}
        style={styles.backgroundImage}
        blurRadius={10}
      />
      <LinearGradient
        colors={['rgba(26, 20, 16, 0.9)', 'rgba(26, 20, 16, 0.95)']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: moderateScale(Typography.h2) }]}>
            Spiritual Journeys
          </Text>
          <Text style={[styles.subtitle, { fontSize: moderateScale(Typography.body) }]}>
            Guided paths for transformation
          </Text>
        </View>

        <View style={styles.journeysContainer}>
          {JOURNEYS.map((journey, index) => (
            <Animated.View
              key={journey.id}
              style={[
                styles.journeyWrapper,
                {
                  opacity: fadeAnims[index],
                  transform: [{ translateY: slideAnims[index] }],
                },
              ]}
            >
              <TouchableOpacity activeOpacity={0.9}>
                <LinearGradient
                  colors={journey.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.journeyCard}
                >
                  <View style={styles.journeyContent}>
                    <View style={styles.journeyHeader}>
                      <Text style={[styles.journeyTitle, { fontSize: moderateScale(Typography.h4) }]}>
                        {journey.title}
                      </Text>
                      <View style={styles.durationBadge}>
                        <Text style={[styles.durationText, { fontSize: moderateScale(Typography.tiny) }]}>
                          {journey.duration}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.journeyDescription, { fontSize: moderateScale(Typography.small) }]}>
                      {journey.description}
                    </Text>
                    <View style={styles.startButtonContainer}>
                      <View style={styles.playButton}>
                        <Play size={moderateScale(16)} color={Colors.white} fill={Colors.white} />
                      </View>
                      <Text style={[styles.startText, { fontSize: moderateScale(Typography.small) }]}>
                        Start Journey
                      </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ink,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    paddingTop: Spacing.md,
  },
  title: {
    fontWeight: '700',
    color: Colors.gold,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: Colors.darkParchment,
    textAlign: 'center',
  },
  journeysContainer: {
    gap: Spacing.md,
  },
  journeyWrapper: {
    width: '100%',
  },
  journeyCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  journeyContent: {
    padding: Spacing.lg,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  journeyTitle: {
    flex: 1,
    fontWeight: '700',
    color: Colors.white,
    marginRight: Spacing.sm,
  },
  durationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  durationText: {
    color: Colors.white,
    fontWeight: '600',
  },
  journeyDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  startButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  playButton: {
    marginRight: Spacing.xs,
  },
  startText: {
    color: Colors.white,
    fontWeight: '600',
  },
});
