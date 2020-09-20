import { createSlice, createSelector } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: "customer",
  },
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const selectAuth = createSelector(
  (state: any) => ({
    currentUser: state.auth.currentUser,
  }),
  (state) => state
);

export const { updateUser } = authSlice.actions;
export default authSlice.reducer;
