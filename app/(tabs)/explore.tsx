import { BorderRadius, Colors, Spacing, Typography } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const JOURNEYS = [
  { id: '1', title: '7-Day Gratitude', desc: 'Build a habit of thankfulness.', icon: '🙏', duration: '7 days' },
  { id: '2', title: 'Calm Mind', desc: 'Reduce anxiety in 5 minutes.', icon: '🧘', duration: '14 days' },
  { id: '3', title: 'Finding Purpose', desc: 'Discover your core values.', icon: '✨', duration: '21 days' },
];

export default function ExploreScreen() {
  return (
    <ImageBackground
      source={require('@/assets/images/welcome_background_1764872204883.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Explore Journeys</Text>

          <View style={styles.journeysContainer}>
            {JOURNEYS.map((journey, index) => (
              <View key={journey.id} style={styles.journeyCard}>
                <LinearGradient
                  colors={index % 2 === 0
                    ? [Colors.gold + '60', Colors.terracotta + '40']
                    : [Colors.teal + '60', Colors.olive + '40']}
                  style={styles.journeyGradient}
                >
                  <View style={styles.journeyHeader}>
                    <Text style={styles.journeyIcon}>{journey.icon}</Text>
                    <View style={styles.journeyInfo}>
                      <Text style={styles.journeyTitle}>{journey.title}</Text>
                      <Text style={styles.journeyDuration}>{journey.duration}</Text>
                    </View>
                  </View>
                  <Text style={styles.journeyDesc}>{journey.desc}</Text>
                  <TouchableOpacity style={styles.journeyButton}>
                    <LinearGradient
                      colors={[Colors.white + '30', Colors.white + '10']}
                      style={styles.journeyButtonGradient}
                    >
                      <Text style={styles.journeyButtonText}>Start Journey</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ))}
          </View>

          {/* Meditation Image */}
          <View style={styles.meditationContainer}>
            <Image
              source={require('@/assets/images/journey_meditation_1764872241510.png')}
              style={styles.meditationImage}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: '700',
    color: Colors.gold,
    marginBottom: Spacing.xl,
  },
  journeysContainer: {
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  journeyCard: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  journeyGradient: {
    padding: Spacing.lg,
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  journeyIcon: {
    fontSize: 40,
    marginRight: Spacing.md,
  },
  journeyInfo: {
    flex: 1,
  },
  journeyTitle: {
    fontSize: Typography.h4,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  journeyDuration: {
    fontSize: Typography.small,
    color: Colors.parchment,
  },
  journeyDesc: {
    fontSize: Typography.body,
    color: Colors.parchment,
    marginBottom: Spacing.md,
  },
  journeyButton: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  journeyButtonGradient: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  journeyButtonText: {
    fontSize: Typography.body,
    fontWeight: '700',
    color: Colors.white,
  },
  meditationContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  meditationImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.lg,
  },
});
