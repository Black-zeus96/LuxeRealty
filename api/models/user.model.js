import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  // to track when created and when updated
  { timestamps: true }
);

// Model

const User = mongoose.model("User", userSchema);

export default User;
