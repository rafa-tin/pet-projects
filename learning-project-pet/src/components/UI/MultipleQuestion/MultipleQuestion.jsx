// Если вы нашли этот компонент и думаете зачем он. Я его добавил потому что сперва не правильно понял тз про
// множественный выбор и сделал что можно выберать 2 ответа тоже. Потом понял что это будет избыточно и не по заданию
// Но я могу вам показать если нужно эту реализацию!

export default function MultipleQuestion({ item, bg, checked, isSelect, toggleSelect }) {
  return (
    <div className={`w-5/6 ${bg} h-[40px] rounded-xl`}>
      <label
        className={`flex m-auto w-full h-full p-[4px] rounded-xl ${
          !checked ? "hover:bg-gray-500 cursor-pointer" : ""
        }
        ${isSelect == item.id ? "border-1 border-white" : ""}`}
      >
        <input
          type="checkbox"
          value={item.option}
          style={{ pointerEvents: checked ? 'none' : 'auto', opacity: 1 }}
          className="mr-4 disabled:bg-blue-500 disabled:opacity-100 disabled:cursor-not-allowed"
          onChange={() => toggleSelect(item.id)}
          checked={isSelect}
          disabled={checked}
        />
        {item.option}
      </label>
    </div>
  );
}
