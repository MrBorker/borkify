import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { firestore } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchUsersListFromFirestore = createAsyncThunk(
  "match/fetchUsersListFromFirestore",
  async () => {
    const users = [];
    const usersCollection = await getDocs(
      query(collection(firestore, "users"))
    );
    usersCollection.forEach((user) => {
      users.push(user.data());
    });
    console.log(users);
    return users;
  }
  // query(collection(firestore, "users"), where("gender", "==", "Male"))
);

const initialState = {
  distance: "",
  gender: ["male", "female"],
  breed: "",
  age: "",
  collaborators: "",
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.distance = action.payload.distance;
      state.gender = action.payload.gender;
      state.breed = action.payload.breed;
      state.age = action.payload.age;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersListFromFirestore.fulfilled, (state, action) => {
      if (state.gender.length === 1) {
        state.collaborators = action.payload.filter(
          (user) => user.gender === state.gender[0]
        );
      } else {
        state.collaborators = action.payload;
      }
    });
  },
});

export const { setFilter } = matchSlice.actions;
export default matchSlice.reducer;
