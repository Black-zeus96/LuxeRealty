import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
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
    console.log("User created successfully");
  } catch (error) {
    next(error);
  }
};

// Sign in
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Invalid User Credentials!!!"));
    // Creating token
    const token = jwt.sign({ id: validUser._id }, process.env.jwt_secret);
    // Removing password from response
    const { password: userPassword, ...rest } = validUser._doc;
    // Sending token in cookie
    res.cookie("acces_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
