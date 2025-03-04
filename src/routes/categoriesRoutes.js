const express = require("express");
const { postCategories, getCategories, deleteCategories } = require("../controllers/categoriesController");

const router = express.Router();

router.post("/", postCategories);
router.get("/", getCategories);
router.delete("/:id", deleteCategories);

module.exports = router;