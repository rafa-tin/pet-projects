export default function TopText({contTests, setUnqColor, solveScore}) {
  return (
    <div className="flex justify-between text-xl gap-2">
      <h1 className="pl-2">Number of completed tests: {contTests}</h1>
      <div className="text-end items-end pr-1">
        <h1 className="flex justify-end flex-col ">Average Score:</h1>
        <p
          className={`flex flex-row text-2xl font-bold justify-end ${setUnqColor}`}
        >
          {solveScore}/100
        </p>
      </div>
    </div>
  );
}
