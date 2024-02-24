import "./List.css";
import Task from "./Task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function List({ id, name, tasks }) {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="sortable-list-container">
      <div className="sortable-list-header">{name}</div>
      <SortableContext
        id={id}
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="sortable-list-items">
          {tasks.map((task) => (
            <Task key={task.id} id={task.id} text={task.text}></Task>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default List;
