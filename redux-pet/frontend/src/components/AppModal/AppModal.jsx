import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createTask, updateTask } from "../../store/features/taskReducer";

export default function AppModal({ closeModal, selectedGroupId, editTask }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (editTask) {
      setName(editTask.name || "");
      setDescription(editTask.description || "");
      setStatus(editTask.status || "pending");
    } else {
      setName("");
      setDescription("");
      setStatus("pending");
    }
  }, [editTask]);

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      alert("Please complete all fields");
      return;
    }

    const payload = {
      groupId: selectedGroupId,
      name,
      description,
      status,
    };

    if (editTask) {
      console.log("Updating task:", { _id: editTask._id, ...payload });
      dispatch(updateTask({ _id: editTask._id, ...payload }));
    } 
    else {
      console.log("Creating task:", payload);
      dispatch(createTask(payload));
    }

    closeModal();
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <dialog open className="bg-gray-700/80 rounded-2xl p-0 m-auto">
        <div className="grid p-5 gap-4 grid-cols-1 w-[500px] h-auto text-white">
          <div className="flex flex-col">
            <label htmlFor="title">Write your Title</label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="bg-white placeholder-gray-600 p-2 h-10 rounded-xl text-black"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Write The Description</label>
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
              className="bg-white placeholder-gray-600 p-2 h-35 rounded-xl text-black"
            ></textarea>
          </div>
          <select
            className="text-blue-300"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="pending">pending</option>
            <option value="done">done</option>
          </select>
          <div className="flex justify-between">
            <button
              className="text-2xl hover:text-blue-400 cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="text-2xl hover:text-red-400 cursor-pointer"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>,
    document.getElementById("modal")
  );
}
