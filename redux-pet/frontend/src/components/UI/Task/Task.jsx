import { useDispatch } from "react-redux";
import { deleteTask } from "../../../store/features/taskReducer";
import { useModal } from "../../Context/ModalContext";

export default function Task({ task, id, setEditTask }) {
  const dispatch = useDispatch();
  const { openModal } = useModal();

  const handleDelete = () => {
    if (window.confirm(`Удалить задачу "${task.name}"?`)) {
      dispatch(deleteTask(task._id));
    }
  };

  const handleUpdate = () => {
    setEditTask(task); 
    openModal();
  };

  function background () {
    if (task.status == "pending"){
      return "bg-yellow-300 dark:bg-yellow-300/70 shadow-yellow-500 shadow-[0_3px_9px]"
    }else {
      return "bg-green-300 dark:bg-green-300/70 shadow-green-500 shadow-[0_3px_9px]"
    }
  }
  return (
    <div
      key={id}
      className={`grid h-auto ${background()}  p-3 mr-4 ml-4 rounded-2xl`}

    >
      <div className="flex justify-between" style={{ gridTemplateColumns: "7fr 1fr" }}>
        <div>
          <h1 className="text-2xl font-bold">{task.name}</h1>
          <p className="h-20">{task.description}</p>
        </div>
        <div>{task.status}</div>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-blue-400 p-2 rounded-[6px] cursor-pointer"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-400 p-2 rounded-[6px] cursor-pointer"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
