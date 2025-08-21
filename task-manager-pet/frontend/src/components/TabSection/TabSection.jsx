import Button from "../UI/Button/Button";
import styles from "./TabSection.module.scss";

export default function TabSection({ active, onChange }) {
  return (
    <>
      <div className={styles.tabSection}>
        <Button
          className={
            active == "table"
              ? `${styles.button} ${styles.active}`
              : `${styles.button}`
          }
          onClick={() => onChange("table")}
        >
          Table view
        </Button>
        <Button
          className={
            active == "board"
              ? `${styles.button} ${styles.active}`
              : `${styles.button}`
          }
          onClick={() => onChange("board")}
        >
          Board view
        </Button>
      </div>
      <hr className={styles.hr} />
    </>
  );
}


