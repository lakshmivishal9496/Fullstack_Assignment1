import Recipe from '../models/Recipe.js';

// Get all recipes
export async function findAll(req, res) {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a single recipe by title
export async function findOne(req, res) {
    try {
        const recipe = await Recipe.findOne({ title: req.params.title });
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new recipe
export async function create(req, res) {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        cookingTime: req.body.cookingTime,
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Update a recipe by id
export async function update(req, res) {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedRecipe) {
            res.json(updatedRecipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a recipe by id
export async function deleteRecipe(req, res) {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe) {
            await recipe.remove();
            res.json({ message: 'Deleted Recipe' });
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
