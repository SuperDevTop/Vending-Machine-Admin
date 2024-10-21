import { axiosInstance } from '@/utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getChatID = createAsyncThunk(
    'getChatID',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Chat/StartChat/get_chat_id/`,
                payload,
            )
            if (status === 200) {
                onSuccess(data?.details ? data?.details.ChatID : 0)
                return data?.details
            } else {
                onError(data?.details ? data?.details.ChatID : 0)
                return thunkAPI.rejectWithValue(response)
            }
        } catch (error) {
            onError(error.data?.details ? error.data?.details.ChatID : 0)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const createChat = createAsyncThunk(
    'createChat',
    async ({ formData, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Chat/StartChat/`,
                formData,
            )
            if (status === 200) {
                onSuccess(data?.details.ChatID)
                return data?.details
            } else {
                onError(data?.details)
                return thunkAPI.rejectWithValue(response)
            }
        } catch (error) {
            console.error('error: ', error)
            onError(error.data?.details)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const getUserChatWith = createAsyncThunk(
    'getUserChatWith',
    async ({}, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.get(`/Chat/StartChat`)
            if (status == 200) {
                return data.details
            }
        } catch (error) {
            console.error('error: ', error)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const chatListening = createAsyncThunk(
    'chatListening',
    async ({ ChatID, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.get(
                `/Chat/StartChat/${ChatID}`,
            )
            if (status == 200) {
                onSuccess(data.details)
                return data.details
            }
        } catch (error) {
            console.error('error: ', error)
            onError(error.data)
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const getUserhat = createAsyncThunk(
    'getUserhat',
    async ({ ChatID, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.get(
                `/Chat/StartChat/${ChatID}`,
            )
            if (status == 200) {
                onSuccess(data.details)
                return data.details
            }
        } catch (error) {
            console.error('error: ', error)
            onError(error.data)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const sendChatMessage = createAsyncThunk(
    'sendChatMessage',
    async ({ formData, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Chat/StartChat/`,
                formData,
            )
            if (status == 200) {
                onSuccess(data.details)
                return data.details
            }
        } catch (error) {
            console.error('error: ', error)
            onError(error.data)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
// Offer
export const offerActions = createAsyncThunk(
    'offerActions',
    async ({ offerID, payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.put(
                `/Offer/AcceptOffer/${offerID}/`,
                payload,
            )
            if (status == 200) {
                onSuccess(data.details)
                return data.details
            }
        } catch (error) {
            console.error('error: ', error)
            onError(error.data)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
export const createOffer = createAsyncThunk(
    'createOffer',
    async ({ payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Offer/Offer/`,
                payload,
            )
            if (status == 201) {
                onSuccess(data)
                return data
            } else {
                onError(data)
            }
        } catch (error) {
            console.error('error: ', error)
            onError(error.data)
            return thunkAPI.rejectWithValue(error)
        }
    },
)

export const releasePayment = createAsyncThunk(
    'releasePayment',
    async ({ offerID, payload, onSuccess, onError }, thunkAPI) => {
        try {
            const { data, status } = await axiosInstance.put(
                `/Offer/AcceptOffer/${offerID}/`,
                payload,
            )
            if (status == 200) {
                onSuccess(data.details)
                return data
            } else {
                onError(data.details)
            }
        } catch (error) {
            console.error('error: ', error.data.details)
            onError(error.data.details)
            return thunkAPI.rejectWithValue(error)
        }
    },
)
