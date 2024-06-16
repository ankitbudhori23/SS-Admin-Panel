import { createSlice } from "@reduxjs/toolkit";

export const pastInternSlice = createSlice({
  name: "pastInterns",
  initialState: {
    userdata: [],
    pintern_data:false
  },
  reducers: {
    setuser: (state, action) => {
      state.userdata = action.payload;
      state.pintern_data=true;
    },
    removeuser: (state, action) => {
      state.userdata = [];
    },
  },
});

export const { setuser, removeuser } = pastInternSlice.actions;

export default pastInternSlice.reducer;
