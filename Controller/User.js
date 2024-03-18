import Backlog from "../Model/Backlog.js";
import Done from "../Model/Done.js";
import InProgress from "../Model/InProgress.js";
import Todo from "../Model/ToDo.js";
import User from "../Model/User.js";
import bcrypt from "bcrypt";
const getUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserAllTasks = async (req, res) => {
  try {
    const { _id } = req.user;
    const allTodo = await Todo.find({ creater: _id });
    const allbacklog = await Backlog.find({ creater: _id });
    const allInProgress = await InProgress.find({ creater: _id });
    const allDone = await Done.find({ creater: _id });
    res.status(200).json({
      backlog: allbacklog,
      todo: allTodo,
      inProgress: allInProgress,
      done: allDone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeUserInfo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { oldPassword, newPassword, name } = req.body;

    if (_id && oldPassword && newPassword) {
      const user = await User.findById(_id);
      const varifyOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (varifyOldPassword) {
        console.log(varifyOldPassword);
        const count = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(newPassword, count);
        const updateUser = await User.findByIdAndUpdate(
          _id,
          {
            password: hashedPassword,
          },
          { new: true }
        );

        res.status(201).json({ user: updateUser });
      }
    } else if (_id && name) {
      const updateUser = await User.findByIdAndUpdate(
        _id,
        {
          name: name,
        },
        { new: true }
      );

      res.status(201).json({ user: updateUser });
    } else if (_id && oldPassword && newPassword & name) {
      const user = await User.findById(_id);
      const varifyOldPassword = await bcrypt.compare(
        oldPassword,
        user.password
      );

      if (varifyOldPassword) {
        console.log(varifyOldPassword);
        const count = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(newPassword, count);
        const updateUser = await User.findByIdAndUpdate(
          _id,
          {
            password: hashedPassword,
            name: name,
          },
          { new: true }
        );

        res.status(201).json({ user: updateUser });
      }
    } else {
      {
        res.status(400).json({ message: "All inputs are required!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { getUser, getUserAllTasks, changeUserInfo };
