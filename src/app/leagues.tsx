import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type League = {
  code: string;
  name: string;
  country: string;
  flag: string;
};

// Placeholder data, to be replaced with API data later
const LEAGUES: League[] = [
  { code: "PL", name: "Premier League", country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { code: "PD", name: "LaLiga", country: "Spain", flag: "🇪🇸" },
  { code: "BL1", name: "Bundesliga", country: "Germany", flag: "🇩🇪" },
  { code: "SA", name: "Serie A", country: "Italy", flag: "🇮🇹" },
  { code: "FL1", name: "Ligue 1", country: "France", flag: "🇫🇷" },
  { code: "CL", name: "Champions League", country: "Europe", flag: "🇪🇺" },
];

export default function Leagues() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leagues</Text>

      <FlatList
        data={LEAGUES}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <Pressable
            style={styles.leagueRow}
            onPress={() => router.push(`/league/${item.code}` as any)}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.country}>{item.country}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  leagueRow: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  flag: { fontSize: 28 },
  name: { fontSize: 16, color: "#333" },
  country: { fontSize: 13, color: "#666", marginTop: 2 },
  arrow: { fontSize: 22, color: "#999" },
});