import express from "express";
import {
  getAllProducts,
  getProductByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/name/:name", getProductByName);
productRouter.post("/", createProduct);
productRouter.put("/", updateProduct);
productRouter.delete("/", deleteProduct);

export default productRouter;
