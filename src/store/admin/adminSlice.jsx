import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signOutUser } from "./adminThunk";

const initialState = {
  user: null,
  loginLoader: false,
};

export const admninSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loginLoader = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoader = false;
        state.user = action?.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoader = false;
      })
      .addCase(signOutUser.pending, (state, action) => {})
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {});
  },
});

export const { logoutUser } = admninSlice.actions;

export default admninSlice.reducer;
