// Berkomunikasi dengan database
// bisa raw query atau menggunakan ORM
// supaya apa dipisah lagi ke repository ini, supaya jika suatu nanti misalnya ada kebutuhan
// untuk ganti ORM misalnya product service dll nya tidak perlu disentuh.
//  jadi kita bisa langsung ganti di file ini saja repository.
// atau sewaktu waktu query kita lemot, kita bisa ganti disini untuk menjadi raw seperti itu.

const prisma = require("../db");

const findProducts = async () => {
  const product = await prisma.product.findMany();

  return product;
};

const findProductById = async (id) => {
  const product = prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const insertProduct = async (productData) => {
  const { name, price, imageUrl, description } = productData;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      imageUrl,
      description,
    },
  });

  return product;
};

const deletedProductById = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const updateProductById = async (id, productData) => {
  const { name, price, imageUrl, description } = productData;

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      imageUrl,
      description,
    },
  });

  return product;
};
module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  updateProductById,
  deletedProductById,
};
