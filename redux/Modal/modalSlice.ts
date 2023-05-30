import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieCurrent: null,
  showModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      console.log(action.payload);
      state.showModal = action.payload;
    },
    setCurrentMovie: (state, action) => {
     
      console.log(action.payload);
      state.movieCurrent = { ...action.payload };
      console.log(state.movieCurrent);
    },
  },
});

export const { setShowModal, setCurrentMovie } = modalSlice.actions;
export default modalSlice.reducer;
