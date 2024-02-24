import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Task.css";

function Task({ id, text }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="task-container"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {text}
    </div>
  );
}

export default Task;
