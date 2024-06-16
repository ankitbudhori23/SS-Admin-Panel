import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userdata",
  initialState: {
    currentUser: "",
  },
  reducers: {
    setuser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeuser: (state, action) => {
      state.currentUser = "";
    },
  },
});

export const { setuser, removeuser } = userSlice.actions;

export default userSlice.reducer;
