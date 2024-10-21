import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signOutUser } from "./userThunk";

const initialState = {
  user: null,
  loginLoader: false,
};

export const userSlice = createSlice({
  name: "user",
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

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
