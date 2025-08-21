import Group from "../UI/Group/Group";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroups,
  createGroup,
  deleteGroup
} from "../../store/features/groupsReducer";
import { fetchTasksByGroup } from "../../store/features/taskReducer";
import { selectGroup } from "../../store/features/groupsReducer";
import { useEffect, useState } from "react";
import ThemeToggle from "../UI/ThemeToggle/ThemeToggle";
import styles from "./AppGroups.module.css"

export default function AppGroups() {
  const dispatch = useDispatch();
  const { groups, loading, error } = useSelector((state) => state.groups);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleSelectGroup = (id) => {
    dispatch(selectGroup(id));
    dispatch(fetchTasksByGroup(id));
    setIsOpen(false);
  };

  const handleSet = (value) => {
    
    setDisplay(value)
    console.log("set")
  }
  
  const handleCreateGroup = (value) =>{
    if(value === "null"){
      return;
    }
    else if (value ) {
      dispatch(createGroup(value))
    }
    else{
      alert("write something")
    }
  }

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="flex flex-col">
      <aside 
        className={`${styles.asideGroups} ${isOpen ? styles.active : ""} flex flex-col w-60 border-r-1 overflow-auto  bg-gray-100 dark:bg-gray-800`}
        style={{ height: "calc(100vh - 64px)" }}
      >
        <button className="bg-blue-500 text-white m-4 p-4 rounded-2xl cursor-pointer hover:bg-blue-800"
          onClick={() =>
            handleCreateGroup(String(prompt("Введите название группы")))
          }
        >
          Добавить группу
        </button>
        {groups.map((group) => (
          <Group
            key={group._id}
            name={group.name}
            getGroupId = {() => handleSelectGroup(group._id)}
            onDelete={() =>
              !!confirm(`Are you sure you want do delete ${group.name}`) &&
              dispatch(deleteGroup(group._id))
            }
          ></Group>
        ))}
      </aside>
      <button onClick={() => setIsOpen((s) => !s)} className={`${styles.groupsBtn} ${isOpen ? styles.hidden : ""} absolute size-[50px] top-1/2 bg-amber-300 rounded-xl cursor-pointer`}><img src="arrow.svg" className="size-[35px] flex m-auto"/></button>
    </div>
  );
}
