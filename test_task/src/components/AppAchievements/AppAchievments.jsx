import achievements from "../../data/achievments";
import Achievment from "./Achievement/Achievement";

const achievedCount = achievements.filter(a => a.unlocked).length

export default function AppAchievements() {
    
  return (
    <section className="w-full p-4">
        <h1 className="text-2xl mb-4">You got {achievedCount} achievements</h1>
      <div className="flex flex-col gap-5 w-full">
        {achievements.map((item) => (
          <Achievment item={item} key={`avhieve/${item.id}`}/>
        ))}
      </div>
    </section>
  );
}
