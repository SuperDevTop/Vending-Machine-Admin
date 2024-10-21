import { axiosInstance } from '@/utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data } = await axiosInstance.post('/User/Login', payload)
            if (data.status_code == 200) {
                onSuccess()
                return data
            } else {
                toast.warning(data?.details)
                onError(data.detail)
                return thunkAPI.rejectWithValue(response)
            }
        } catch (error) {
            onError(error.data.details || 'something went wrong')

            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const sendOTPOnEmail = createAsyncThunk(
    'user/sendOTPOnEmail',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/User/ChangePassword/SendOtp/',
                payload,
            )
            if (status == 200) {
                onSuccess(data?.details)
                return data
            } else {
                onError(data.details)
                return thunkAPI.rejectWithValue(response)
            }
        } catch (error) {
            onError(error.data.details || 'something went wrong')

            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const verifyResetOTP = createAsyncThunk(
    'user/verifyResetOTP',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/User/ChangePassword/VerifyOtp/',
                payload,
            )
            if (status == 200) {
                onSuccess(data?.details)
                return data
            } else {
                toast.warning(data?.details)
                onError(data.detail)
                return thunkAPI.rejectWithValue(response)
            }
        } catch (error) {
            onError(error.data.details || 'something went wrong')
            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/User/ChangePassword/',
                payload,
            )
            if (status == 200) {
                onSuccess(data?.details)
                return data
            } else {
                toast.warning(data?.details)
                onError(data.details)
                return thunkAPI.rejectWithValue(response)
            }
        } catch (error) {
            onError(error.data.details || 'something went wrong')

            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const SwitchUserType = createAsyncThunk(
    'user/switch',
    async ({ payload, onSuccess }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/User/SwitchType/',
                payload,
            )
            if (status == 200) {
                onSuccess(data?.details)
                return data?.details
            } else {
                return thunkAPI.rejectWithValue(data?.details)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const sendSignUpOTP = createAsyncThunk(
    'user/sendSignUpOTP',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data } = await axiosInstance.post(
                '/User/Send-Verfication-OTP',
                payload,
            )
            if (data.status_code == 200) {
                onSuccess()
                return data
            } else {
                onError(data?.detail)
                // toast.error(response.response.data.message);
                // return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/User/Verify-SignUp-OTP',
                payload,
            )
            if (status == 200) {
                onSuccess()
                return data
            } else {
                onError(data)
                // toast.error(response.response.data.message);
                return thunkAPI.rejectWithValue(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data } = await axiosInstance.post('/User/SignUp/', payload)
            toast.success('User Registered Successfully!')
            onSuccess()
            return data
        } catch (error) {
            onError(error?.data?.details || error)
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const startUplisting = createAsyncThunk(
    'user/startUplisting',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data } = await axiosInstance.post(
                '/Startups/SellerStartupFinancials/',
                payload,
            )
            onSuccess()
            return data
        } catch (error) {
            onError(error.data.details || error)
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const updateUserProfileDetails = createAsyncThunk(
    'user/updateUserDetailsCompletion',
    async ({ formData, onSuccess, onError }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/AuthDetails/UserDetailsCompletion/`,
                formData,
            )
            if (status === 200) {
                onSuccess()
                toast.success('Successfully Updated Profile')
                return data?.details
            } else {
                toast.warning(data?.details)
            }
        } catch (error) {
            onError(error)
            return rejectWithValue(error.message) // Handle the error state in Redux
        }
    },
)
export const getUserProfileDetails = createAsyncThunk(
    'user/UserDetailsCompletion',
    async (rejectWithValue) => {
        try {
            const { data, status } = await axiosInstance.get(
                `/AuthDetails/UserDetailsCompletion/`,
            )
            if (status === 200) {
                return data?.details
            } else {
                // console.log(data?.details);
            }
        } catch (error) {
            return error?.data?.details
        }
    },
)

export const setStripeCustomer = createAsyncThunk(
    'user/StripeCustomer',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `User/StripeCustomer/`,
                payload,
            )
            if (response.status == 200) {
                toast.success('Your Card Has Been Added Successfully')
                onSuccess()
                return response.data
            } else {
                console.warning(response.data)
                toast.warning(response.data?.details)
            }
        } catch (error) {
            onError(error.response.data.details || error)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

export const getAccountDetails = createAsyncThunk(
    'user/Offer/GetAccountDetails/',
    async (_, { rejectWithValue }) => {
        try {
            const { status, data } = await axiosInstance.get(
                `/Offer/GetAccountDetails/`,
            )
            if (status === 200) {
                return data?.details
            } else {
                // console.log(data?.details);
            }
        } catch (error) {
            return error?.data?.details
        }
    },
)

export const addAccountDetails = createAsyncThunk(
    'addAccountDetails',
    async ({ onSuccess, onError }, { rejectWithValue }) => {
        try {
            const { status, data } = await axiosInstance.post(
                `/AuthDetails/UserDetailsCompletion/get_onboarding_link/`,
            )
            if (status === 200) {
                onSuccess(data?.details)
                return data?.details
            } else {
                onError(data?.details)
            }
        } catch (error) {
            onError(error.response.data.details || error)
            return error?.data?.details
        }
    },
)

export const getAccountStatus = createAsyncThunk(
    'getAccountStatus',
    async (_, { rejectWithValue }) => {
        try {
            const { status, data } = await axiosInstance.get(
                `/Offer/GetAccountDetails/get_account_status`,
            )
            if (status === 200) {
                return data?.details
            }
        } catch (error) {
            return error?.data?.details
        }
    },
)
export const signUpVerification = createAsyncThunk(
    'user/signUpVerification',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { status, data } = await axiosInstance.post(
                'User/OTP/VerifyOtp/',
                payload,
            )
            if (status == 200) {
                onSuccess(data.details)
                return data.details
            } else {
                onError(data?.details)
                // toast.error(response.response.data.message);
                // return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log('error: ', error)
            onError(error?.data?.details)
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const sendEmailVerification = createAsyncThunk(
    'user/sendEmailVerification',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { status, data } = await axiosInstance.post(
                'User/OTP/SendOtp/',
                payload,
            )

            if (status == 200) {
                onSuccess(data?.details)
                return data
            } else {
                onError(data?.details)
                // toast.error(response.response.data.message);
                // return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            onError(error?.data?.details)
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const getBuyerInfo = createAsyncThunk(
  'user/getBuyerInfo',
  async (_, { rejectWithValue }) => {
      try {
          const { status, data } = await axiosInstance.get('/BuyerInfo/');
          if (status === 200) {
              return data?.details;
          } else {
              return rejectWithValue(data?.details);
          }
      } catch (error) {
          return rejectWithValue(error?.response?.data?.details || error.message);
      }
  }
);
