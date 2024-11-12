import { createSlice } from "@reduxjs/toolkit";
import { addUser, getUsers } from "./userThunk";

const initialState = {
  test: null,
  users: null,
  addUserLoader: false,
  getUsersLoader: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.test = null;
    },
  },

  extraReducers: (builder) => {
    builder
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
