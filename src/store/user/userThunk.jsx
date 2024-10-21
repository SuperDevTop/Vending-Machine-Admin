import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      // Sign in using email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );

      // Retrieve the user UID
      const token = userCredential.user.accessToken;

      localStorage.setItem("token", token);
      onSuccess(userCredential);

      return userCredential.user;
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signOutUser = createAsyncThunk(
  "user/signout",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      await auth.signOut();
      localStorage.removeItem("token");
      // localStorage.clear();
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);
