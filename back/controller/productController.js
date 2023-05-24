import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  console.log(res);
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductByName = async (req, res) => {
  const { name } = req.query;

  try {
    const products = await Product.find({
      name: { $regex: name, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, imgPrésentation, img, year, description, price, quantity } =
    req.body;

  try {
    const newProduct = await Product.create({
      name,
      imgPrésentation,
      img,
      year,
      description,
      price,
      quantity,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, imgPrésentation, img, year, description, price, quantity } =
    req.body;

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, {
      name,
      imgPrésentation,
      img,
      year,
      description,
      price,
      quantity,
    });
    res.json(updateProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
