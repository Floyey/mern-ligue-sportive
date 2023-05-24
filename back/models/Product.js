import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  imgPrésentation: { type: String, required: true },
  img: { type: Array, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
});

const Product = mongoose.model("Produit", productSchema);

export default Product;
