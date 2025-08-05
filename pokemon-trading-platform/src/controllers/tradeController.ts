import { Request, Response } from "express";
import Trade from "../models/Trade";
import { sendTradeRequest } from "../services/tradeService";

export const createTrade = async (req: Request, res: Response) => {
  const { toUserId, offeredPokemon, requestedPokemon } = req.body;
  const trade = new Trade({ fromUser: req.user.id, toUser: toUserId, offeredPokemon, requestedPokemon });
  await trade.save();
  sendTradeRequest(trade);
  res.status(201).json({ message: "Trade request sent" });
};
