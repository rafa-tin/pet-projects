import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import Button from "../../UI/Button/Button";
import DateInput from "../../UI/DatePicker/DateInput";
import Heading from "../../UI/Heading/Heding";

export default function Modal({
  open,
  onClose,
  onSave,
  onDelete,
  ticketToEdit,
  defaultStatus,
}) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const [nameError, setNameError] = useState("");
  const [priorityError, setPriorityError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const dialogRef = useRef(null);

  const now = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ Инициализируем поля при открытии
  useEffect(() => {
    if (ticketToEdit) {
      setTaskName(ticketToEdit.name);
      setPriority(ticketToEdit.priority);
      setStatus(ticketToEdit.status);
      setDueDate(ticketToEdit.due_date);
      setDescription(ticketToEdit.description);
    } else {
      setTaskName("");
      setPriority("");
      setStatus(defaultStatus || "");
      setDueDate("");
      setDescription("");
    }
  }, [ticketToEdit, defaultStatus]);

  function saveTicket() {
    setNameError("");
    setPriorityError("");
    setStatusError("");
    setDueDateError("");
    setDescriptionError("");

    if (!taskName.trim()) setNameError("Name is required");
    if (!priority) setPriorityError("Priority is required");
    if (!status) setStatusError("Status is required");
    if (!dueDate) setDueDateError("Due date is required");
    if (!description) setDescriptionError("Descriptio is required");

    if (!taskName.trim() || !priority || !status || !dueDate || !description)
      return;

    const ticketData = {
      _id: ticketToEdit?._id, 
      name: taskName,
      priority,
      status,
      due_date: dueDate,
      description,
    };
    onSave(ticketData);
    onClose();
  }

  function handleDelete() {
    if (ticketToEdit) {
      onDelete(ticketToEdit._id);
      onClose();
    }
  }

  return open
    ? createPortal(
        <div className={styles.overlay}>
          <dialog
            ref={dialogRef}
            open={open}
            className={styles.dialogPage}
            onClose={onClose}
          >
            <div className={styles.dialogContainer}>
              <div className={styles.dialogTop}>
                <input
                  type="text"
                  value={taskName}
                  placeholder="Name The Task"
                  onChange={(e) => setTaskName(e.target.value)}
                  className={styles.taskInput}
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  required
                />
                {nameError && (
                  <div className="invalid-feedback" style={{ display: "flex" }}>
                    {nameError}
                  </div>
                )}

                <Button onClick={onClose} style={{ padding: "10px" }}>
                  x
                </Button>
              </div>

              <section className={styles.formContainer}>
                <div className={styles.status}>
                  <p>Status:</p>
                  <select
                    className={styles.taskInput}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select status
                    </option>
                    <option value="To Do" className={styles.toDo}>
                      To Do
                    </option>
                    <option value="In Progress" className={styles.inProgress}>
                      In Progress
                    </option>
                    <option value="Review" className={styles.review}>
                      Review
                    </option>
                    <option value="Done" className={styles.done}>
                      Done
                    </option>
                  </select>
                  {statusError && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "flex" }}
                    >
                      {statusError}
                    </div>
                  )}
                </div>

                <div className={styles.priority}>
                  <p>Priority:</p>
                  <select
                    className={styles.taskInput}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select priority
                    </option>
                    <option value="Low Priority">Low Priority</option>
                    <option value="Medium Priority">Medium Priority</option>
                    <option value="High Priority">High Priority</option>
                  </select>
                  {priorityError && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "flex" }}
                    >
                      {priorityError}
                    </div>
                  )}
                </div>

                <div className={styles.dueDate}>
                  <p>Due Date:</p>
                  <div
                    className={`${styles.dateContainer} ${styles.taskInput}`}
                  >
                    <DateInput
                      option={false}
                      dueDate={dueDate}
                      onChange={(e) => setDueDate(e.toISOString())}
                    />
                  </div>
                  {dueDateError && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "flex" }}
                    >
                      {dueDateError}
                    </div>
                  )}
                </div>

                <div className={styles.creationDate}>
                  <p>Creation Date:</p>
                  <p style={{ fontSize: "13px", paddingLeft: "2px" }}>{now}</p>
                </div>
              </section>

              <div className={styles.description}>
                <Heading style={{ marginBottom: "15px", fontSize: "16px" }}>
                  Description
                </Heading>
                <textarea
                  placeholder="Please describe the Task"
                  className={styles.descInput}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {descriptionError && (
                  <div className="invalid-feedback" style={{ display: "flex" }}>
                    {descriptionError}
                  </div>
                )}
              </div>

              <div className={styles.bottomButtons}>
                {ticketToEdit && (
                  <Button
                    onClick={handleDelete}
                    className={styles.deleteButton}
                  >
                    Delete
                  </Button>
                )}
                <Button onClick={saveTicket} className={styles.saveButton}>
                  Save
                </Button>
              </div>
            </div>
          </dialog>
        </div>,
        document.getElementById("modalId")
      )
    : null;
}
