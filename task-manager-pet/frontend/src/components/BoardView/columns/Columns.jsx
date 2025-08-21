import styles from "./Columns.module.scss";
import Button from "../../UI/Button/Button";
import Heading from "../../UI/Heading/Heding"

export default function Columns({
  title,
  openModal,
  tickets,
  onDrop,
  onDragOver,
  styleId,
}) 

{
  return (
    <div className={styles.column} onDragOver={onDragOver} onDrop={onDrop}>
      <div className={`${styles.topColumn} ${styles[styleId]}`}>
        <Heading level={3} className={styles.text}>{title}</Heading>
        <Button className={styles.addCard} onClick={openModal}>
          <span className={styles.plus}>
            <hr />
            <hr />
          </span>
        </Button>
      </div>

      <div className={styles.tickets} onDragOver={onDragOver} onDrop={onDrop}>
        {tickets}
      </div>

      <div className={styles.bottomColumn}>
        <Button className={styles.addButtonBottom} onClick={openModal}>
          + Add Card
        </Button>
      </div>
    </div>
  );
}
