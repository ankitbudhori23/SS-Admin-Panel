import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import userSlice from "../features/common/userSlice";
import leaderSlice from "../features/common/leaderSlice";
import presentInternSlice from "../features/common/presentInternSlice";
import pastInternSlice from "../features/common/pastInternSlice";
const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  userdata: userSlice,
  leaderdata: leaderSlice,
  presentInterns: presentInternSlice,
  pastInterns: pastInternSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
