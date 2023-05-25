import express from "express";
import {
  getAllProducts,
  getProductByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";

import { isAuth, isAdmin, isCustomer } from "../auth/authentification.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/name/:name", getProductByName);
productRouter.post("/", isAuth, isAdmin || isCustomer, createProduct);
productRouter.put("/", isAuth, isAdmin || isCustomer, updateProduct);
productRouter.delete("/:id", isAuth, isAdmin || isCustomer, deleteProduct);

export default productRouter;
