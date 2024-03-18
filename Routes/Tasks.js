import express from "express";
import {
  addToBacklog,
  addToDone,
  addToInProgress,
  addToToDo,
  createTodo,
  deleteTask,
  editTask,
  filterAllTasksByMonth,
  filterAllTasksByToday,
  filterAllTasksByWeek,
  filterAllTasksByYear,
  getShareTask,
  getUserAllCreatedTasksInfo,
} from "../Controller/Tasks.js";
import { varifyToken } from "../MiddleWare/Authentication.js";

const router = express.Router();

router
  .get("/get/share/task/:id", getShareTask)
  .get("/get/user/alltasksinfo", varifyToken, getUserAllCreatedTasksInfo)
  .get("/get/today/tasks", varifyToken, filterAllTasksByToday)
  .get("/get/month/tasks", varifyToken, filterAllTasksByMonth)
  .get("/get/week/tasks", varifyToken, filterAllTasksByWeek)
  .get("/get/year/tasks", varifyToken, filterAllTasksByYear)
  .post("/createTodo", varifyToken, createTodo)
  .post("/add/backlog/:id", varifyToken, addToBacklog)
  .post("/add/todo/:id", varifyToken, addToToDo)
  .post("/add/inprogress/:id", varifyToken, addToInProgress)
  .post("/add/done/:id", varifyToken, addToDone)
  .post("/edit/task/:id", varifyToken, editTask)
  .post("/delete/task/:id", varifyToken, deleteTask);

export default router;
