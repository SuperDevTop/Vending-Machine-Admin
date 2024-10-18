import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  getUserProfileDetails,
  updateUserProfileDetails,
  setStripeCustomer,
  getAccountDetails,
  getAccountStatus,
  verifyResetOTP,
  sendOTPOnEmail,
  resetPassword,
  SwitchUserType,
  sendEmailVerification,
  signUpVerification,
  getBuyerInfo,
} from "./userThunk";
import { setCookie, deleteCookie } from "cookies-next";

const initialState = {
  user: null,
  isSidebarOpen: false,
  token: null,
  userLoader: false,
  rememberMe: false,
  statusError: [],
  userDetails: [],
  authloader: false,
  profileLoader: false,
  stripeLoader:false,
  accountDetailLoader:false,
  accountDetails:null,
  accountStatus:false,
  statusLoader:false,
  switchloader:false,
  buyerInfo: null, // Add state for buyer info
  buyerInfoLoader: false, // Add loader state for buyer info
  buyerInfoError: null, // Add error state for buyer info

};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
    logoutUser: (state) => {
      deleteCookie("user");
      state.token = null;
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.authloader = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.authloader = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        // toast.error(action.payload?.data?.message);
        state.authloader = false;
      })

      .addCase(getUserProfileDetails.pending, (state) => {
        state.userLoader = true;
      })
      .addCase(getUserProfileDetails.fulfilled, (state, action) => {
        state.userLoader = false;
        state.userDetails = action?.payload;
      })
      .addCase(getUserProfileDetails.rejected, (state, action) => {
        state.userLoader = false;
        state.error = action.payload;
        state.userDetails = action?.payload;
      })
      .addCase(updateUserProfileDetails.pending, (state) => {
        state.profileLoader = true;
      })
      .addCase(updateUserProfileDetails.fulfilled, (state, action) => {
        state.profileLoader = false;
      })
      .addCase(updateUserProfileDetails.rejected, (state, action) => {
        state.profileLoader = false;
        state.error = action.payload;
      })
      .addCase(setStripeCustomer.pending, (state) => {
        state.stripeLoader = true;
      })
      .addCase(setStripeCustomer.fulfilled, (state, action) => {
        state.stripeLoader = false;
      })
      .addCase(setStripeCustomer.rejected, (state, action) => {
        state.stripeLoader = false;
        state.error = action.payload;
      })
      .addCase(getAccountDetails.pending, (state) => {
        state.accountDetailLoader=true;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.accountDetailLoader=false;
        state.accountDetails=action?.payload
      })
      .addCase(getAccountDetails.rejected, (state, action) => {
        state.accountDetailLoader=false;
        state.error = action.payload;
      })
      // get account status
      .addCase(getAccountStatus.pending, (state) => {
        state.statusLoader=true;
      })
      .addCase(getAccountStatus.fulfilled, (state, action) => {
        state.statusLoader=false;
        state.accountStatus=action?.payload
      })
      .addCase(getAccountStatus.rejected, (state, action) => {
        state.statusLoader=false;
      })
       // reset password
       .addCase(resetPassword.pending, (state) => {
        state.authloader=true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.authloader=false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.authloader=false;
      })
      // verify reset otp
      .addCase(verifyResetOTP.pending, (state) => {
        state.authloader=true;
      })
      .addCase(verifyResetOTP.fulfilled, (state, action) => {
        state.authloader=false;
      })
      .addCase(verifyResetOTP.rejected, (state, action) => {
        state.authloader=false;
      })
       // send otp
       .addCase(sendOTPOnEmail.pending, (state) => {
        state.authloader=true;
      })
      .addCase(sendOTPOnEmail.fulfilled, (state, action) => {
        state.authloader=false;
      })
      .addCase(sendOTPOnEmail.rejected, (state, action) => {
        state.authloader=false;
      })
      //  send email verification
       .addCase(sendEmailVerification.pending, (state) => {
          state.statusLoader=true;
        })
        .addCase(sendEmailVerification.fulfilled, (state, action) => {
          state.statusLoader=false;
        })
        .addCase(sendEmailVerification.rejected, (state, action) => {
          state.statusLoader=false;
        })
          //  send email verification
       .addCase(signUpVerification.pending, (state) => {
        state.authloader=true;
      })
      .addCase(signUpVerification.fulfilled, (state, action) => {
        state.authloader=false;
      })
      .addCase(signUpVerification.rejected, (state, action) => {
        state.authloader=false;
      })
        // switch user
        .addCase(SwitchUserType.pending, (state) => {
          state.switchloader=true;
        })
        .addCase(SwitchUserType.fulfilled, (state, action) => {
          state.switchloader=false;
        })
        .addCase(SwitchUserType.rejected, (state, action) => {
          state.switchloader=false;
        })

        .addCase(getBuyerInfo.pending, (state) => {
          state.buyerInfoLoader = true;
          state.buyerInfoError = null;
        })
        .addCase(getBuyerInfo.fulfilled, (state, action) => {
          state.buyerInfoLoader = false;
          state.buyerInfo = action.payload;
        })
        .addCase(getBuyerInfo.rejected, (state, action) => {
          state.buyerInfoLoader = false;
          state.buyerInfoError = action.payload;
        })

  },
});

export const { toggleSidebar, logoutUser, toggleRememberMe } =
  userSlice.actions;

export default userSlice.reducer;
