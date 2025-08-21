import { useNavigate } from "react-router-dom";

export default function Subscribe({ subscriptions, formatBalance }) {
  const navigate = useNavigate();
  let key = 0;

  function count () {
    key+= 1
    return key
  }

  return (
    <div
      onClick={(e) => navigate("/balance")}
      className="flex flex-col border-2 w-2/3 min-w-[300px] md:min-w-auto m-auto border-gray-200 rounded-2xl p-4 gap-5 cursor-pointer hover:bg-gray-500/20"
    >
      <h1 className="text-3xl">{subscriptions.name}</h1>
      <div className="flex flex-col gap-4">
        {subscriptions.features.map((item) => (
          <div key={count()}>
            <p className="flex">
              <img
                className="size-[30px] mr-4"
                src={`${item.included ? "check-mark.svg" : "cross.svg"}`}
              />{" "}
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <h1 className="text-3xl mt-[60px]">
        {formatBalance(subscriptions.price)}
      </h1>
    </div>
  );
}
