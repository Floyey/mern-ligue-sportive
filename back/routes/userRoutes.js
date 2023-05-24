import express from 'express';
import User from '../controller/userController.js'

const userRouter = express.Router();

// Route pour récupérer tous les utilisateurs
userRouter.get('/', User.getAllUsers);

// Route pour récupérer un utilisateur par son ID
userRouter.get('/:id', User.getUserById);

// Route pour récupérer un utilisateur par son adresse mail
userRouter.get('/signin/:mail', User.getUserByMail);

// Route pour créer un nouvel utilisateur
userRouter.post('/register', User.createUser);

// Route pour mettre à jour les informations d'un utilisateur
userRouter.put('/', User.updateUser);

// Route pour supprimer un utilisateur
userRouter.delete('/', User.deleteUser);

export default userRouter;
