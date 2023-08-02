import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import chatSlice from "./chatSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    chat: chatSlice,
  },
});
