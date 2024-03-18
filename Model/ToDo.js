import mongoose from "mongoose";
const { Schema } = mongoose;

const toDoSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    priority: { type: String, required: true },
    checklist: { type: Array, required: true, default: [] },
    dueDate: { type: String },
    pureDate: { type: String },
    creater: { type: String, required: true },
    colour: { type: String, required: true },
    createDate: { type: Number, required: true },
  },
  { timestamps: true }
);
const Todo = mongoose.model("Todo", toDoSchema);
export default Todo;
