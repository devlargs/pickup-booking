import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import swal from "sweetalert";

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

export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, obj }: { id: string; obj: any }, thunkAPI) => {
    try {
      const url = `/api/booking/${id}`;
      const response = await fetch(url, {
        method: "PUT",
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
      swal("Nice", "Successfully added booking", "success");
    },
    [addBooking.rejected as any]: (state: any, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [updateBooking.pending as any]: (state) => {
      state.loading = true;
    },
    [updateBooking.fulfilled as any]: (state: any, action) => {
      state.data = state.data.map((q) => {
        if (q._id === action.meta.arg.id) {
          return action.payload.data;
        } else {
          return q;
        }
      });
      state.loading = false;
      //   swal("Sweet!", "Successfully updated booking", "success");
    },
    [updateBooking.rejected as any]: (state: any, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [loadBooking.pending as any]: (state) => {
      state.loading = true;
    },
    [loadBooking.fulfilled as any]: (state, action) => {
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
