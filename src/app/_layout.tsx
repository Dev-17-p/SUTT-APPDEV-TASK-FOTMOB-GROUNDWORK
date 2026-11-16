import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Matches",
          tabBarIcon: ({ color, size }) => <Ionicons name="football-outline" size={size} />,
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: "Leagues",
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" size={size} />,
        }}
      />
      {/* href: null keeps the match screen out of the tab bar */}
      <Tabs.Screen name="match/[id]" options={{ href: null, title: "Match" }} />
    </Tabs>
  );
}