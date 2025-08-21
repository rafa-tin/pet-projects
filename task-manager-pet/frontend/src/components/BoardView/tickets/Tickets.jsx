import styles from "./Tickets.module.scss";
import Button from "../../UI/Button/Button";
import Heading from "../../UI/Heading/Heding";

export default function Ticket({
  name,
  description,
  priority,
  dueDate,
  priorityId,
  onClick,
  onDragStart,
}) {
  return (
    <div
      className={styles.ticket}
      draggable
      onClick={onClick}
      onDragStart={onDragStart}
    >
      <Heading level={3} className={styles.ticketName}>{name}</Heading>
      <p className={styles.ticketDesc}>{description}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          width: "100%",
        }}
      >
        <p className={styles.ticketPriority} id={priorityId}>
          {priority}
        </p>
        <p className={styles.ticketDue}>
          Due in{" "}
          {new Date(dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
