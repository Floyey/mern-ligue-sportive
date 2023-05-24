import User from "../models/User.js";
import { generateToken } from "./../auth/authentification.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
  console.log(res);
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByMail = async (req, res) => {
  const { mail } = req.params;

  try {
    const users = await User.findOne({ mail: { $regex: mail, $options: "i" } });
    if (users) {
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
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
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
};

export const createUser = async (req, res) => {
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
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
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
};
