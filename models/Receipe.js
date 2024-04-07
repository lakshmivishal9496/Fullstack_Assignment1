// models/Recipe.js
import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  ingredients: [String],
  instructions: String,
  cookingTime: String,
});

export default model('Recipe', recipeSchema);
