import React, { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) {
      formErrors.title = "Title is required";
    }
    if (!ingredients.trim()) {
      formErrors.ingredients = "Ingredients are required";
    } else {
      const items = ingredients.split(",").map((item) => item.trim());
      if (items.length < 2) {
        formErrors.ingredients = "At least 2 ingredients required";
      }
    }
    if (!steps.trim()) {
      formErrors.steps = "Preparation steps are required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newRecipe = {
      id: Date.now(), // simple unique ID
      title,
      summary: steps.substring(0, 60) + "...",
      image: "https://via.placeholder.com/300x200",
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions: steps.split(".").map((step) => step.trim()).filter(Boolean),
    };

    onAddRecipe(newRecipe);

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Recipe</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 max-w-xl mx-auto sm:w-md"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients (comma-separated)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            rows="3"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Preparation Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Steps (separate steps with ".")
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.steps ? "border-red-500" : "border-gray-300"
            }`}
            rows="5"
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
