import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { stat } from "fs";

export const loadDrivers = createAsyncThunk(
  "drivers/load",
  async (_, thunkAPI) => {
    try {
      const url = "/api/drivers";
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addDriver = createAsyncThunk(
  "driver/add",
  async (obj: any, thunkAPI) => {
    try {
      const url = "/api/drivers";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          ...obj,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const driversSlice = createSlice({
  name: "drivers",
  initialState: {
    data: [],
    loading: false,
    addLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [addDriver.pending as any]: (state) => {
      state.addLoading = true;
    },
    [addDriver.fulfilled as any]: (state: any, action) => {
      state.data.push(action.payload.data);
      state.addLoading = false;
    },
    [addDriver.rejected as any]: (state: any, action) => {
      console.log(action);
      state.error = action.payload.error;
      state.addLoading = false;
    },
    [loadDrivers.pending as any]: (state) => {
      state.loading = true;
    },
    [loadDrivers.fulfilled as any]: (state: any, action) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    [loadDrivers.rejected as any]: (state: any, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export const selectDrivers = createSelector(
  (state: any) => ({
    addLoading: state.drivers.addLoading,
    data: state.drivers.data,
    loading: state.drivers.loading,
    error: state.drivers.error,
  }),
  (state) => state
);

export default driversSlice.reducer;
