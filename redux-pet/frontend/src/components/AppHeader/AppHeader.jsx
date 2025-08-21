import ThemeToggle from "../UI/ThemeToggle/ThemeToggle.jsx";
import styles from "./AppHeader.module.css";

export default function AppHeader() {
  return (
    <>
      <header className=" dark:bg-gray-800 bg-blue-500 h-16 align-middle grid">
        <div
          className={`${styles.headerContainer} flex justify-between items-center text-white`}
        >
          <img src="vite.svg" alt="logo" />
          <h1>Welcome to Home Page</h1>
          <div className="grid grid-cols-2 gap-5">
            <button
              className={`${styles.logOut} cursor-pointer bg-red-300 rounded-xl hover:bg-red-400 transition delay-150 duration-300 ease `}
            >
              Log Out
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
