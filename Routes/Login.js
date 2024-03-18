import express from "express";
import { registerUser } from "../Controller/Register.js";
import { loginUser } from "../Controller/LoginUser.js";
const router = express.Router();

router.post("/login", loginUser);

export default router;
