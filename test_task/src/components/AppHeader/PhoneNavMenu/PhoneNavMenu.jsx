import { Link } from "react-router-dom"


export default function PhoneNavMenu({navBar, setIsOpen}){
    return(
         <ul className="flex flex-col p-4">
          {navBar.map((item) => (
            <li key={item.id} className="list-none text-xl">
              <Link
                to={item.link}
                onClick={() => setIsOpen(false)}
                className={`${
                  item.link == window.location.pathname
                    ? "bg-gray-700 rounded-md"
                    : ""
                } block w-full text-center hover:bg-gray-700 rounded-md p-2`}
              >
                {item.value}
              </Link>
            </li>
          ))}
        </ul>
    )
}