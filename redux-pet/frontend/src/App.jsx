import { useState } from "react";
import Home from "./components/Pages/Home/Home";
import "./App.css";
import AppModal from "./components/AppModal/AppModal";
import { useModal } from "./components/Context/ModalContext";
import { useSelector } from "react-redux";

function App() {
  const { isOpen, closeModal } = useModal();
  const { selectedGroupId } = useSelector((state) => state.groups);

  const [editTask, setEditTask] = useState(null);

  return (
    <>
      <Home setEditTask={setEditTask} />

      {isOpen && (
        <AppModal
          closeModal={closeModal}
          selectedGroupId={selectedGroupId}
          editTask={editTask}
          setEditTask={setEditTask} 
        />
      )}
    </>
  );
}

export default App;
