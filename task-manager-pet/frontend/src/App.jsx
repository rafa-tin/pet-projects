import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header/Header";
import "./App.css";
import UserInfo from "./components/UserInfo/UserInfo";
import TabSection from "./components/TabSection/TabSection";
import BoardView from "./components/BoardView/BoardView";
import TableView from "./components/TableView/TableView";
import Modal from "./components/BoardView/modal/Modal";
import LogPage from "./components/Auth/LogPage/LogPage";
import RegPage from "./components/Auth/RegPage/RegPage";
import { toast, ToastContainer } from 'react-toastify';


export default function App() {
  const [tab, setTab] = useState("board");
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);
  const [ticketToEdit, setTicketToEdit] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token")); 

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:3001/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error(err);
        setTasks([]); 
      });
  }, [token]);

  function openModal(column) {
    setActiveColumn(column);
    setTicketToEdit(null);
    setModalOpen(true);
  }

  function openEditModal(ticket) {
    setTicketToEdit(ticket);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveColumn(null);
    setTicketToEdit(null);
  }
  function saveTicket(ticket) {
    const token = localStorage.getItem("token");

    if (ticket._id) {
      fetch(`http://localhost:3001/api/tasks/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticket),
      })
        .then((res) => res.json())
        .then((updated) => {
          setTasks((prev) =>
            prev.map((t) => (t._id === updated._id ? updated : t))
          );
          closeModal();
          toast.success("Task updated") 
        });
    } else {
      fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticket),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTasks((prev) => [...prev, newTask]);
          closeModal(); 
          toast.success("Task added") 
        });
    }
  }

  // function saveTicket(ticket) {
  //   if (!token) return;

  //   const method = ticket.id ? "PUT" : "POST";
  //   const url = ticket.id
  //     ? `http://localhost:3001/api/tasks/${ticket.id}`
  //     : "http://localhost:3001/api/tasks";

  //   fetch(url, {
  //     method,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(ticket),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       if (ticket.id) {
  //         setTasks((prev) =>
  //           prev.map((t) => (t.id === result.id ? result : t))
  //         );
  //       } else {
  //         setTasks((prev) => [...prev, result]);
  //       }
  //     });

  //   closeModal();
  // }

  function deleteTicket(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      setTasks((prev) => prev.filter((t) => t._id !== id));
    });
    toast.success("deleted")
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <Router>
      <ToastContainer position="bottom-right" autoClose={5000} />
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <>
                <Header onLogout={handleLogout}>
                  <UserInfo />
                </Header>

                <TabSection
                  active={tab}
                  onChange={(current) => setTab(current)}
                />

                {tab === "board" && (
                  <BoardView
                    tasks={tasks}
                    openModal={openModal}
                    openEditModal={openEditModal}
                    setTasks={setTasks}
                  />
                )}

                {tab === "table" && (
                  <TableView
                    tasks={tasks}
                    openModal={openModal}
                    openEditModal={openEditModal}
                  />
                )}

                <Modal
                  defaultStatus={activeColumn}
                  open={modalOpen}
                  onClose={closeModal}
                  onSave={saveTicket}
                  ticketToEdit={ticketToEdit}
                  onDelete={deleteTicket}
                />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<LogPage setToken={setToken} />} />
        <Route path="/register" element={<RegPage />} />
      </Routes>
    </Router>
  );
}
