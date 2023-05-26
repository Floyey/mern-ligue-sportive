import express from "express";
import Product from "../controller/productController.js";
import { isAuth, isAdmin, isMerchant } from "../auth/authentification.js";

const productRouter = express.Router();

productRouter.get("/", Product.getAllProducts);
productRouter.get("/:id", Product.getProductById);
productRouter.get("/name/:name", Product.getProductByName);
productRouter.post("/", isAuth, isAdmin || isMerchant, Product.createProduct);
productRouter.put("/:id", isAuth, isAdmin || isMerchant, Product.updateProduct);
productRouter.put("/purchase", isAuth, Product.purchaseProduct);
productRouter.delete("/:id", isAuth, isAdmin || isMerchant, Product.deleteProduct);

export default productRouter;
