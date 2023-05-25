import express from "express";
import Product from "../controller/productController.js";
import { isAuth, isAdmin, isCustomer } from "../auth/authentification.js";

const productRouter = express.Router();

productRouter.get("/", Product.getAllProducts);
productRouter.get("/:id", Product.getProductById);
productRouter.get("/name/:name", Product.getProductByName);
productRouter.post("/", isAuth, isAdmin || isCustomer, Product.createProduct);
productRouter.put("/", isAuth, isAdmin || isCustomer, Product.updateProduct);
productRouter.put("/purchase", isAuth, Product.purchaseProduct);
productRouter.delete("/:id", isAuth, isAdmin || isCustomer, Product.deleteProduct);

export default productRouter;
