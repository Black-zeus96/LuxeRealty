import express from "express";
import { createListing, deleteListing, updateListing, getListing } from "../controllers/listing.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUserToken, createListing);
router.delete("/delete/:id", verifyUserToken, deleteListing);
router.post('/update/:id', verifyUserToken, updateListing);
router.get('/get/:id', verifyUserToken, getListing);
export default router;
