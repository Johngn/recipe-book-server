const { Router } = require('express');

const Recipe = require('../models/Recipe.js');

const router = Router();

const { API_KEY } = process.env;

// CREATE A RECIPE
router.post('/', async (req, res, next) => {
  try {
    if (req.get('x-api-key') !== API_KEY) {
      res.status(401);
      throw new Error('Unauthorised');
    }
    const recipe = new Recipe(req.body);
    const createdRecipe = await recipe.save();
    res.json(createdRecipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// GET ALL RECIPES
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});

// GET ONE RECIPE
router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) return next();
    res.json(recipe);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE RECIPE
router.put('/:id', async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return new recipe instead of old one
    );

    res.json(updatedRecipe);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

// DELETE ONE RECIPE
router.delete('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    recipe.remove();
    res.json(recipe);
  } catch (error) {
    res.status(404);
    next(error);
  }
});

module.exports = router;
