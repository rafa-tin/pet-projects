export default function QuestionChooseText({isMultiple, correctIds}) {
  return (
    <p className="mb-5 text-gray-400">
      {isMultiple ? `Choose ${correctIds.length} answer` : "Choose one answer"}
    </p>
  );
}
