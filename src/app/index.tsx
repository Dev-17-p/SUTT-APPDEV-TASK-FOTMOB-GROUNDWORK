import { router } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";


type Match = {
  id: string;
  home: string;
  away: string;
  kickoff: string;
  followed: boolean;
};



export default function Index() {
  const [matches, setMatches] = useState<Match[]>([
    { id: "1", home: "Arsenal", away: "Chelsea", kickoff: "17:30", followed: false },
    { id: "2", home: "Liverpool", away: "Tottenham", kickoff: "20:00", followed: false },
    { id: "3", home: "Real Madrid", away: "Barcelona", kickoff: "00:30", followed: false },
  ]);

 const toggleFollow = (matchId: string) => {
  setMatches(
    matches.map((match) =>
      match.id === matchId ? { ...match, followed: !match.followed } : match
    )
  );
};

const [home, setHome] = useState("");
const [away, setAway] = useState("");

const addMatch = () => {
  if (home.trim() === "" || away.trim() === "") return; // no empty team names

  const newMatch: Match = {
    id: Date.now().toString(), // a unique id from the current timestamp
    home: home.trim(),
    away: away.trim(),
    kickoff: "TBD",
    followed: false,
  };

  setMatches([newMatch, ...matches]); // add to the top of the list
  setHome(""); // clear the inputs
  setAway("");
};

const [filter, setFilter] = useState<"all" | "followed">("all");

const visibleMatches = filter === "all" ? matches : matches.filter((m) => m.followed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Matches</Text>
      <Pressable style={styles.leaguesButton} onPress={() => router.push("/leagues")}>
      <Text style={styles.leaguesButtonText}>Browse leagues ›</Text>
      </Pressable>
      <View style={styles.inputRow}>
      <TextInput style={styles.input} placeholder="Home team" value={home} onChangeText={setHome} />
      <TextInput style={styles.input} placeholder="Away team" value={away} onChangeText={setAway} />
      <Button title="Add" onPress={addMatch} />
      </View>

      <View style={styles.filterRow}>
      {(["all", "followed"] as const).map((option) => (
      <Pressable
      key={option}
      style={[styles.chip, filter === option && styles.chipActive]}
      onPress={() => setFilter(option)}
      >
      <Text>{option}</Text>
      </Pressable>
      ))}
      </View>
      
      <FlatList
        data={visibleMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
           <Pressable style={styles.matchRow} onPress={() => router.push({ pathname: "/match/[id]", params: { id: item.id } })}>
              <Text style={styles.teams}>
                {item.home} vs {item.away}
              </Text>
              <Text style={styles.kickoff}>
                {item.followed ? "★" : "☆"} {item.kickoff}
              </Text>
           </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  matchRow: {
  backgroundColor: "white",
  padding: 15,
  marginVertical: 5,
  borderRadius: 10,
  flexDirection: "row",
  justifyContent: "space-between",
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},
teams: {
  fontSize: 16,
  color: "#333",
},
kickoff: {
  fontSize: 14,
  color: "#666",
},

inputRow: {
  flexDirection: "row",
  gap: 10,
  marginBottom: 20,
},
input: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#ddd",
  padding: 10,
  borderRadius: 5,
  backgroundColor: "white",
},
filterRow: {
  flexDirection: "row",
  gap: 8,
  marginBottom: 10,
},
chip: {
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 16,
  backgroundColor: "#e0e0e0",
},
chipActive: {
  backgroundColor: "#4CAF50",
},
leaguesButton: {
  backgroundColor: "#4CAF50",
  padding: 12,
  borderRadius: 10,
  alignItems: "center",
  marginBottom: 15,
},
leaguesButtonText: {
  color: "white",
  fontWeight: "600",
},
});