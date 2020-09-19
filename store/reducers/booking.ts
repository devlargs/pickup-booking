import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import toastOptions from "constants/toastOptions";

export const loadBooking = createAsyncThunk(
  "booking/load",
  async (_, thunkAPI) => {
    try {
      const url = "/api/booking";
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const addBooking = createAsyncThunk(
  "booking/add",
  async (obj: any, thunkAPI) => {
    try {
      const url = "/api/booking";
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

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [addBooking.pending as any]: (state) => {
      state.loading = true;
    },
    [addBooking.fulfilled as any]: (state: any, action) => {
      state.data.push(action.payload.data);
      state.loading = false;
      toast.success("Successfully added booking", toastOptions);
    },
    [addBooking.rejected as any]: (state: any, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [loadBooking.pending as any]: (state) => {
      state.loading = true;
    },
    [loadBooking.fulfilled as any]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.data = action.payload.data;
    },
    [loadBooking.rejected as any]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const selectBookings = createSelector(
  (state: any) => ({
    data: state.booking.data,
    loading: state.booking.loading,
    error: state.booking.error,
  }),
  (state) => state
);

export default bookingSlice.reducer;
