import express from 'express';
import { findAll, findOne, create, update, deleteRecipe } from '../controllers/recipeController.js';

const router = express.Router();

// Routes for the Recipe resource
router.get('/', findAll); // Get all recipes
router.get('/:id', findOne); // Get a single recipe by ID
router.post('/', create); // Create a new recipe
router.put('/:id', update); // Update a recipe by ID
router.delete('/:id', deleteRecipe); // Delete a recipe by ID

export default router;
