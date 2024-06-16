import { createSlice } from "@reduxjs/toolkit";

export const presentInternSlice = createSlice({
  name: "presentInterns",
  initialState: {
    userdata: [],
  },
  reducers: {
    setuser: (state, action) => {
      state.userdata = action.payload;
    },
    removeuser: (state) => {
      state.userdata = [];
    },
  },
});

export const { setuser, removeuser } = presentInternSlice.actions;

export default presentInternSlice.reducer;
