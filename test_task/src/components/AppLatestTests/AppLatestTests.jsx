import { useNavigate } from "react-router-dom";
import TestComponent from "../UI/TestComponent/TestComponent";

export default function AppLatestTests() {
  const navigate = useNavigate();
  return (
    <div className="m-auto mt-10">
      <TestComponent onClick={() => navigate("/test")}>Test 1</TestComponent>
      <TestComponent onClick={() => navigate("/test")}>Test 2</TestComponent>
      <p>Coming soon...</p>
    </div>
  );
}
