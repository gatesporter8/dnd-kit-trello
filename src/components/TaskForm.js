import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TaskForm.css";

function TaskForm({ addNewTask }) {
  const [taskText, setTaskText] = useState("");

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskText.trim()) return;

    const newTask = {
      id: uuidv4(),
      text: taskText,
    };

    addNewTask(newTask);
    setTaskText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="task-form-label" htmlFor="task-input">
        Add a new task!
      </label>
      <input
        type="text"
        id="task-input"
        value={taskText}
        onChange={handleInputChange}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
