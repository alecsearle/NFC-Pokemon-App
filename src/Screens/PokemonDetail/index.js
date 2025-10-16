import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { Button } from "react-native-paper";
import { writePokemon } from "../../NfcUtils/writePokemon";
import { writeSignature } from "../../NfcUtils/writeSignature";
import { getPokemonImage } from "../../Utils/PokemonImages";

const typeColors = {
  1: "#78C850", // Grass
  2: "#F08030", // Fire
  3: "#6890F0", // Water
  4: "#F8D030", // Electric
  5: "#E0C068", // Ground
  6: "#A8B820", // Bug
  7: "#B8A038", // Rock
  8: "#A040A0", // Poison
};

const typeNames = {
  1: "Grass",
  2: "Fire",
  3: "Water",
  4: "Electric",
  5: "Ground",
  6: "Bug",
  7: "Rock",
  8: "Poison",
};

function PokemonDetail({ route, navigation }) {
  const { pokemon } = route.params;
  const primaryType = pokemon.type[0];
  const backgroundColor = typeColors[primaryType] || "#A8A878";
  const pokemonImage = getPokemonImage(pokemon.name);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { backgroundColor }]}>
        <View style={styles.imageContainer}>
          <Image source={pokemonImage} style={styles.pokemonImage} />
        </View>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.typesContainer}>
          {pokemon.type.map((type, index) => (
            <View key={index} style={[styles.typeBadge, { backgroundColor: typeColors[type] }]}>
              <Text style={styles.typeText}>{typeNames[type]}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Stats</Text>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>HP:</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${(pokemon.hp / 6) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{pokemon.hp}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>ATK:</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${(pokemon.atk / 6) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{pokemon.atk}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>DEF:</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${(pokemon.def / 6) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{pokemon.def}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>SATK:</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${(pokemon.satk / 6) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{pokemon.satk}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>SDEF:</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${(pokemon.sdef / 6) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{pokemon.sdef}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>SPD:</Text>
            <View style={styles.statBarContainer}>
              <View style={[styles.statBar, { width: `${(pokemon.spd / 6) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{pokemon.spd}</Text>
          </View>
        </View>

        <Button
          mode="contained"
          style={styles.createButton}
          onPress={async () => {
            try {
              await NfcManager.requestTechnology(NfcTech.NfcA);
              const pokemonBytes = await writePokemon(pokemon);
              await writeSignature(pokemonBytes);
              alert("Pokemon created successfully!");
              navigation.goBack();
            } catch (ex) {
              console.warn("Create Pokemon Error:", ex);
              alert("Failed to create Pokemon: " + ex.message);
            } finally {
              NfcManager.cancelTechnologyRequest();
            }
          }}
        >
          CREATE
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: "white",
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    padding: 20,
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 10,
  },
  typeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  statsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    width: 60,
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  statBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  statBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  statValue: {
    width: 30,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  createButton: {
    marginTop: 10,
    paddingVertical: 8,
  },
});

export default PokemonDetail;
