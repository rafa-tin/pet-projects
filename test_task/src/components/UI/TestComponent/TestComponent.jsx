export default function TestComponent({ onClick, children }) {
  return (
    <div className="flex h-[60px] gap-10 mb-10">
      <h1 className="text-center m-auto">{children}</h1>
      <button
        onClick={onClick}
        className="bg-blue-600 text-white w-[100px] rounded-2xl cursor-pointer hover:bg-blue-900"
      >
        Start Test
      </button>
    </div>
  );
}
