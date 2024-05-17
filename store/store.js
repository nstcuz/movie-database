import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
import favsSlice from '../favs/favSlices';
=======
import favsReducer from '../src/favs/favSlices';
>>>>>>> staging


export const store = configureStore({
  reducer: {
    favs: favsSlice
  }
});
