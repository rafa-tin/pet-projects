//App Result
export default function setUnqColor(correct, all, value) {
  const avgValue = Math.round((correct / all) * 100);
  switch (value) {
    case "bgColor":
      if (avgValue >= 80) return "bg-green-700";
      else if (avgValue >= 40 && avgValue <= 80) return "bg-yellow-500";
      else return "bg-red-500";
      break;
    case "textColor":
      if (avgValue > 80) return "text-green-700";
      else if (avgValue > 40 && avgValue < 80) return "text-yellow-500";
      else return "text-red-500";
  }
}

//App Question
export const getOptionBg = ({ item, checked, correctIds, singleSelected }) => {
  if (checked) {
    if (correctIds.includes(item.id)) {
      return "bg-green-600 transition delay-150 duration-300 ease-in-out";
    }
    if (singleSelected === item.id && !correctIds.includes(item.id)) {
      return "bg-red-600 transition delay-150 duration-300 ease-in-out";
    }
  } else {
    if (singleSelected === item.id) return "bg-gray-500";
  }
  return "bg-gray-600";
};
