export default function QuestionButton ({nextMode, goToNextQuestion, checkRightOption, isSubmitDisabled, current, questions}) {
    return (
        <button
          onClick={nextMode ? goToNextQuestion : checkRightOption}
          className={`w-[200px] h-[50px] rounded-xl cursor-pointer mt-4 ${
            isSubmitDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isSubmitDisabled}
        >
          {nextMode
            ? current === questions.length - 1
              ? "Finish"
              : "Next"
            : "Submit"}
        </button>
    )
}