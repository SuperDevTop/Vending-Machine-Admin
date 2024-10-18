import { createSlice } from "@reduxjs/toolkit";
import { getReady, validateUrl,buyerGetReady, getRecommendedStartups,nowNow, notNow,fetchUserQA,buyerUpdateQA  } from "./getReadyThunk";

const initialState = {
  readyLoader: false,
  recommendedLoader: false,
  nowNowLoader: false,
  recommendedStartups: [],
  sellerGetReady: null,
  buyerGetReady: null,
  userQA: [],
  userQALoader: false,
  error: null,
  buyerrGetReady: null,
};

export const getReadySlice = createSlice({
  name: "getReadySlice",
  initialState,
  reducers: {
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(getReady.pending, (state, action) => {
        state.readyLoader = true;
      })

      .addCase(getReady.fulfilled, (state, action) => {
         state.readyLoader = false;
         state.sellerGetReady=action?.payload;
      })

      .addCase(getReady.rejected, (state, action) => {
        state.readyLoader = false;
      })
      .addCase(validateUrl.pending, (state, action) => {
        state.readyLoader = true;
      })

      .addCase(validateUrl.fulfilled, (state, action) => {
         state.readyLoader = false;
      })

      .addCase(validateUrl.rejected, (state, action) => {
        state.readyLoader = false;
      })
      .addCase(buyerGetReady.pending, (state, action) => {
        state.readyLoader = true;
      })

      .addCase(buyerGetReady.fulfilled, (state, action) => {
         state.readyLoader = false;
         state.buyerrGetReady=action?.payload;
      })

      .addCase(buyerGetReady.rejected, (state, action) => {
        state.readyLoader = false;
      })

      // SHOW THE TOP RECOMMENDED LISTS IN THE BUYER SECTION..


      .addCase(getRecommendedStartups.pending, (state) => {
        state.recommendedLoader = true;
      })
      .addCase(getRecommendedStartups.fulfilled, (state, action) => {
        state.recommendedLoader = false;
        state.recommendedStartups = action.payload;
      })
      .addCase(getRecommendedStartups.rejected, (state) => {
        state.recommendedLoader = false;
      })
      .addCase(notNow.pending, (state) => {
        state.nowNowLoader = true;
      })
      .addCase(notNow.fulfilled, (state, action) => {
        state.nowNowLoader = false;
        ;
      })
      .addCase(notNow.rejected, (state) => {
        state.nowNowLoader = false;
      })
      .addCase(fetchUserQA.pending, (state) => {
        state.userQALoader = true;
      })
      .addCase(fetchUserQA.fulfilled, (state, action) => {
        state.userQALoader = false;
        state.userQA = action.payload;
      })
      .addCase(fetchUserQA.rejected, (state, action) => {
        state.userQALoader = false;
        state.error = action.payload;
      })

      .addCase(buyerUpdateQA.pending, (state) => {
        state.readyLoader = true;
      })
      .addCase(buyerUpdateQA.fulfilled, (state, action) => {
        state.readyLoader = false;
        state.buyerrGetReady = action.payload;
      })
      .addCase(buyerUpdateQA.rejected, (state) => {
        state.readyLoader = false;
      })
    },
});

// export const { toggleSidebar, logoutUser,toggleRememberMe } = userSlice.actions;

export default getReadySlice.reducer;
