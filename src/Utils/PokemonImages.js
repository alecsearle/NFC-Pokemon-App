// Centralized Pokemon image mapping
export const pokemonImages = {
  Bulbasaur: require("../../assets/images/pokemon/bulbasaur.jpeg"),
  Charmander: require("../../assets/images/pokemon/charmander.png"),
  Squirtle: require("../../assets/images/pokemon/squirtle.jpeg"),
  Pikachu: require("../../assets/images/pokemon/pikachu.jpg"),
  Diglett: require("../../assets/images/pokemon/diglett.jpeg"),
  Caterpie: require("../../assets/images/pokemon/caterpie.jpeg"),
  Geodude: require("../../assets/images/pokemon/geodude.jpeg"),
  Pokeball: require("../../assets/images/pokemon/pokeball.png"),
};

// Helper function to get Pokemon image by name
export const getPokemonImage = (pokemonName) => {
  return pokemonImages[pokemonName] || require("../../assets/images/icon.png");
};
