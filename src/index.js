const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const productController = require("./product/product.controller");

app.use("/products", productController);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
