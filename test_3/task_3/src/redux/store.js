import { configureStore } from '@reduxjs/toolkit';
import postReducer from './post';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
