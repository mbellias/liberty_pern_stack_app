const productSchema = require('../models/products');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.findAll();

    const productsWithIndex = products.map((product, index) => ({
      ...product.get(),
      index,
    }));

    res.json(productsWithIndex);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productSchema.findOne({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const products = await productSchema.findAll();
    const index = products.findIndex((p) => p.id === product.id);

    // Add index property to the product
    const productWithIndex = {
      ...product.get(),
      index,
    };

    res.json(productWithIndex);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the product.' });
  }
};
