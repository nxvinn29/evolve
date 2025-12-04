import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { Compass, Home, Map } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.ink,
          borderTopColor: Colors.gold,
          borderTopWidth: 2,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: Colors.parchment,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Compass size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Evolution',
          tabBarIcon: ({ color, size }) => <Map size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
