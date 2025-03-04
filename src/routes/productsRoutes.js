const express = require("express");
const {
  postProduct,
  getProducts,
  updateProductCategory,
  deleteProduct,
} = require("../controllers/productsControllers");

const router = express.Router();

router.post("/", postProduct);
router.get("/", getProducts);
router.patch("/:id", updateProductCategory);
router.delete("/:id", deleteProduct);

module.exports = router;
