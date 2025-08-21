import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/groups";

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createGroup = createAsyncThunk(
  "groups/createGroups",
  async (name) => {
    const response = await axios.post(API_URL, { name });
    return response.data;
  }
);

export const updatedGroup = createAsyncThunk(
  "groups/updatedGroup",
  async ({ id, name }) => {
    const response = await axios.put(`${API_URL}/${id}`, { name });
    return response.data;
  }
);

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
    loading: false,
    error: null,
  },
  reducers: {
    selectGroup(state, action) {
      state.selectedGroupId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(updatedGroup.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.groups.findIndex(
          (group) => group._id === updated._id
        );
        if (index !== -1) {
          state.groups[index] = updated;
        }
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        const id = action.payload;
        state.groups = state.groups.filter((group) => group._id !== id);
      });
  },
});

export default groupsSlice.reducer;
export const { selectGroup } = groupsSlice.actions;