import { Schema, model } from "mongoose";

const tradeSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: "User" },
  toUser: { type: Schema.Types.ObjectId, ref: "User" },
  offeredPokemon: Object,
  requestedPokemon: Object,
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
});

export default model("Trade", tradeSchema);
