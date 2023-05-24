import User from '../models/User.js';

export default {
  /**
   * Récupération de tous les utilisateurs
  */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
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
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * Récupération de l'utilisateur selon l'adresse mail passé dans l'url
   */
  getUserByMail: async (req, res) => {
    const { mail } = req.params;

    try {
      const users = await User.find({ mail: { $regex: mail, $options: 'i' } });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * Création de l'utilisateur
   */
  createUser: async (req, res) => {
    const { name, firstname, phone_number, mail, password, role } = req.body;

    try {
      const newUser = await User.create({
        name,
        firstname,
        phone_number,
        mail,
        password,
        role
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  /**
   * Modification des données de l'utilisateur selon son id
   */
  updateUser: async (req, res) => {
    const { id } = req.params;
    const { name, firstname, phone_number, mail, password, role } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, firstname, phone_number, mail, password, role },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
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
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
