import { createSlice } from "@reduxjs/toolkit";
import {
  addOperator,
  getOperators,
  updateOperator,
  deleteOperator,
} from "./operatorThunk";

const initialState = {
  test: null,
  operators: null,
  addOperatorsLoader: false,
  getOperatorsLoader: false,
  updateOperatorsLoader: false,
  deleteOperatorsLoader: false,
};

export const operatorSlice = createSlice({
  name: "operator",
  initialState,
  reducers: {
    testOperator: (state) => {
      state.test = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addOperator.pending, (state, action) => {
        state.addOperatorsLoader = true;
      })
      .addCase(addOperator.fulfilled, (state, action) => {
        state.addOperatorsLoader = false;
        state.operators = action?.payload;
      })
      .addCase(addOperator.rejected, (state, action) => {
        state.addOperatorsLoader = false;
      })
      .addCase(getOperators.pending, (state, action) => {
        state.getOperatorsLoader = true;
      })
      .addCase(getOperators.fulfilled, (state, action) => {
        state.getOperatorsLoader = false;
        state.operators = action?.payload;
      })
      .addCase(getOperators.rejected, (state, action) => {
        state.getOperatorsLoader = false;
      })
      .addCase(updateOperator.pending, (state, action) => {
        state.updateOperatorsLoader = true;
      })
      .addCase(updateOperator.fulfilled, (state, action) => {
        state.updateOperatorsLoader = false;
      })
      .addCase(updateOperator.rejected, (state, action) => {
        state.updateOperatorsLoader = false;
      })
      .addCase(deleteOperator.pending, (state, action) => {
        state.deleteOperatorsLoader = true;
      })
      .addCase(deleteOperator.fulfilled, (state, action) => {
        state.deleteOperatorsLoader = false;
      })
      .addCase(deleteOperator.rejected, (state, action) => {
        state.deleteOperatorsLoader = false;
      });
  },
});

export const { testOperator } = operatorSlice.actions;

export default operatorSlice.reducer;
