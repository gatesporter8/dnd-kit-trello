// used the dnd-kit library for the drag and drop functionality, and the sortable lists. Relied
// heavily on the documentation for the libary - https://docs.dndkit.com/

import { useState } from "react";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./App.css";
import List from "./components/List";
import TaskForm from "./components/TaskForm";
import { arrayMove } from "@dnd-kit/sortable";
import confetti from "canvas-confetti";

function App() {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: [],
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const addNewTask = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
  };

  const triggerConfetti = () => {
    confetti({
      zIndex: 999,
      particleCount: 2000,
      spread: 360,
      gravity: -2,
    });
  };

  const handleDragOver = (e) => {
    const { active, over } = e;

    if (
      active.data.current?.sortable?.containerId ===
      over.data.current?.sortable?.containerId
    )
      return;

    const activeListName = active.data.current.sortable.containerId;
    const activeId = active.id;
    const activeList = tasks[activeListName];

    const task = activeList.find((task) => task.id === activeId);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [activeListName]: prevTasks[activeListName].filter(
        (task) => task.id !== activeId
      ),
    }));

    let overListName;
    let overList;

    // moving task into an empty list
    if (!over.data.current) {
      // id, not the containerId, will hold the list name for over prior to any elements being in the list
      overListName = over.id;
      overList = tasks[overListName];
      setTasks((prevTasks) => ({
        ...prevTasks,
        [overListName]: [...prevTasks[overListName], task],
      }));
    } else {
      // moving task into a populated list
      overListName = over.data.current.sortable.containerId;
      overList = tasks[overListName];
      const overId = over.id;
      const newIndex = overList.findIndex((task) => task.id === overId);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [overListName]: [
          ...prevTasks[overListName].slice(0, newIndex),
          task,
          ...prevTasks[overListName].slice(newIndex),
        ],
      }));
    }

    if (overListName === "done") {
      triggerConfetti();
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id === over.id) return;

    const listName = active.data.current.sortable.containerId;
    setTasks((prevTasks) => {
      const list = prevTasks[listName];

      const oldIndex = list.findIndex((task) => task.id === active.id);
      const newIndex = list.findIndex((task) => task.id === over.id);
      return {
        ...prevTasks,
        [listName]: arrayMove(list, oldIndex, newIndex),
      };
    });
  };

  return (
    <div className="app-container">
      <div className="app-title">
        <h1>My Todo List App</h1>
      </div>
      <TaskForm addNewTask={addNewTask} />
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="lists-container">
          {Object.keys(tasks).map((key) => {
            return (
              <List id={key} name={key.toUpperCase()} tasks={tasks[key]}></List>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
