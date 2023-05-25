import Product from "../models/product.js";

export default {
  /**
   * Récupération de tous les produits
   */
  getAllProducts: async (req, res) => {
    console.log(res);
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération du produit selon son id
   */
  getProductById: async (req, res) => {
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
  },

  /**
   * Récupération du produit selon son nom
   */
  getProductByName: async (req, res) => {
    const { name } = req.query;

    try {
      const products = await Product.find({
        name: { $regex: name, $options: "i" },
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Création du produit
   */
  createProduct: async (req, res) => {
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
  },

  /**
   * Modification des données du produit selon son id
   */
  updateProduct: async (req, res) => {
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
  },

  /**
   * Retire la quantité de produit acheté
   */
  purchaseProduct: async (req, res) => {
    const { id, quantity } = req.body;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Produit non trouvé" });
      }

      const updatedQuantity = product.quantity - quantity;
      if (updatedQuantity < 0) {
        return res.status(400).json({ error: "Quantité insuffisante" });
      }

      product.quantity = updatedQuantity;
      await product.save();
      res.json({ message: "Quantité mise à jour avec succès" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression du produit selon son id
   */
  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      await Product.findByIdAndDelete(id);
      res.json({ message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
