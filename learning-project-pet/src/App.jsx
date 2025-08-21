import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ReactDashboardLayout from "./components/pages/ReactDashboardLayout/ReactDashboardLayout";
import AppQuestion from "./components/AppQuestion/AppQuestion";
import AppProfile from "./components/AppProfile/AppProfile";
import AppResult from "./components/AppResult/AppResult";
import AppAchievements from "./components/AppAchievements/AppAchievments";
import AppBalance from "./components/AppBalance/AppBalance";
import AppLatestTests from "./components/AppLatestTests/AppLatestTests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReactDashboardLayout />}>
          <Route index element={<Navigate to="latestTest" replace />} />
          <Route path="test" element={<AppQuestion />} />
          <Route path="results" element={<AppResult />} />
          <Route path="achievements" element={<AppAchievements />} />
          <Route path="balance" element={<AppBalance />} />
          <Route path="profile" element={<AppProfile />} />
          <Route path="latestTest" element={<AppLatestTests />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
