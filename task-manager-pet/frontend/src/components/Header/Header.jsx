import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Heading from "../UI/Heading/Heding";

export default function Header({ children, onLogout }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const name = localStorage.getItem("userName");
  const phone = localStorage.getItem("userPhone");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src="logo.svg" alt="logo" />
            <Heading level={1}>TaskTrack</Heading>
          </div>

          <div className={styles.logOutDesktop} onClick={handleLogOut}>
            <img src="logOut.svg" alt="logOut" />
          </div>

          {/* Burger for phone*/}
          <div className={styles.burger} onClick={toggleMenu}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>

        {/* Overlay Burger menu */}
        <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ""}`}>
          <div className={styles.menuContent}>
            <Heading level={2}>Hello, {name}</Heading>
            <p>Phone: +998 {phone}</p>
            <button onClick={handleLogOut} className={styles.logoutBtn}>
              Log Out
            </button>
          </div>
        </div>

        {children}
      </header>
    </>
  );
}
