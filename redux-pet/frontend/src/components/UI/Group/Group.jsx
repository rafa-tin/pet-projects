export default function Group({ name, onDelete, getGroupId}) {
  return (
    <div onClick={getGroupId} className="p-2 bg-blue-800/20 dark:bg-blue-600 mb-1 cursor-pointer hover:bg-blue-800/40 flex justify-between">
      <h1 className="dark:text-white">{name}</h1>
      <button onClick={onDelete}>
        <img src="./delete-btn.svg" alt="delete" className="size-[30px] bg-red-500/50 p-1 cursor-pointer hover:bg-red-500/80 rounded-xl"/>
      </button>
    </div>
  );
}
