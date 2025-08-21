import styles from "./UserInfo.module.scss";
import data from "../jwt/jwt";
import Heading from "../UI/Heading/Heding";

export default function UserInfo() {
  const name = localStorage.getItem("userName");
  const phone = localStorage.getItem("userPhone");

  return (
    <>
      <hr
        style={{
          margin: "0",
          padding: "0",
          borderColor: "rgba(125, 126, 126, 1)",
          opacity: "1",
        }}
      />
      <div className={styles.userInfo}>
        <div className={styles.nameText}>
          <Heading level={1}>
            Welcome {name}!
            <span style={{ marginLeft: "10px" }}>{data.role}</span>
          </Heading>

          <p>What is on due today?</p>
        </div>
        <div className={styles.phoneText}>
          <p>User phone number:</p>
          <Heading level={3} style={{color: "white"}}>+998 {phone}</Heading>
        </div>
      </div>
    </>
  );
}
