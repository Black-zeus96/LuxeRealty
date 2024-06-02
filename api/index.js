import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

dotenv.config();

// To access env file

// This way we hide our password of MongoDB while still giving access and sharing it on places like git
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("App running on Port 3000");
});

// Creating API routes

app.use("/api/user", userRouter);
