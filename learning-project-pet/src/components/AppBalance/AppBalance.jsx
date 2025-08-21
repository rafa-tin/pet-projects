import profileData from "../../data/person";
import Subscribe from "./Subscribe/Subscribe";
import subscriptions from "../../data/subscribes";

const formatBalance = (amount) => {
  return new Intl.NumberFormat("ru-RU").format(amount) + " UZS";
};

export default function AppBalance() {
  return (
    <div className="flex flex-col w-full gap-5 md:p-4">
      <div className="flex ml-auto h-[40px] mr-4">
        <a href="https://boosty.to/rafkat/donate">
          <img
            src="walletWhite.svg"
            alt="You balance"
            className="size-[40px]"
          />
        </a>
        <h1 className="m-auto">{formatBalance(profileData.balance)}</h1>
      </div>
      <div className="flex flex-col gap-5 md:flex-row md:m-auto">
        {subscriptions.map((item) => (
          <Subscribe subscriptions={item} formatBalance={formatBalance} key={item.id}/>
        ))}
      </div>
    </div>
  );
}
