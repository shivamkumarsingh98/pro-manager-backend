import express from "express";

import { varifyToken } from "../MiddleWare/Authentication.js";
import {
  changeUserInfo,
  getUser,
  getUserAllTasks,
} from "../Controller/User.js";

const router = express.Router();

router
  .get("/user", varifyToken, getUser)
  .get("/user/alltasks", varifyToken, getUserAllTasks)
  .post("/user/change/userInfo", varifyToken, changeUserInfo);

export default router;
