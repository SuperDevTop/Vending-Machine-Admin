import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, update, remove, child } from "firebase/database";
import { db } from "../../config/firebase";

export const getUsers = createAsyncThunk(
  "card/getUsers",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const userssRef = ref(db, "users");
      const snapshot = await get(userssRef);

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

export const updateUser = createAsyncThunk(
  "card/updateUser",
  async ({ userID, payload, onSuccess, onError }, thunkAPI) => {
    try {
      const updateUserRef = ref(db, `users/${userID}`);
      await update(updateUserRef, payload);
      onSuccess();
    } catch (error) {
      onError(error.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
