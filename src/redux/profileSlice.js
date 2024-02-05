import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setDoc, getDoc, doc } from "firebase/firestore";

import { firestore } from "src/firebase";

export const addUserInfoToFirestore = createAsyncThunk(
  "profile/addUserInfoToFirestore",
  async (info) => {
    await setDoc(doc(firestore, "users", info.userId), info, { merge: true });
  }
);

export const fetchUserInfoFromFirestore = createAsyncThunk(
  "profile/fetchUserInfoFromFirestore",
  async (uid) => {
    return (await getDoc(doc(firestore, "users", uid))).data();
  }
);

const initialState = {
  userInfo: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addUserInfoToFirestore.fulfilled, (state, action) => {});
    builder.addCase(fetchUserInfoFromFirestore.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export default profileSlice.reducer;
