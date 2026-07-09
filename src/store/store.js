import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // 💡 Make sure the file path matches your project structure!

const store = configureStore({
  reducer: {
    auth: authSlice, // This gives your entire app access to the authentication state
    // post: postSlice, <-- You can add more reducers here later as your app grows!
  },
});

export default store;