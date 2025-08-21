import { useState } from "react";
import styles from "./BoardView.module.scss";
import Columns from "./columns/Columns";
import Ticket from "./tickets/Tickets";
import { toast } from "react-toastify";

const columns = [
  { key: "To Do", title: "To Do", id: "toDo" },
  { key: "In Progress", title: "In Progress", id: "inProgress" },
  { key: "Review", title: "Review", id: "review" },
  { key: "Done", title: "Done", id: "done" },
];

export default function BoardView({ tasks, setTasks, openModal, openEditModal }) {
  const [draggingTask, setDraggingTask] = useState(null);

  function onDragStart(task) {
    if (!task || !task._id) {
      console.error("Cannot drag: invalid task or missing _id");
      return;
    }
    
    setDraggingTask(task);
  }

  async function onDrop(status) {
  if (!draggingTask) return;
  if (!draggingTask._id) {
    console.error("Cannot update: task._id is missing");
    return;
  }
  if (draggingTask.status === status) return;

  const updatedTask = { ...draggingTask, status };

  try {
    const res = await fetch(`http://localhost:3001/api/tasks/${draggingTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedTask),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update: ${res.status} ${errorText}`);
    }

    const saved = await res.json();

    setTasks((prev) =>
      prev.map((t) => (t._id === saved._id ? saved : t))
    );

    toast.success("Task updated!");
  } catch (err) {
    console.error("Update failed:", err);
  }
  setDraggingTask(null);
}


  return (
    <div className={styles.board}>
      {columns.map((col) => (
        <Columns
          key={col.key}
          title={col.title}
          openModal={() => openModal(col.key)}
          styleId={col.id}
          tickets={tasks
            .filter((t) => t.status === col.key)
            .map((task) => (
              <Ticket
                key={task._id}
                draggable
                priority={task.priority}
                onDragStart={() => onDragStart(task)}
                onClick={() => openEditModal(task)}
                className={styles.task}
                name={task.name}
                description={task.description}
                dueDate={task.due_date}
              />
            ))}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDrop(col.key);
          }}
        />
      ))}
    </div>
  );
}
