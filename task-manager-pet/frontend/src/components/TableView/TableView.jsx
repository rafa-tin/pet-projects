import styles from "./TableView.module.scss";
import Button from "../UI/Button/Button";
 function dateFormatter(date){
  return(
    new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
      })
  )
 }
export default function TableView({ tasks, openModal, openEditModal }) {
  return (
    <div className={styles.table}>
      <table>
        <thead  className={styles.tableHeader}>
          <tr> 
            <th>Task</th>
            <th>Description</th>
            <th>Creation Date</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} onClick={() => openEditModal(t)}>
              <td>{t.name}</td>
              <td>{t.description}</td>
              <td>{dateFormatter(t.created_at)}</td>
              <td>{dateFormatter(t.due_date)}</td>
              <td>{t.priority}</td>
              <td>{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => openModal()} className={styles.addButton}>+ Add a card</button>
    </div>
  );
}
