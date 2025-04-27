import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  platforms: [{ type: String }],
  description: { type: String },
  rating: { type: Number },
  imageUrl: { type: String },
  releaseDate: { type: Date },
  developer: { type: String },
  publisher: { type: String },
  genres: [{ type: String }],
  ageRating: { type: String },
  isFavorite: { type: Boolean, default: false },
});

export default mongoose.model("Game", GameSchema);
