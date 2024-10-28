import { createSlice } from "@reduxjs/toolkit";
import { getUsers, updateUser } from "./CardThunk";

const initialState = {
  test: null,
  users: null,
  getUsersLoader: false,
  updateUsersLoader: false,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    testOperator: (state) => {
      state.test = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.getUsersLoader = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.getUsersLoader = false;
        state.users = action?.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.getUsersLoader = false;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateUsersLoader = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateUsersLoader = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUsersLoader = false;
      });
  },
});

export const { testOperator } = cardSlice.actions;

export default cardSlice.reducer;
