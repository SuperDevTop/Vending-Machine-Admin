import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, update, remove, child } from "firebase/database";
import { db } from "../../config/firebase";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await set(ref(db, `products/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const operatorsRef = ref(db, "products");
      const snapshot = await get(operatorsRef);

      if (!snapshot.exists()) {
        onSuccess({});
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await update(ref(db, `products/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async ({ id, onSuccess, onError }, thunkAPI) => {
    try {
      await remove(ref(db, `products/${id}`));
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);
