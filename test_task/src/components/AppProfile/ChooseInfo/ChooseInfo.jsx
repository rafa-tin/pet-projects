export default function ChooseInfo({onClick, children, value, info}) {
  return (
    <li >
      <button
        onClick={onClick}
        className={`${info == value ? 'bg-gray-700' : ''}  cursor-pointer rounded-xs hover:bg-gray-700 w-[130px] md:w-full h-[40px] `}
      >{children}</button>
    </li>
  );
}
