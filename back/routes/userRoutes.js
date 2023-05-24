import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUsersByMail } from '../controller/userController.js'

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.get('/mail/:mail', getUsersByMail);
userRouter.post('/', createUser);
userRouter.put('/', updateUser);
userRouter.delete('/', deleteUser);

export default userRouter;
