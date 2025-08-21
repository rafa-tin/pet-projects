import { Link } from "react-router-dom";

export default function NavMenu({ items, onItemClick, idOpen}) {
  return (
    <ul className="hidden md:flex flex-row gap-6 ml-auto mr-auto h-full">
      {items.map((item) => (
        <li key={item.id} className="list-none flex items-end h-full">
          <Link
            to={item.link}
            onClick={() => onItemClick(item.id)}
            className={`${
              idOpen == item.id ? "border-white" : ""
            }pb-1 border-b-2 w-[120px] text-center border-stone-800 hover:text-xl hover:border-white transition ease-in-out duration-200`}
          >
            {item.value}
          </Link>
        </li>
      ))}
    </ul>
  );
}
