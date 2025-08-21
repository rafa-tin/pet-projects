export default function Question({ item, bg, checked, isSelect, setIsSelect }) {
  return (
   <div key={item.id} className={`w-5/6 ${bg} h-[40px] rounded-xl`}>
              <label
                className={`flex m-auto w-full h-full rounded-xl ${
                  !checked ? "hover:bg-gray-500 cursor-pointer" : ""
                }`}
              >
                <input
                  type="radio"
                  name="some"
                  value={item.option}
                  className="mr-4"
                  onChange={() => setIsSelect(item.id)}
                  checked={isSelect === item.id}
                  disabled={checked}
                />
                {item.option}
              </label>
            </div>
  );
}
