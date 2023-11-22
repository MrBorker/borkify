import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import chatSlice from "./chatSlice";
import matchSlice from "./matchSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    chat: chatSlice,
    match: matchSlice,
  },
});
