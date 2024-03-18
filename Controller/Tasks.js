import Backlog from "../Model/Backlog.js";
import Done from "../Model/Done.js";
import InProgress from "../Model/InProgress.js";
import Todo from "../Model/ToDo.js";
const getShareTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const backlog = await Backlog.findOne({ id: id });
      const toDo = await Todo.findOne({ id: id });
      const inProgeess = await InProgress.findOne({ id: id });
      const done = await Done.findOne({ id: id });

      if (backlog) {
        res.status(200).json({ task: backlog });
      } else if (toDo) {
        res.status(200).json({ task: toDo });
      } else if (inProgeess) {
        res.status(200).json({ task: inProgeess });
      } else if (done) {
        res.status(200).json({ task: done });
      } else {
        res.status(404).json({ message: "Task not found!" });
      }
    } else {
      res.status(400).json({ message: "Task id is required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const filterAllTasksByYear = async (req, res) => {
  try {
    const { _id } = req.user;
    const currentDate = new Date();

    let nextYear = "";
    let prevYear = "";
    let weekNum = 0;
    const localDate = currentDate.toISOString().split("T")[0].split("-");
    localDate[2] = parseInt(localDate[2]) + 0;

    const prevYearDate = currentDate.toISOString().split("T")[0].split("-");
    prevYearDate[0] = parseInt(prevYearDate[0]) - 1;
    prevYearDate[1] = parseInt(prevYearDate[1]) + 0;

    const nextYearDate = currentDate.toISOString().split("T")[0].split("-");
    nextYearDate[0] = parseInt(nextYearDate[0]) + 1;
    nextYearDate[1] = parseInt(nextYearDate[1]) + 0;

    if (parseInt(localDate[2]) + 0 <= 7) {
      weekNum = 1;
    } else if (parseInt(localDate[2]) + 0 <= 14) {
      weekNum = 2;
    } else if (parseInt(localDate[2]) + 0 <= 21) {
      weekNum = 3;
    } else if (parseInt(localDate[2]) + 0 <= 28) {
      weekNum = 4;
    } else {
      weekNum = 5;
    }

    prevYearDate.splice(2, 0, weekNum);
    nextYearDate.splice(2, 0, weekNum);

    prevYearDate.forEach((num) => {
      prevYear += String(num);
    });
    nextYearDate.forEach((num) => {
      nextYear += String(num);
    });

    const todo = await Todo.find({
      $and: [
        { createDate: { $gt: parseInt(prevYear) } },
        { createDate: { $lt: parseInt(nextYear) } },
        { creater: { $eq: _id } },
      ],
    });

    const backlog = await Backlog.find({
      $and: [
        { createDate: { $gt: parseInt(prevYear) } },
        { createDate: { $lt: parseInt(nextYear) } },
        { creater: { $eq: _id } },
      ],
    });
    const inProgress = await InProgress.find({
      $and: [
        { createDate: { $gt: parseInt(prevYear) } },
        { createDate: { $lt: parseInt(nextYear) } },
        { creater: { $eq: _id } },
      ],
    });
    const done = await Done.find({
      $and: [
        { createDate: { $gt: parseInt(prevYear) } },
        { createDate: { $lt: parseInt(nextYear) } },
        { creater: { $eq: _id } },
      ],
    });

    res.status(200).json({
      todo: todo,
      backlog: backlog,
      inProgress: inProgress,
      done: done,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const filterAllTasksByMonth = async (req, res) => {
  try {
    const { _id } = req.user;
    const currentDate = new Date();

    let nextMonth = "";
    let prevMonth = "";
    let weekNum = 0;
    const localDate = currentDate.toISOString().split("T")[0].split("-");

    localDate[2] = parseInt(localDate[2]) + 0;

    const prevMonthDate = currentDate.toISOString().split("T")[0].split("-");
    prevMonthDate[1] = parseInt(prevMonthDate[1]) - 1;

    const nextMonthDate = currentDate.toISOString().split("T")[0].split("-");
    nextMonthDate[1] = parseInt(nextMonthDate[1]) + 1;

    if (parseInt(localDate[2]) + 0 <= 7) {
      weekNum = 1;
    } else if (parseInt(localDate[2]) + 0 <= 14) {
      weekNum = 2;
    } else if (parseInt(localDate[2]) + 0 <= 21) {
      weekNum = 3;
    } else if (parseInt(localDate[2]) + 0 <= 28) {
      weekNum = 4;
    } else {
      weekNum = 5;
    }

    prevMonthDate.splice(2, 0, weekNum);
    nextMonthDate.splice(2, 0, weekNum);

    prevMonthDate.forEach((num) => {
      prevMonth += String(num);
    });
    nextMonthDate.forEach((num) => {
      nextMonth += String(num);
    });

    const todo = await Todo.find({
      $and: [
        { createDate: { $gt: parseInt(prevMonth) } },
        { createDate: { $lt: parseInt(nextMonth) } },
        { creater: { $eq: _id } },
      ],
    });
    const backlog = await Backlog.find({
      $and: [
        { createDate: { $gt: parseInt(prevMonth) } },
        { createDate: { $lt: parseInt(nextMonth) } },
        { creater: { $eq: _id } },
      ],
    });
    const inProgress = await InProgress.find({
      $and: [
        { createDate: { $gt: parseInt(prevMonth) } },
        { createDate: { $lt: parseInt(nextMonth) } },
        { creater: { $eq: _id } },
      ],
    });
    const done = await Done.find({
      $and: [
        { createDate: { $gt: parseInt(prevMonth) } },
        { createDate: { $lt: parseInt(nextMonth) } },
        { creater: { $eq: _id } },
      ],
    });

    res.status(200).json({
      todo: todo,
      backlog: backlog,
      inProgress: inProgress,
      done: done,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const filterAllTasksByWeek = async (req, res) => {
  try {
    const { _id } = req.user;
    const currentDate = new Date();
    let nextWeek = "";
    let prevWeek = "";
    let weekNum = 0;

    const localDate = currentDate.toISOString().split("T")[0].split("-");

    localDate[2] = parseInt(localDate[2]) + 0;

    const prevWeekDate = currentDate.toISOString().split("T")[0].split("-");
    prevWeekDate[1] = parseInt(prevWeekDate[1]) + 0;

    const nextWeekDate = currentDate.toISOString().split("T")[0].split("-");
    nextWeekDate[1] = parseInt(nextWeekDate[1]) + 0;

    if (parseInt(localDate[2]) + 0 <= 7) {
      weekNum = 1;
    } else if (parseInt(localDate[2]) + 0 <= 14) {
      weekNum = 2;
    } else if (parseInt(localDate[2]) + 0 <= 21) {
      weekNum = 3;
    } else if (parseInt(localDate[2]) + 0 <= 28) {
      weekNum = 4;
    } else {
      weekNum = 5;
    }

    if (weekNum === 1) {
      prevWeekDate[1] = parseInt(prevWeekDate[1]) - 1;
      prevWeekDate.splice(2, 0, 5);
      nextWeekDate.splice(2, 0, weekNum + 1);
    } else if (weekNum === 5) {
      nextWeekDate[1] = parseInt(prevWeekDate[1]) + 1;
      nextWeekDate.splice(2, 0, 1);
      nextWeekDate[3] = "01";
      prevWeekDate.splice(2, 0, weekNum - 1);
    } else {
      prevWeekDate.splice(2, 0, weekNum - 1);
      nextWeekDate.splice(2, 0, weekNum + 1);
    }

    prevWeekDate.forEach((num) => {
      prevWeek += String(num);
    });
    nextWeekDate.forEach((num) => {
      nextWeek += String(num);
    });

    const todo = await Todo.find({
      $and: [
        { createDate: { $gt: parseInt(prevWeek) } },
        { createDate: { $lt: parseInt(nextWeek) } },
        { creater: { $eq: _id } },
      ],
    });
    const backlog = await Backlog.find({
      $and: [
        { createDate: { $gt: parseInt(prevWeek) } },
        { createDate: { $lt: parseInt(nextWeek) } },
        { creater: { $eq: _id } },
      ],
    });
    const inProgress = await InProgress.find({
      $and: [
        { createDate: { $gt: parseInt(prevWeek) } },
        { createDate: { $lt: parseInt(nextWeek) } },
        { creater: { $eq: _id } },
      ],
    });
    const done = await Done.find({
      $and: [
        { createDate: { $gt: parseInt(prevWeek) } },
        { createDate: { $lt: parseInt(nextWeek) } },
        { creater: { $eq: _id } },
      ],
    });

    res.status(200).json({
      todo: todo,
      backlog: backlog,
      inProgress: inProgress,
      done: done,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const filterAllTasksByToday = async (req, res) => {
  try {
    const { _id } = req.user;
    let dateNum = "";
    let weekNum = 0;

    const currentDate = new Date();
    const localDate = currentDate.toISOString().split("T")[0].split("-");
    localDate[1] = parseInt(localDate[1]) + 0;
    localDate[2] = parseInt(localDate[2]) + 0;

    if (parseInt(localDate[2]) + 0 <= 7) {
      weekNum = 1;
    } else if (parseInt(localDate[2]) + 0 <= 14) {
      weekNum = 2;
    } else if (parseInt(localDate[2]) + 0 <= 21) {
      weekNum = 3;
    } else if (parseInt(localDate[2]) + 0 <= 28) {
      weekNum = 4;
    } else {
      weekNum = 5;
    }

    localDate.splice(2, 0, weekNum);

    localDate.forEach((num) => {
      dateNum += String(num);
    });

    const todo = await Todo.find({
      $and: [
        { createDate: { $eq: parseInt(dateNum) } },
        { creater: { $eq: _id } },
      ],
    });
    const backlog = await Backlog.find({
      $and: [
        { createDate: { $eq: parseInt(dateNum) } },
        { creater: { $eq: _id } },
      ],
    });
    const inProgress = await InProgress.find({
      $and: [
        { createDate: { $eq: parseInt(dateNum) } },
        { creater: { $eq: _id } },
      ],
    });
    const done = await Done.find({
      $and: [
        { createDate: { $eq: parseInt(dateNum) } },
        { creater: { $eq: _id } },
      ],
    });

    res.status(200).json({
      todo: todo,
      backlog: backlog,
      inProgress: inProgress,
      done: done,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const createTodo = async (req, res) => {
  try {
    let dateNum = "";
    let weekNum = 0;

    const currentDate = new Date();
    const localDate = currentDate.toISOString().split("T")[0].split("-");
    localDate[1] = parseInt(localDate[1]) + 0;
    localDate[2] = parseInt(localDate[2]) + 0;

    if (parseInt(localDate[2]) + 0 <= 7) {
      weekNum = 1;
    } else if (parseInt(localDate[2]) + 0 <= 14) {
      weekNum = 2;
    } else if (parseInt(localDate[2]) + 0 <= 21) {
      weekNum = 3;
    } else if (parseInt(localDate[2]) + 0 <= 28) {
      weekNum = 4;
    } else {
      weekNum = 5;
    }

    localDate.splice(2, 0, weekNum);

    localDate.forEach((num) => {
      dateNum += String(num);
    });

    const { _id } = req.user;
    const { title, checklist, priority, dueDate, colour, pureDate, id } =
      req.body;

    if (title && checklist && priority && _id && colour) {
      const createTodo = new Todo({
        id,
        title,
        checklist,
        priority,
        creater: _id,
        dueDate,
        pureDate,
        colour,
        createDate: parseInt(dateNum),
      });
      await createTodo.save();

      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToBacklog = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "TODO",
      2: "INPROGRESS",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createBacklog = new Backlog({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        createDate: task.createDate,
        creater: _id,
      });
      await createBacklog.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Todo.findByIdAndDelete(id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await InProgress.findByIdAndDelete(id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(id);
      }
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToToDo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "BACKLOG",
      2: "INPROGRESS",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createTodo = new Todo({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        createDate: task.createDate,
        creater: _id,
      });
      await createTodo.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(task._id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await InProgress.findByIdAndDelete(task._id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(task._id);
      }
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToInProgress = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createInProgress = new InProgress({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        createDate: task.createDate,
        creater: _id,
      });
      await createInProgress.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(task._id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await Todo.findByIdAndDelete(task._id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(task._id);
      }
      res.status(201).json(createInProgress);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToDone = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
    };
    if (task && removeFrom && _id && id) {
      const createDone = new Done({
        id: task.id,
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        createDate: task.createDate,
        creater: _id,
      });
      await createDone.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await Todo.findByIdAndDelete(id);
      } else {
        const deleteTask = await InProgress.findByIdAndDelete(id);
      }
      res.status(201).json(createDone);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const editTask = async (req, res) => {
  try {
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
      4: "DONE",
    };
    const { id } = req.params;
    const { _id } = req.user;
    const { task, from } = req.body;

    if (id && _id && task && from) {
      if (from === tasks["1"]) {
        const updateTask = await Backlog.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,

            creater: _id,
          },
          { new: true }
        );
      } else if (from === tasks["2"]) {
        const updateTask = await Todo.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else if (from === tasks["3"]) {
        const updateTask = await InProgress.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else {
        const updateTask = await Done.findByIdAndUpdate(
          id,
          {
            id: task.id,
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      }

      res.status(201).json({ mesage: "Updated succesfully!" });
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const deleteTask = async (req, res) => {
  try {
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
      4: "DONE",
    };
    const { id } = req.params;
    const { _id } = req.user;
    const { from } = req.body;

    if (id && _id && from) {
      if (from === tasks["1"]) {
        const updateTask = await Backlog.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      } else if (from === tasks["2"]) {
        const updateTask = await Todo.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      } else if (from === tasks["3"]) {
        const updateTask = await InProgress.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      } else {
        const updateTask = await Done.findOneAndDelete({
          $and: [{ _id: id }, { creater: _id }],
        });
      }

      res.status(201).json({ mesage: "Deleted succesfully!" });
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const getUserAllCreatedTasksInfo = async (req, res) => {
  try {
    const { _id } = req.user;

    if (_id) {
      let userAllHighPriorityTasks;
      let userAllModeratePriorityTasks;
      let userAllLowPriorityTasks;

      let userAllDueDatesTasks = 0;
      const userAllTodoTasks = await Todo.find({ creater: _id });
      const userAllBacklogsTasks = await Backlog.find({ creater: _id });
      const userAllInProgressTasks = await InProgress.find({ creater: _id });
      const userAllDoneTasks = await Done.find({ creater: _id });

      userAllTodoTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      userAllBacklogsTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      userAllInProgressTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      userAllDoneTasks.filter(({ dueDate }) => {
        if (dueDate) {
          userAllDueDatesTasks += 1;
        }
      });
      const highProirityTodo = await Todo.find({ priority: "high-priority" });
      const highProirityBacklog = await Backlog.find({
        $and: [{ creater: _id }, { priority: "high-priority" }],
      });
      const highProirityInProgress = await InProgress.find({
        $and: [{ creater: _id }, { priority: "high-priority" }],
      });
      const highProirityDone = await Done.find({
        $and: [{ creater: _id }, { priority: "high-priority" }],
      });

      const moderateProirityTodo = await Todo.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });
      const moderateProirityBacklog = await Backlog.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });
      const moderateProirityInProgress = await InProgress.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });
      const moderateProirityDone = await Done.find({
        $and: [{ creater: _id }, { priority: "moderate-priority" }],
      });

      const lowProirityTodo = await Todo.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      const lowProirityBacklog = await Backlog.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      const lowProirityInProgress = await InProgress.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      const lowProirityDone = await Done.find({
        $and: [{ creater: _id }, { priority: "low-priority" }],
      });
      userAllHighPriorityTasks =
        highProirityTodo.length +
        highProirityBacklog.length +
        highProirityInProgress.length +
        highProirityDone.length;

      userAllModeratePriorityTasks =
        moderateProirityTodo.length +
        moderateProirityBacklog.length +
        moderateProirityInProgress.length +
        moderateProirityDone.length;

      userAllLowPriorityTasks =
        lowProirityTodo.length +
        lowProirityBacklog.length +
        lowProirityInProgress.length +
        lowProirityDone.length;

      res.status(200).json({
        backlog: userAllBacklogsTasks.length,
        todo: userAllTodoTasks.length,
        inProgress: userAllInProgressTasks.length,
        done: userAllDoneTasks.length,
        highPriority: userAllHighPriorityTasks,
        moderatePriority: userAllModeratePriorityTasks,
        lowPriority: userAllLowPriorityTasks,
        dueDate: userAllDueDatesTasks,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  createTodo,
  addToBacklog,
  addToToDo,
  addToInProgress,
  addToDone,
  editTask,
  deleteTask,
  getUserAllCreatedTasksInfo,
  getShareTask,
  filterAllTasksByMonth,
  filterAllTasksByWeek,
  filterAllTasksByToday,
  filterAllTasksByYear,
};
