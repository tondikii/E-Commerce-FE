import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    category: '',
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  }
})

export const {setCategory} = rootSlice.actions

export default rootSlice.reducer;