import { createSlice } from '@reduxjs/toolkit';
import { chatListening, createChat, createOffer, getChatID, getUserChatWith, getUserhat, offerActions, sendChatMessage,releasePayment } from './chatThunk';

const initialState = {
  chatLoader: false,
  loader: false,
  offerLoader:false,
  backButton: true,
  releaseLoader:false,
  chat:[],
  chatWithUsers:[]

};

export const chatSlice = createSlice({
  name: "getChat",
  initialState,
  reducers: {
    chatBackButton: (state, action) => {
      state.backButton = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatID.pending, (state) => {
        state.chatLoader = true;
      })
      .addCase(getChatID.fulfilled, (state) => {
        state.chatLoader = false;
      })
      .addCase(getChatID.rejected, (state) => {
        state.chatLoader = false;
      })
      .addCase(createChat.pending, (state) => {
        state.chatLoader = true;
      })
      .addCase(createChat.fulfilled, (state) => {
        state.chatLoader = false;
      })
      .addCase(createChat.rejected, (state) => {
        state.chatLoader = false;
      })
      //check continously if new msg populate in chat array
      .addCase(chatListening.pending, (state) => {
      })
      .addCase(chatListening.fulfilled, (state,action) => {
        if (state.chat.length < action.payload.length) {
          state.chat=action.payload
        }
      })
      .addCase(chatListening.rejected, (state) => {
      })
      // Get chat of user
      .addCase(getUserhat.pending, (state) => {
        state.chatLoader = true;
      })
      .addCase(getUserhat.fulfilled, (state,action) => {
        state.chatLoader = false;
       state.chat=action.payload
      
      })
      .addCase(getUserhat.rejected, (state) => {
        state.chatLoader = false;
      })
      // Send Message || FILE || Offer
      .addCase(sendChatMessage.pending, (state) => {
        state.loader = true;
      })
      .addCase(sendChatMessage.fulfilled, (state,action) => {
        state.loader = false;
       state.chat=[...state.chat,action.payload]
      
      })
      .addCase(sendChatMessage.rejected, (state) => {
        state.loader = false;
      })
       // Create Offer 
       .addCase(createOffer.pending, (state) => {
      })
      .addCase(createOffer.fulfilled, (state,action) => {
        state.chat=[...state.chat,action.payload]
      
      })
      .addCase(createOffer.rejected, (state) => {
      })
      //  Offer Accept || Cancel
      .addCase(offerActions.pending, (state) => {
        state.offerLoader = true;
      })
      .addCase(offerActions.fulfilled, (state,action) => {
        state.offerLoader = false;
      
      })
      .addCase(offerActions.rejected, (state) => {
        state.offerLoader = false;
      })
      //  Offer Accept || Cancel
      .addCase(getUserChatWith.pending, (state) => {
      })
      .addCase(getUserChatWith.fulfilled, (state,action) => {
        state.chatWithUsers=action.payload
      
      })
      .addCase(getUserChatWith.rejected, (state) => {

      })

      // Release payment
      .addCase(releasePayment.pending, (state) => {
        state.releaseLoader=true
      })
      .addCase(releasePayment.fulfilled, (state,action) => {
        state.releaseLoader=false      
      })
      .addCase(releasePayment.rejected, (state) => {
        state.releaseLoader=false

      });  
  } 
});

export const { chatBackButton } = chatSlice.actions;
export default chatSlice.reducer;
