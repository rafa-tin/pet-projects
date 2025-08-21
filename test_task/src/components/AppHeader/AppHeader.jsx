import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import navBar from "../../data/navBar";
import BurgerMenu from "../UI/BurgerMenu/BurgerMenu";
import NavMenu from "./NavMenu/NavMenu";
import PhoneNavMenu from "./PhoneNavMenu/PhoneNavMenu";

export default function AppHeader() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [idOpen, setIdOpen] = useState(0);

  return (
    <header className="border-b border-gray-500">
      <div className="flex justify-between items-center w-11/12 m-auto h-[50px]">
        <BurgerMenu onClick={() => setIsOpen(!isOpen)} />
        <nav className="hidden md:flex flex-row gap-6 ml-auto mr-auto h-full">
          <NavMenu
            items={navBar}
            onItemClick={(id) => setIdOpen(id)}
            idOpen={idOpen}
          />
        </nav>

        {window.location.pathname == "/balance" ? (
          <p></p>
        ) : (
          <img
            src="walletWhite.svg"
            onClick={() => navigate("/balance")}
            className="cursor-pointer size-[35px]"
          />
        )}
      </div>

      <nav
        className={`
          md:hidden bg-gray-800 text-white
          transition-all duration-300 ease-in-out
          ${isOpen ? " opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <PhoneNavMenu navBar={navBar} setIsOpen={setIsOpen}/>
      </nav>
    </header>
  );
}
