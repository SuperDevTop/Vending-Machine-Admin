import { axiosInstance } from '@/utils/axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
export const allListing = createAsyncThunk(
    'allListing',
    async ({ page, showRecord, payload }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Startups/GetLessStartupsInfo/?page=${page}&page_size=${showRecord}`,
                payload,
            )
            if (status === 200) {
                return data
            } else {
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    },
)

// HIDE TAHT SPECIFIC LIST WHEN USER  CLICK ON THE EYE BUTTON:-

export const pendingStartUplisting = createAsyncThunk(
    'user/pendingStartUpListing',
    async ({ type, onSuccess }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Startups/IncompleteListing/?type=${type}`,
            )

            if (status === 200) {
                return data.details // toast.success("Successfully Get lists..");
            } else {
                console.warning(data?.details)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)
export const contentStartUp = createAsyncThunk(
    'user/contentStartUp',
    async ({ onError, onSuccess, payload }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/Startups/SellerContentStartup/',
                payload,
            )
            if (status === 200) {
                toast.success('About business details added successfully')
                onSuccess()
                return data?.details
            } else {
                console.warning(data?.details)
                onError(data?.details)
            }
        } catch (error) {
            onError(error.message)
            return rejectWithValue(error.message)
        }
    },
)

export const contentStartUpPutType = createAsyncThunk(
    'user/contentStartUpPutType',
    async (
        { onError, onSuccess, payload, contentStartUpId },
        { rejectWithValue },
    ) => {
        try {
            const { data, status } = await axiosInstance.put(
                `/Startups/SellerContentStartup/${contentStartUpId}/`,
                payload,
            )
            if (status === 200) {
                toast.success('About business details added successfully')
                onSuccess()
                return data?.details
            } else {
                console.warning(data?.details)
                onError(data?.details)
            }
        } catch (error) {
            onError(error.message)
            return rejectWithValue(error.message)
        }
    },
)

export const companyOverview = createAsyncThunk(
    'user/companyOverview',
    async ({ payload, onSuccess }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                'Startups/SellerCompanyOverview/',
                payload,
            )
            if (status === 200) {
                toast.success('Company details added successfully')
                onSuccess()
                return data?.details
            } else {
                console.warning(data?.details)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)
export const companyOverviewPutType = createAsyncThunk(
    'user/companyOverviewPutType',
    async ({ payload, onSuccess, companyOverviewId }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.put(
                `Startups/SellerCompanyOverview/${companyOverviewId}/`,
                payload,
            )
            if (status === 200) {
                toast.success('Company details added successfully')
                onSuccess()
                return data?.details
            } else {
                console.warning(data?.details)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)
export const acquisitionDetails = createAsyncThunk(
    'user/acquisitionDetails',
    async ({ payload, onSuccess }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/Startups/SellerAcquisitionDetails/',
                payload,
            )
            if (status === 200) {
                toast.success('Acquisition details added successfully')
                onSuccess()
                return data?.details
            } else {
                console.warning(data?.details)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)
export const acquisitionDetailsPutType = createAsyncThunk(
    'user/acquisitionDetailsPutType',
    async (
        { payload, onSuccess, acquisitionDetailsId },
        { rejectWithValue },
    ) => {
        try {
            const { data, status } = await axiosInstance.put(
                `/Startups/SellerAcquisitionDetails/${acquisitionDetailsId}/`,
                payload,
            )
            if (status === 200) {
                toast.success('Acquisition details added successfully')
                onSuccess()
                return data?.details
            } else {
                console.warning(data?.details)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

// BUYER LISTINGS...
export const getSingleListingDetails = createAsyncThunk(
    'user/getSingleListingDetails',
    async ({ onError, onSuccess, id }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.get(
                `/Startups/GetDetailsStartupsInfo/?startupid=${id}`,
            )
            if (status == 200) {
                onSuccess()
                return data.details
            } else {
                console.warning(data)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

// REMOVE TEH LIST ON CLIKC ON EYE..

export const hideSingleStartup = createAsyncThunk(
    'user/hideSingleStartup',
    async ({ onError, onSuccess, id }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/Startups/GetLessStartupsInfo/change_visibility/',
                { StartupID: id },
            )
            if (status === 200) {
                onSuccess()
                return data.details
            } else {
                console.warn(data)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export const favoriteStartups = createAsyncThunk(
    'user/FavoriteStartups',
    async ({ payload, onSuccess }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                `/Startups/FavoriteStartups/`,
                payload,
            )
            if (status == 200) {
                onSuccess()
                return data.details
            } else {
                console.warning(data)
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    },
)

export const createListing = createAsyncThunk(
    'user/createListing',
    async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.post(
                '/Startups/AllListingDetails/',
                payload,
            )
            if (status === 200) {
                toast.success('Listing added successfully')
                onSuccess()
                return data?.details
            } else {
                onError()
                console.warning(data?.details)
                toast.error(data?.details)
            }
        } catch (error) {
            onError()
            toast.error(
                error?.data?.details?.GrowthOppty?.first ?? 'Growth Opportunity field has no more than 255 characters.',
            )

            return rejectWithValue(error.message)
        }
    },
)

export const updateListing = createAsyncThunk(
    'user/updateListing',
    async ({ id, payload, onSuccess, onError }, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.put(
                `/Startups/AllListingDetails/${id}/`,
                payload,
            )
            if (status === 200) {
                toast.success('Listing Updated successfully')
                onSuccess()
                return data?.details
            } else {
                onError()
                console.warning(data?.details)
                toast.error(data?.details)
            }
        } catch (error) {
            onError()
            toast.error(error.message)
            return rejectWithValue(error.message)
        }
    },
)

// PRE APPROVED SECTION.. IN SELLER/LISTING..

export const getUserListings = createAsyncThunk(
    'getReady/fetchStartupStatus',
    async (Key, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/Startups/Status/', {
                Key,
            })
            if (response.status == 200) {
                return response.data
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

export const getSellerListingsDetails = createAsyncThunk(
    'getReady/getSellerListingsDetails',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/Startups/GetDetailsStartupsInfo/?startupid=${id}`,
            )
            if (response.status == 200) {
                return response.data
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

// to update the details of pending listing
export const getPendingListingDetails = createAsyncThunk(
    'getReady/getPendingListingDetails',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/Startups/IncompleteStartups/`,
                payload,
            )
            if (response.status == 200) {
                return response.data
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

export const getALLListingsDetails = createAsyncThunk(
    'getReady/getALLListingsDetails',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/Startups/AllListingDetails/`,
            )
            if (response.status == 200) {
                return response.data.details || []
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

export const getSingleListDetail = createAsyncThunk(
    'getReady/getSingleList',
    async (id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/Startups/GetDetailsStartupsInfo/?startupid=${id}`,
            )
            if (response.status == 200) {
                return response.data?.details || []
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)


export const buyerFavouriteListing = createAsyncThunk(
    'mydeals/buyerFavouriteListing',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/GetFavoriteStartups/`,
            )
            if (response.status == 200) {
                return response.data?.details || []
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)


export const buyerContactedListing = createAsyncThunk(
    'mydeals/buyerContactedListing',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/GetSelectedStartups/`,
            )
            if (response.status == 200) {
                return response.data?.details || []
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

export const buyerNotifications = createAsyncThunk(
    'inbox/buyerNotifications',
    async (payload, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/Notifications/Get-Notifications/user_notifs/`,
            )
            if (response.status == 200) {
                return response.data?.details || []
            } else {
                console.warning(data)
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    },
)

// CHANGE THE NOTICATION STTAUS .. 
export const readNotification = createAsyncThunk(
    'notifications/readNotification',
    async (NotifID, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.get(
                `/Notifications/Get-Notifications/read_notifs/?NotifID=${NotifID}`
            )
            if (status === 200) {
                return { NotifID, details: data.details }
            } else {
                return rejectWithValue('Error marking notification as read')
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// MARK ALl  AS  A READ.. 
export const readAllNotifications = createAsyncThunk(
    'notifications/readAllNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const { data, status } = await axiosInstance.get(
                `/Notifications/Get-Notifications/read_all/`
            )
            if (status === 200) {
                return data.details
            } else {
                return rejectWithValue('Error marking all notifications as read')
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
