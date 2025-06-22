import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Game from "./models/Game.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao Banco de Dados");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

//? Create - POST
app.post("/games", async (req, res) => {
  try {
    const newGame = await Game.create(req.body);
    res.json(newGame);
  } catch (error) {
    res.json(error);
  }
});

//? Read - GET
app.get("/games", async (req, res) => {
  try {
    const listGames = await Game.find();
    res.json(listGames);
  } catch (error) {
    res.json(error);
  }
});

//? Get by Id
app.get("/games/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.json(game);
  } catch (error) {
    res.json(error);
  }
});

//? Update - PUT
app.put("/games/:id", async (req, res) => {
  try {
    const updateGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updateGame);
  } catch (error) {
    res.json(error);
  }
});

//? Delete - DELETE
app.delete("/games/:id", async (req, res) => {
  try {
    const deleteGame = await Game.findByIdAndDelete(req.params.id);
    res.json(deleteGame);
  } catch (error) {
    res.json(error);
  }
});

//? Partial Update - PATCH
app.patch("/games/:id", async (req, res) => {
  try {
    const patchGame = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(patchGame);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
