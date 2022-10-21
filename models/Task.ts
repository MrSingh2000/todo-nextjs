import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  }
});
export default mongoose.models.tasks || mongoose.model("tasks", taskSchema);
