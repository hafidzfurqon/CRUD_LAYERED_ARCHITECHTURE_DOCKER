// service layer bertujuan untuk handle bussiness logic
// kenapa dipisah ? supaya tanggung jawab nya ter-isolate atau mengurusi tanggung jawabnya sendiri dan functions nya
// reusable

const {
  findProducts,
  findProductById,
  insertProduct,
  updateProductById,
  deletedProductById,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  if (typeof id !== "number") {
    throw new Error("ID Must be type a number");
  }

  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found euy");
  }

  return product;
};

const CreateProduct = async (productData) => {
  const product = insertProduct(productData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);

  await deletedProductById(id);
};

const editProductById = async (id, ProductData) => {
  await getProductById(id);

  const product = await updateProductById(id, ProductData);

  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  CreateProduct,
  deleteProductById,
  editProductById,
};
