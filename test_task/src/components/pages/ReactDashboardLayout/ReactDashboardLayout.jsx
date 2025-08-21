import { Outlet } from "react-router-dom";
import AppHeader from "../../AppHeader/AppHeader";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />  
      <main className="flex-grow flex">
        <Outlet />   
      </main>
    </div>
  );
}
