import { useState } from "react";
import { useNavigate } from "react-router-dom";

import QuestionSingle from "../UI/SingleQuestion/SingleQuestion";
import QuestionChooseText from "../UI/QuestionChooseText/QuestionChooseText";
import questions from "../../data/questions";
import { getOptionBg } from "../utils/utils";
import QuestionButton from "./QuestionButton/QuestionButton";

export default function AppQuestion() {
  const [current, setCurrent] = useState(0);
  const [singleSelected, setSingleSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [nextMode, setNextMode] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[current];
  const correctIds = currentQuestion.options
    .filter((item) => item.isRight)
    .map((item) => item.id);

  const resetSelection = () => {
    setSingleSelected(null);
    setChecked(false);
    setNextMode(false);
  };

  const checkRightOption = () => {
    setChecked(true);
    setNextMode(true);
  };

  const goToNextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1);
      resetSelection();
    } else {
      navigate("/latestTest");
    }
  };

  const isSubmitDisabled = singleSelected === null && !nextMode;

  return (
    <div className="flex flex-col items-center justify-center m-auto w-full">
      <h1 className="font-bold mb-2 text-center text-[16px] sm:text-2xl w-3/4">
        {currentQuestion.question}
      </h1>
      <QuestionChooseText isMultiple={false} correctIds={correctIds} />

      <div className="flex flex-col gap-[10px] w-5/6 items-center">
        {currentQuestion.options.map((item) => (
          <QuestionSingle
            key={item.id}
            item={item}
            bg={getOptionBg({ item, checked, correctIds, singleSelected })}
            checked={checked}
            isSelect={singleSelected}
            setIsSelect={setSingleSelected}
          />
        ))}

        <QuestionButton
          nextMode={nextMode}
          goToNextQuestion={goToNextQuestion}
          checkRightOption={checkRightOption}
          isSubmitDisabled={isSubmitDisabled}
          current={current}
          questions={questions.length - 1}
        />
      </div>
    </div>
  );
}
