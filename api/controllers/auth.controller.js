import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  // Encrypting/hashing password
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Adding new user
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Saving to database
    await newUser.save();
    // Making sure user is added
    res.status(201).json("User created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
