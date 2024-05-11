import { configureStore } from '@reduxjs/toolkit';
import favsSlice from '../favs/favSlices';


export const store = configureStore({
  reducer: {
    favs: favsSlice
  }
});
