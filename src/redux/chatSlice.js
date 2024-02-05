import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  serverTimestamp,
  doc,
  updateDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { firestore } from "src/firebase";

export const addMessageToChat = createAsyncThunk(
  "chat/addMessageToChat",
  async (id, { getState }) => {
    const { chatId } = getState().chat;
    const { newMessage } = getState().chat;
    const { userId } = getState().profile.userInfo;

    await setDoc(
      doc(firestore, "chats", chatId),
      {
        [id]: {
          id: id,
          text: newMessage.trim(),
          senderId: userId,
          date: Timestamp.now(),
        },
      },
      { merge: true }
    );
  }
);

export const updateChatInfo = createAsyncThunk(
  "chat/updateChatInfo",
  async (id, { getState }) => {
    const { chatId } = getState().chat;
    const { newMessage } = getState().chat;

    updateDoc(doc(firestore, "userChats", id), {
      [chatId + ".lastMessage"]: {
        text: newMessage,
      },
      [chatId + ".date"]: serverTimestamp(),
    });
  }
);

const initialState = {
  collaboratorInfo: "",
  chatId: "",
  newMessage: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectChat: (state, action) => {
      state.collaboratorInfo = action.payload.collaboratorInfo;
      state.chatId = action.payload.chatId;
    },
    setMessage: (state, action) => {
      state.newMessage = action.payload;
    },
  },
});

export const { selectChat } = chatSlice.actions;
export const { setMessage } = chatSlice.actions;

export default chatSlice.reducer;
