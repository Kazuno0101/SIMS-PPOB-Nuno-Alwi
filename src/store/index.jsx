import { configureStore } from '@reduxjs/toolkit';
import { profileSlice } from '../features/profileSlice';

export const store = configureStore({
	reducer: {
		profile: profileSlice.reducer,
	},
});
