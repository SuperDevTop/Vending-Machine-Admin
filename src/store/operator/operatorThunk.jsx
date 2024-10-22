import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ref,
  onValue,
  set,
  get,
  update,
  remove,
  child,
} from "firebase/database";
import { db } from "../../config/firebase";

export const addOperator = createAsyncThunk(
  "operator/addOperator",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await set(ref(db, `operators/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOperators = createAsyncThunk(
  "operator/getOperators",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const operatorsRef = ref(db, "operators");
      const snapshot = await get(operatorsRef);

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

export const updateOperator = createAsyncThunk(
  "operator/updateOperator",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await update(ref(db, `operators/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteOperator = createAsyncThunk(
  "operator/deleteOperator",
  async ({ id, onSuccess, onError }, thunkAPI) => {
    try {
      await remove(ref(db, `operators/${id}`));
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);
