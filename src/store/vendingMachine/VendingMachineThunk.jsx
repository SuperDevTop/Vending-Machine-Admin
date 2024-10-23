import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, update, remove, child } from "firebase/database";
import { db } from "../../config/firebase";

export const addVendingMachine = createAsyncThunk(
  "vendingMachine/addVendingMachine",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await set(ref(db, `vendingMachine/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getVendingMachines = createAsyncThunk(
  "vendingMachine/getVendingMachines",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const machinesRef = ref(db, "vendingMachine");
      const snapshot = await get(machinesRef);

      if (!snapshot.exists()) {
        return {};
      }

      const data = snapshot.val();

      onSuccess(data);
      return data;
    } catch (error) {
      onError(error.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateVendingMachine = createAsyncThunk(
  "vendingMachine/updateVendingMachine",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      const machinesRef = ref(db, `vendingMachine/${id}`);
      await update(machinesRef, payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteVendingMachine = createAsyncThunk(
  "vendingMachine/VendingMachine",
  async ({ id, onSuccess, onError }, thunkAPI) => {
    try {
      await remove(ref(db, `vendingMachine/${id}`));
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);
