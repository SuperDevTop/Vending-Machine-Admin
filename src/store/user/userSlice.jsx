import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signOutUser, addUser, getUsers } from "./userThunk";

const initialState = {
  user: null,
  loginLoader: false,
  users: null,
  addUserLoader: false,
  getUsersLoader: false,
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
      .addCase(signOutUser.rejected, (state, action) => {})
      .addCase(addUser.pending, (state, action) => {
        state.addUserLoader = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.addUserLoader = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.addUserLoader = false;
      })
      .addCase(getUsers.pending, (state, action) => {
        state.getUsersLoader = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getUsersLoader = false;
        state.users = action?.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.getUsersLoader = false;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
