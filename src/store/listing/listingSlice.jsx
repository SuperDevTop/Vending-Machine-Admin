import { createSlice } from '@reduxjs/toolkit'
import {
    allListing,
    pendingStartUplisting,
    contentStartUp,
    companyOverview,
    acquisitionDetails,
    getSingleListingDetails,
    hideSingleStartup,
    // PRE APPROVED SECTION.. IN SELLER/LISTING..
    getUserListings,
    getSellerListingsDetails,
    contentStartUpPutType,
    getPendingListingDetails,
    companyOverviewPutType,
    acquisitionDetailsPutType,
    getALLListingsDetails,
    getSingleListDetail,
    buyerFavouriteListing,
    buyerContactedListing,
    buyerNotifications,
    readNotification,
    readAllNotifications,
    favoriteStartups,
} from './listingThunk'

const initialState = {
    listingLoader: false,
    allList: [],
    startUpLoader: false,
    companyOverviewLoader: false,
    acquisitionLoader: false,
    pendingListings: [],
    contentStartUp: [],
    startUpId: [],
    // BUYER..LISTING..
    singleList: {},
    singleLoader: false,
    // PRE APPROVED SECTION.. IN SELLER/LISTING..
    readyLoader: false,
    pendingUserListings: null,

    sellerdetailsLoader: false,
    businessOverViewLoader: false,
    companyViewLoader: false,
    acquisitionDetailsLoader: false,
    sellerListingDetails: null,

    // To update the details of pending listing
    editPendingLoader: false,
    getPendingListingDetails: null,
    allListing: [],
    allListingLoader: false,
    singleListing: [],
    favouriteListingLoader: false,
    favouriteListing: [],
    contactedListingLoader: false,
    contactedListing: [],
    notificationsLoader: false,
    notifications: [],
    favouriteLoader: false,
}

export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
        UPDATE_NOTIFICATIONS: (state, action) => {
            state.notifications = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(allListing.pending, (state, action) => {
                state.listingLoader = true
            })

            .addCase(allListing.fulfilled, (state, action) => {
                state.listingLoader = false
                state.allList = action.payload
            })

            .addCase(allListing.rejected, (state, action) => {
                state.listingLoader = false
            })
            // StartUp Listing GET & POST
            .addCase(pendingStartUplisting.pending, (state, action) => {
                state.startUpLoader = true
            })

            .addCase(pendingStartUplisting.fulfilled, (state, action) => {
                state.startUpLoader = false
                state.pendingListings = action.payload // Store the data in state
            })

            .addCase(pendingStartUplisting.rejected, (state, action) => {
                // toast.error(action.payload?.data?.message);
                state.startUpLoader = false
            })

            // Content StartUp...
            .addCase(contentStartUp.pending, (state, action) => {
                state.startUpLoader = true
            })

            .addCase(contentStartUp.fulfilled, (state, action) => {
                state.startUpLoader = false
                // state.contentStartUp = action.payload;
            })

            .addCase(contentStartUp.rejected, (state, action) => {
                // toast.error(action.payload?.data?.message);
                state.startUpLoader = false
                state.error = action.error.message
            })
            .addCase(companyOverview.pending, (state, action) => {
                state.companyOverviewLoader = true
            })

            .addCase(companyOverview.fulfilled, (state, action) => {
                state.companyOverviewLoader = false
            })

            .addCase(companyOverview.rejected, (state, action) => {
                state.companyOverviewLoader = false
                state.error = action.error.message
            })
            .addCase(acquisitionDetails.pending, (state, action) => {
                state.acquisitionLoader = true
            })

            .addCase(acquisitionDetails.fulfilled, (state, action) => {
                state.acquisitionLoader = false
            })

            .addCase(acquisitionDetails.rejected, (state, action) => {
                state.acquisitionLoader = false
                state.error = action.error.message
            })

            // BUYER LISTING..

            .addCase(getSingleListingDetails.pending, (state, action) => {
                state.singleLoader = true
            })

            .addCase(getSingleListingDetails.fulfilled, (state, action) => {
                console.log('single listing details', action.payload)
                state.singleList = action.payload
                state.singleLoader = false
            })

            .addCase(getSingleListingDetails.rejected, (state, action) => {
                state.singleLoader = false
                state.error = action.error.message
            })

            // HIDE TAHT SPECIFIC LIST..

            .addCase(hideSingleStartup.pending, (state, action) => {
                state.singleLoader = true
            })

            .addCase(hideSingleStartup.fulfilled, (state, action) => {
                console.log('single listing details', action.payload)
                // Assuming action.payload contains the ID of the startup to hide
                state.singleList = state.singleList.map((startup) =>
                    startup.id === action.payload.id
                        ? { ...startup, hidden: true }
                        : startup,
                )
                state.singleLoader = false
            })

            .addCase(hideSingleStartup.rejected, (state, action) => {
                state.singleLoader = false
                state.error = action.error.message
            })

            // PRE APPROVED SECTION.. IN SELLER/LISTING..
            .addCase(getUserListings.pending, (state) => {
                state.readyLoader = true
            })
            .addCase(getUserListings.fulfilled, (state, action) => {
                state.readyLoader = false
                state.pendingUserListings = action.payload
            })
            .addCase(getUserListings.rejected, (state) => {
                state.readyLoader = false
            })

            .addCase(getSellerListingsDetails.pending, (state) => {
                state.sellerdetailsLoader = true
            })
            .addCase(getSellerListingsDetails.fulfilled, (state, action) => {
                state.sellerdetailsLoader = false
                state.sellerListingDetails = action.payload
            })
            .addCase(getSellerListingsDetails.rejected, (state) => {
                state.sellerdetailsLoader = false
            })
            .addCase(contentStartUpPutType.pending, (state) => {
                state.businessOverViewLoader = false
                state.startUpLoader = true
            })
            .addCase(contentStartUpPutType.fulfilled, (state, action) => {
                state.businessOverViewLoader = true
                state.startUpLoader = false
            })
            .addCase(contentStartUpPutType.rejected, (state) => {
                state.businessOverViewLoader = false
                state.startUpLoader = false
            })

            // To Update The Details of PendingListings..
            .addCase(getPendingListingDetails.pending, (state) => {
                state.editPendingLoader = true
            })
            .addCase(getPendingListingDetails.fulfilled, (state, action) => {
                state.editPendingLoader = false
                state.pendingUserListings = action.payload
            })
            .addCase(getPendingListingDetails.rejected, (state) => {
                state.editPendingLoader = false
            })

            .addCase(companyOverviewPutType.pending, (state) => {
                state.companyViewLoader = true
                state.companyOverviewLoader = true
            })
            .addCase(companyOverviewPutType.fulfilled, (state, action) => {
                state.companyViewLoader = false
                state.companyOverviewLoader = false
            })
            .addCase(companyOverviewPutType.rejected, (state) => {
                state.companyViewLoader = false
                state.companyOverviewLoader = false
            })
            .addCase(acquisitionDetailsPutType.pending, (state) => {
                state.acquisitionDetailsLoader = true
                state.acquisitionLoader = true
            })
            .addCase(acquisitionDetailsPutType.fulfilled, (state, action) => {
                state.acquisitionDetailsLoader = false
                state.acquisitionLoader = false
            })
            .addCase(acquisitionDetailsPutType.rejected, (state) => {
                state.acquisitionDetailsLoader = false
                state.acquisitionLoader = false
            })
            .addCase(getALLListingsDetails.pending, (state) => {
                state.allListingLoader = true
            })
            .addCase(getALLListingsDetails.fulfilled, (state, action) => {
                state.allListingLoader = false
                state.allListing = action.payload
            })
            .addCase(getALLListingsDetails.rejected, (state) => {
                state.allListingLoader = false
            })

            .addCase(getSingleListDetail.pending, (state) => {
                state.allListingLoader = true
            })
            .addCase(getSingleListDetail.fulfilled, (state, action) => {
                state.allListingLoader = false
                state.singleListing = action.payload
            })
            .addCase(getSingleListDetail.rejected, (state) => {
                state.allListingLoader = false
            })

            .addCase(buyerFavouriteListing.pending, (state) => {
                state.favouriteListingLoader = true
            })
            .addCase(buyerFavouriteListing.fulfilled, (state, action) => {
                state.favouriteListingLoader = false
                state.favouriteListing = action.payload
            })
            .addCase(buyerFavouriteListing.rejected, (state) => {
                state.favouriteListingLoader = false
            })

            .addCase(buyerContactedListing.pending, (state) => {
                state.contactedListingLoader = true
            })
            .addCase(buyerContactedListing.fulfilled, (state, action) => {
                state.contactedListingLoader = false
                state.contactedListing = action.payload
            })
            .addCase(buyerContactedListing.rejected, (state) => {
                state.contactedListingLoader = false
            })

            .addCase(buyerNotifications.pending, (state) => {
                state.notificationsLoader = true
            })
            .addCase(buyerNotifications.fulfilled, (state, action) => {
                state.notificationsLoader = false
                state.notifications = action.payload
            })
            .addCase(buyerNotifications.rejected, (state) => {
                state.notificationsLoader = false
            })

            .addCase(readNotification.fulfilled, (state, action) => {
                const { NotifID, details } = action.payload
                const notification = state.notifications.find(
                    (notif) => notif.ID === NotifID,
                )
                if (notification) {
                    notification.Status = details.Status
                }
            })
            .addCase(readAllNotifications.fulfilled, (state, action) => {
                state.notifications = state.notifications.map(
                    (notification) => ({
                        ...notification,
                        Status: true,
                    }),
                )
            })
            .addCase(favoriteStartups.pending, (state) => {
                state.favouriteLoader = true
            })
            .addCase(favoriteStartups.fulfilled, (state, action) => {
                state.favouriteLoader = false
            })
            .addCase(favoriteStartups.rejected, (state) => {
                state.favouriteLoader = false
            })
    },
})

export const { UPDATE_NOTIFICATIONS } = listingSlice.actions

export default listingSlice.reducer
