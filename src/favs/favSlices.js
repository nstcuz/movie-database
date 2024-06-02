import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
}

const favsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    addFav: (state, action) => {
      state.items.push(action.payload);
    },
    deleteFav: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    setFavorites: (state, action) => {
      state.items = action.payload;
    }
  },
});

export const { addFav, deleteFav, setFavorites } = favsSlice.actions;

export default favsSlice.reducer;
