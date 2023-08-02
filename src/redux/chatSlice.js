import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  collaboratorInfo: "",
  chatId: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.collaboratorInfo = action.payload.collaboratorInfo;
      state.chatId = action.payload.chatId;
    },
  },
});

export const { selectChat } = chatSlice.actions;
export default chatSlice.reducer;
