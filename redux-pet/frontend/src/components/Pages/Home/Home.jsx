import { useState } from "react";
import AppHeader from "../../AppHeader/AppHeader";
import AppGroups from "../../AppGroups/AppGroups";
import { AppFooter } from "../../AppFooter/AppFooter";
import  AppTasks  from "../../AppTasks/AppTasks";

function Home({setEditTask}) {
  return (
    <>
      <AppHeader />
      <div className="flex flex-row" style={{height: "calc(100vh - 64px)"}}>
        <AppGroups />
        <AppTasks setEditTask={setEditTask}/>
      </div>
    </>
  );
}

export default Home;
