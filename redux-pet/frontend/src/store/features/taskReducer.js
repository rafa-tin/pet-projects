// src/store/features/taskReducer.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

// === Thunks ===

// Получить задачи по группе
export const fetchTasksByGroup = createAsyncThunk(
  "tasks/fetchByGroup",
  async (groupId) => {
    const res = await axios.get(`${API_URL}/group/${groupId}`);
    return res.data;
  }
);

// Создать задачу
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData) => {
    const res = await axios.post(API_URL, taskData);
    return res.data;
  }
);

// Обновить задачу
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (data) => {
    const { id, _id, ...updates } = data;
    const taskId = id || _id;                  // поддерживаем оба варианта
    const res = await axios.put(`${API_URL}/${taskId}`, updates);
    return res.data;
  }
);

// Удалить задачу
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// === Slice ===
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearTasks(state) {
      state.tasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTasksByGroup
      .addCase(fetchTasksByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksByGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })

      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
