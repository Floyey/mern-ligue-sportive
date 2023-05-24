import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  console.log(res);
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserByMail = async (req, res) => {
  const { mail } = req.params;

  try {
    const users = await User.find({ mail: { $regex: mail, $options: 'i' } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
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
};

export const createUser = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
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
};
