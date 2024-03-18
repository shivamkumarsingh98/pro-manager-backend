import express from "express";
import dotenv from "dotenv";
import registerRouter from "./Routes/Register.js";
import { connectMongoDb } from "./Config/MongoDb.js";
import loginRouter from "./Routes/Login.js";
import tasksRouter from "./Routes/Tasks.js";
import cors from "cors";
import userRouter from "./Routes/User.js";
dotenv.config();
const server = express();
connectMongoDb();
server.use(express.json());
server.use(cors());

server.use("/promaneger/api/user", registerRouter);
server.use("/promaneger/api/user", loginRouter);
server.use("/promaneger/api/tasks", tasksRouter);
server.use("/promaneger/api/get", userRouter);
//l0LU9xM6WponKh0o
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`${`Server is running at port ${PORT} `}`);
});
