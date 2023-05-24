import express from 'express';
import { getAllUsers, getUserById, getUserByMail, createUser, updateUser, deleteUser } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.get('/mail/:mail', getUserByMail);
userRouter.post('/', createUser);
userRouter.put('/', updateUser);
userRouter.delete('/', deleteUser);

export default userRouter;
