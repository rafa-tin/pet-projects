import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groupsReducer";
import taskReducer from "./features/taskReducer"



const store = configureStore({
  reducer: {
    groups: groupsReducer,
    tasks: taskReducer,
  },
});

export default store;