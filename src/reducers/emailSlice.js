import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sentMails: [],
  receivedMails: [],
  unreadMails: 0,
  staredMails: [],
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setSentMails(state, action) {
      state.sentMails = action.payload;
    },
    setReceivedMails(state, action) {
      state.receivedMails = action.payload.mailArray;
      state.unreadMails = action.payload.unreadMails;
    },
    setStaredMails(state, action) {
      state.staredMails = action.payload;
    },
  },
});

export const { setSentMails, setReceivedMails, setStaredMails } =
  emailSlice.actions;
export default emailSlice.reducer;
