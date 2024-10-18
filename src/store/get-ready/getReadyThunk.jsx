import { axiosInstance } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookies } from "cookies-next";
export const getReady = createAsyncThunk(
  "getReady",
  async ({ payload, onSuccess, onError }, thunkAPI) => {
    try {
      const { data, status } = await axiosInstance.post(
        "/AuthQA/SellerAnswers/",
        payload
      );
      if (status === 200) {
        onSuccess();
        return data?.details;
      } else {
        onError(data.details);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const buyerGetReady = createAsyncThunk(
  "BuyerAnswers",
  async ({ formData, onSuccess,onError }, thunkAPI) => {
    try {
      const { data, status } = await axiosInstance.post(
        "/AuthQA/BuyerAnswers/",
        formData
      );
      if (status === 200) {
        onSuccess();
        return data?.details;
      } else   {
        onError() 
           }
           return
    } catch (error) {
      onError() 
            return thunkAPI.rejectWithValue(error);
    }
  }
);

export const validateUrl = createAsyncThunk(
  "validateUrl",
  async ({ url, onSuccess, onError }, thunkAPI) => {
    try {
      const { data, status } = await axiosInstance.post(
        "/AuthQA/ValidateUrl/",
        url
      );
      if (status == 200) {
        onSuccess("");
        return data?.details;
      } else {
        onError("invalid url");
        return;
      }
    } catch (error) {
      onError("invalid url");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// SHOW THE TOP RECOMMENDED LISTS IN THE BUYER SECTION..


export const getRecommendedStartups = createAsyncThunk(
  "startups/getRecommendedStartups",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/Startups/RecommendedStartups/');
      if (response.status === 200) {
        return response.data;
      } else {
        console.warning(response.data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const notNow = createAsyncThunk(
  "notNow",
  async ({ type, onSuccess, onError }, thunkAPI) => {
    
    try {
      const response = await axiosInstance.post(
        "/User/NotNowType/",
        type
      );
      if (response.status == 200) {
        onSuccess(response.data?.details);
        return response.data?.details;
      } else {
        onError("invalid url");
        return;
      }
    } catch (error) {
      onError("invalid url");
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const fetchUserQA = createAsyncThunk(
  "fetchUserQA",
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/AuthQA/BuyerAnswers/get_user_qa/');
      if (response.status === 200) {
        console.log("Fetched QA Data:", response.data.details); // Log the fetched data
        onSuccess();
        return response.data.details;
      } else {
        onError();
        return;
      }
    } catch (error) {
      onError();
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const buyerUpdateQA = createAsyncThunk(
  "buyerUpdateQA",
  async ({ formData, onSuccess, onError }, thunkAPI) => {
    try {
      const { data, status } = await axiosInstance.post("/AuthQA/BuyerAnswers/update_answers/", formData);
      if (status === 200) {
        onSuccess();
        return data?.details;
      } else {
        onError("Something went wrong");
        return;
      }
    } catch (error) {
      onError("Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
