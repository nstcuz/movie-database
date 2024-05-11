import { configureStore } from '@reduxjs/toolkit';
import favsReducer from '../src/favs/favSlices';


export const store = configureStore({
  reducer: {
    favs: favsReducer
  }
});
