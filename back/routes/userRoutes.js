import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByMail,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { isAuth, isAdmin, isCustomer } from "../auth/authentification.js";

const userRouter = express.Router();

userRouter.get("/", isAuth, isAdmin, getAllUsers);
userRouter.get("/:id", isAuth, isAdmin, getUserById);
userRouter.post("/signin/:mail", getUserByMail);
userRouter.post("/register", createUser);
userRouter.put("/", isAuth, updateUser);
userRouter.delete("/", isAuth, isAdmin, deleteUser);

export default userRouter;
