import { AppFooter } from "../AppFooter/AppFooter";
import Task from "../UI/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../Context/ModalContext";
import ThemeToggle from "../UI/ThemeToggle/ThemeToggle";

export default function AppTasks({ setEditTask }) { 
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { selectedGroupId } = useSelector((state) => state.groups);
  const { openModal } = useModal();

  const handleAddTask = () => {
    if (!selectedGroupId) return alert("Сначала выберите группу");
    setEditTask(null); 
    openModal();
  };

  if (!selectedGroupId) {
    return <p className=" p-4 w-full dark:bg-gray-600">Выберите группу, чтобы увидеть задачи</p>;
  }

  return (
    <section className="flex flex-col w-full overflow-auto  dark:bg-gray-600">
      <div className="flex justify-between items-center mb-4 pt-4 ml-4 mr-4">
        <h1 className="text-3xl font-bold dark:text-white">Tasks</h1>
        <button
          onClick={handleAddTask}
          className="bg-green-500 p-2 rounded-[6px] cursor-pointer"
        >
          Add Task
        </button>

      </div>
      <div className="grid gap-4 mb-[20px]">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            setEditTask={setEditTask} 
          />
        ))}
      </div>
      <AppFooter />
    </section>
  );
}
