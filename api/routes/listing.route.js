import express from "express";
import { createListing, deleteListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUserToken, createListing);
router.delete("/delete/:id", verifyUserToken, deleteListing);

export default router;
