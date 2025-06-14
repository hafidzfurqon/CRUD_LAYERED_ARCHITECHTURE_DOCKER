// Layer for handle requests related to products
// biasanya handle validasi body juga

const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  CreateProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);
    const product = await getProductById(productId);

    res.status(200).send({
      data: product,
      message: "Get One Product Successfully",
      success: true,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send({
      data: products,
      message: "Get All Products Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve products",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const NewProductData = req.body;
    const product = await CreateProduct(NewProductData);

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);
    await deleteProductById(productId);

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);
    const ProductData = req.body;
    if (
      !(
        ProductData.name &&
        ProductData.price &&
        ProductData.imageUrl &&
        ProductData.description
      )
    ) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const product = await editProductById(productId, ProductData);

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);
    const ProductData = req.body;

    const product = await editProductById(productId, ProductData);

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Product not found",
      error: error.message,
    });
  }
});

module.exports = router;
