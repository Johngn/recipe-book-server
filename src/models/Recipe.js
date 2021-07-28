const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const recipeSchema = new Schema(
  {
    title: requiredString,
    category: String,
    time: String,
    image: String,
    difficulty: {
      type: Number,
      min: 0,
      max: 5,
    },
    ingredients: [
      {
        name: String,
        amount: Number,
        unit: String,
      },
    ],
    instructions: [
      {
        text: requiredString,
        image: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
