const express = require("express");
const router = express.Router();
const {
  addRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/addRecipeController");

router.post("/add", addRecipe);
router.get("/all", getAllRecipes);
router.put("/edit/:id", updateRecipe);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
