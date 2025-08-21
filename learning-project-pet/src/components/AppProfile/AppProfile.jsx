import { useState } from "react";
import questions from "../../data/questions";
import RenderInfo from "./RenderInfo/RenderInfo";
import ChooseInfo from "./ChooseInfo/ChooseInfo";
import profileData from "../../data/person";

const infoButtons = [
  { id: 1, value: "about", message: "About Me" },
  { id: 2, value: "local", message: "Local Info" },
];

export default function AppProfile() {
  const [info, setInfo] = useState("about");
  const passedTests = profileData.progress;
  const totalCorrect = passedTests.reduce(
    (sum, test) => sum + test.correctAnwers,
    0
  );
  const totalQuestions = passedTests.reduce(
    (sum, test) => sum + test.questions,
    0
  );
  const avgScore = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <section className="grid md:grid-cols-[1fr_3fr] w-full h-full md:h-auto">
      <div className="border-b-1 border-b-gray-400 md:border-b-0 md:border-r-1 p-4 md:border-r-gray-400">
        <ul className="flex flex-row  md:flex-col gap-5 justify-center md:justify-self-auto">
          {infoButtons.map((item) => (
            <ChooseInfo key={item.id} info={info} value={item.value} onClick={() => setInfo(item.value)}>
              {item.message}
            </ChooseInfo>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <h1 className="text-center text-xl">{info.toUpperCase()}</h1>
        <RenderInfo info={info} profileData={profileData} />
      </div>
    </section>
  );
}
