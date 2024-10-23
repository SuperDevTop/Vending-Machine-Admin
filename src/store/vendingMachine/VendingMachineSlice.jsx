import { createSlice } from "@reduxjs/toolkit";
import {
  addVendingMachine,
  getVendingMachines,
  updateVendingMachine,
  deleteVendingMachine,
} from "./VendingMachineThunk";

const initialState = {
  test: null,
  vendingMachines: null,
  addVendingMachineLoader: false,
  getVendingMachineLoader: false,
  updateVendingMachineLoader: false,
  deleteVendingMachineLoader: false,
};

export const vendingMachineSlice = createSlice({
  name: "vendingMachine",
  initialState,
  reducers: {
    testOperator: (state) => {
      state.test = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addVendingMachine.pending, (state, action) => {
        state.addVendingMachineLoader = true;
      })
      .addCase(addVendingMachine.fulfilled, (state, action) => {
        state.addVendingMachineLoader = false;
        state.vendingMachines = action?.payload;
      })
      .addCase(addVendingMachine.rejected, (state, action) => {
        state.addVendingMachineLoader = false;
      })
      .addCase(getVendingMachines.pending, (state, action) => {
        state.getVendingMachineLoader = true;
      })
      .addCase(getVendingMachines.fulfilled, (state, action) => {
        state.getVendingMachineLoader = false;
        state.vendingMachines = action?.payload;
      })
      .addCase(getVendingMachines.rejected, (state, action) => {
        state.getVendingMachineLoader = false;
      })
      .addCase(updateVendingMachine.pending, (state, action) => {
        state.updateVendingMachineLoader = true;
      })
      .addCase(updateVendingMachine.fulfilled, (state, action) => {
        state.updateVendingMachineLoader = false;
      })
      .addCase(updateVendingMachine.rejected, (state, action) => {
        state.updateVendingMachineLoader = false;
      })
      .addCase(deleteVendingMachine.pending, (state, action) => {
        state.deleteVendingMachineLoader = true;
      })
      .addCase(deleteVendingMachine.fulfilled, (state, action) => {
        state.deleteVendingMachineLoader = false;
      })
      .addCase(deleteVendingMachine.rejected, (state, action) => {
        state.deleteVendingMachineLoader = false;
      });
  },
});

export const { testOperator } = vendingMachineSlice.actions;

export default vendingMachineSlice.reducer;
