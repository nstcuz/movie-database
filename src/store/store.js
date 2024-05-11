import { configureStore } from '@reduxjs/toolkit';
import favsReducer from '../favs/favSlices';


export const store = configureStore({
  reducer: {
    favs: favsReducer
  }
});