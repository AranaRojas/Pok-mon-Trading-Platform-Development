import axios from "axios";

export const fetchRandomPokemons = async () => {
  const count = parseInt(process.env.POKEMON_COUNT || "3");
  const pokemons = [];

  for (let i = 0; i < count; i++) {
    const id = Math.floor(Math.random() * 151) + 1;
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    pokemons.push({ name: data.name, level: Math.floor(Math.random() * 50), rarity: "common" });
  }
  return pokemons;
};
