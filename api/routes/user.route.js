import express from "express";
import {
  deleteUser,
  test,
  updateUserInfo,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);

// Route for updating user

router.post("/update/:id", verifyUserToken, updateUserInfo);

// Route for deleting user

router.delete("/delete/:id", verifyUserToken, deleteUser);

export default router;
