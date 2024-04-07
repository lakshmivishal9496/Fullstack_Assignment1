import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  ingredients: [String],
  instructions: String,
  cookingTime: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
