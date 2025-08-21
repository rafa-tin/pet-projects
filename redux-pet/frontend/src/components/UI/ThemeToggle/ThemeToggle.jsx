import { useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="px-4 py-2 cursor-pointer rounded-2xl bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {darkMode ? <img src="ligntMode.svg" className='size-[40px] m-auto'/> : <img src='darkMode.svg' className='size-[40px] m-auto'/>}
    </button>
  );
}
