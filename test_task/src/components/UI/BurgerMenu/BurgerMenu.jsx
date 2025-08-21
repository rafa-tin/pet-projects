export default function BurgerMenu({onClick}) {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center cursor-pointer"
      onClick={onClick}
    >
      <span className="block w-6 h-0.5 bg-white mb-1"></span>
      <span className="block w-6 h-0.5 bg-white mb-1"></span>
      <span className="block w-6 h-0.5 bg-white"></span>
    </button>
  );
}
