import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, query, where, getDocs } from "firebase/firestore";

import { firestore } from "src/firebase";

export const fetchUsersListFromFirestore = createAsyncThunk(
  "match/fetchUsersListFromFirestore",
  async (userInfo) => {
    let users = [];
    const usersCollection = await getDocs(
      query(collection(firestore, "users"))
    );
    usersCollection.forEach((user) => users.push(user.data()));
    users = users.filter(({ userId }) => {
      return userId !== userInfo.userId;
    });
    if (userInfo.shownUsers)
      users = users.filter(
        ({ userId }) => !userInfo.shownUsers.includes(userId)
      );
    return users;
  }
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
      let collaborators = action.payload;
      if (state.breed.length > 0) {
        collaborators = collaborators.filter((user) =>
          state.breed.find((breed) => breed === user.breed)
        );
      }
      if (state.gender.length > 0) {
        collaborators = collaborators.filter((user) =>
          state.gender.find((gender) => gender === user.gender)
        );
      }
      if (state.age.length > 0) {
        collaborators = collaborators.filter(
          (user) => user.age >= state.age[0] && user.age <= state.age[1]
        );
      }
      state.collaborators = collaborators;
    });
  },
});

export const { setFilter } = matchSlice.actions;
export default matchSlice.reducer;
