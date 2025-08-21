export default function ListResults({ passedTests, setUnqColor }) {
  return (
    <ul className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {passedTests.map((item) => (
        <li
          key={`result/${item.id}`}
          className={`flex ${setUnqColor(
            item.correctAnwers,
            item.questions,
            "bgColor"
          )} mb-2 p-4 rounded-xl w-[300px] m-auto`}
        >
          <h1 className="w-[200px]">{item.testName}: </h1>
          <p className="ml-5">
            {item.correctAnwers}/{item.questions}
          </p>
        </li>
      ))}
    </ul>
  );
}
