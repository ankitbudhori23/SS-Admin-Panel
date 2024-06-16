import { createSlice } from "@reduxjs/toolkit";

export const leaderSlice = createSlice({
  name: "leaderdata",
  initialState: {
    userdata:[],
  },
  reducers: {
    setuser: (state, action) => {
      state.userdata = action.payload;
    },
    removeuser: (state, action) => {
      state.userdata = "";
    },
  },
});

export const { setuser, removeuser } = leaderSlice.actions;

export default leaderSlice.reducer;
