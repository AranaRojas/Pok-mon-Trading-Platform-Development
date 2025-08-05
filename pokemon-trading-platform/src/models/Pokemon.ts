import { Schema, model } from "mongoose";

const pokemonSchema = new Schema({
  name: String,
  level: Number,
  rarity: String
});

export default model("Pokemon", pokemonSchema);
