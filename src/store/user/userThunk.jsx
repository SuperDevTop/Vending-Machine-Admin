import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set, get, update, remove, child } from "firebase/database";
import { db } from "../../config/firebase";


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


export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ id, payload, onSuccess, onError }, thunkAPI) => {
    try {
      await set(ref(db, `users/${id}`), payload);
      onSuccess();
    } catch (error) {
      onError(error.data.details || "something went wrong");

      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const usersRef = ref(db, "users");
      const snapshot = await get(usersRef);

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
