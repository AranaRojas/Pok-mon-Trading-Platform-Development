import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { fetchRandomPokemons } from "../services/pokeapiService";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const pokemons = await fetchRandomPokemons();
  const user = new User({ username, password: hash, pokemons });
  await user.save();
  res.status(201).json({ message: "User registered", pokemons });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");
  res.json({ token });
};
