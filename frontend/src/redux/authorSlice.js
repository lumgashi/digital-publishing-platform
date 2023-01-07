import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAuthors: [],
};

export const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    setAuthors: (state, action) => {
      state.allAuthors = action.payload;
    },
  },
});

export const { setAuthors } = authorSlice.actions;
export default authorSlice.reducer;
