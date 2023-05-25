import User from "../models/User.js";
import { generateToken } from "./../auth/authentification.js";
import bcrypt from "bcryptjs";

export default {
  /**
   * Récupération de tous les utilisateurs
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Récupération de l'utilisateur selon l'id passé dans l'url
   */
  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Vérifie le couple de l'adresse mail et du mot de passe
   * >* S'il trouve alors ça retourne un json
   * >* Sinon erreur 404 ou 500
   */
  getUserByMail: async (req, res) => {
    const { mail } = req.params;

    try {
      const users = await User.findOne({
        mail: { $regex: mail, $options: "i" },
      });
      if (!users) {
        return res.status(404).json({ error: "User not found" });
      }
      if (bcrypt.compareSync(req.body.password, users.password)) {
        res.send({
          _id: users._id,
          name: users.name,
          firstname: users.firstname,
          mail: users.mail,
          phone_number: users.phone_number,
          role: users.role,
          token: generateToken(users),
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Création de l'utilisateur
   */
  createUser: async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      firstname: req.body.firstname,
      mail: req.body.mail,
      password: bcrypt.hashSync(req.body.password),
      phone_number: req.body.phone_number,
      role: req.body.role,
    });

    try {
      const existUser = await User.find({
        mail: { $regex: req.body.mail, $options: "i" },
      });
      if (existUser.length > 0) {
        return res.status(409).json({ error: "User already exists" });
      }
      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        firstname: user.firstname,
        mail: user.mail,
        password: user.password,
        phone_number: user.phone_number,
        role: user.role,
        token: generateToken(user),
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Modification des données de l'utilisateur selon son id
   */
  updateUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      user.name = req.body.name || user.name;
      user.firstname = req.body.firstname || user.firstname;
      user.mail = req.body.mail || user.mail;
      user.password = bcrypt.hashSync(req.body.password) || user.password;
      user.phone_number = req.body.phone_number || user.phone_number;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        firstname: updatedUser.firstname,
        mail: updatedUser.mail,
        password: updatedUser.password,
        phone_number: updatedUser.phone_number,
        role: updatedUser.role,
        token: generateToken(updatedUser),
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  /**
   * Suppression de l'utilisateur selon son id
   */
  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
