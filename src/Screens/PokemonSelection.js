import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PokemonList } from "../PokemonData";
import { pokemonImages } from "../Utils/PokemonImages";

function PokemonSelection({ navigation }) {
  const renderPokemonItem = ({ item, index }) => {
    return (
      <Pressable
        style={styles.pokemonItem}
        onPress={() => {
          navigation.navigate("Detail", { pokemon: item });
        }}
      >
        <Image source={pokemonImages[item.name]} style={styles.pokemonImage} />
        <View style={styles.pokemonInfo}>
          <Text style={styles.pokemonName}>{item.name}</Text>
          <Text style={styles.pokemonDescription}>{item.description}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={PokemonList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPokemonItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  pokemonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pokemonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  pokemonDescription: {
    fontSize: 14,
    color: "#666",
  },
  arrow: {
    fontSize: 28,
    color: "#999",
    marginLeft: 8,
  },
});

export default PokemonSelection;
