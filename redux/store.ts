import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Modal/modalSlice";
export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});
