import profileData from "../../data/person";
import ListResults from "./ListResults/ListResults";
import TopText from "./TopText/TopText";
import setUnqColor from '../utils/utils'

const passedTests = profileData.progress;
const totalCorrect = passedTests.reduce(
  (sum, test) => sum + test.correctAnwers,
  0
);
const totalQuestions = passedTests.reduce(
  (sum, test) => sum + test.questions,
  0
);

const solveScore = (correct, all) => Math.round((correct / all) * 100);

export default function AppResult() {

  return (
    <div className="w-full p-1 md:p-4">
      <TopText
        contTests={passedTests.length}
        setUnqColor={setUnqColor(totalCorrect, totalQuestions, "textColor")}
        solveScore={solveScore(totalCorrect, totalQuestions)}
      />
      <h1 className="text-center text-xl mb-5">Your completed tests</h1>
      <ListResults passedTests={passedTests} setUnqColor={setUnqColor} />
    </div>
  );
}
