import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfileAndBalance = createAsyncThunk('profile/fetchProfileAndBalance', async (_, { rejectWithValue }) => {
	try {
		const profileResponse = await axios.get('https://take-home-test-api.nutech-integrasi.com/profile', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		});

		const balanceResponse = await axios.get('https://take-home-test-api.nutech-integrasi.com/balance', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
			},
		});

		return {
			profile: profileResponse.data.data,
			balance: balanceResponse.data.data.balance,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return rejectWithValue(error.response ? error.response.data : error.message);
	}
});

const initialState = {
	email: '',
	firstName: 'Loading...',
	lastName: '',
	profileImage: '',
	balance: 0,
	error: null,
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProfileAndBalance.fulfilled, (state, action) => {
			state.email = action.payload.profile.email;
			state.firstName = action.payload.profile.first_name;
			state.lastName = action.payload.profile.last_name;
			state.profileImage = action.payload.profile.profile_image;
			state.balance = action.payload.balance;
			state.error = null;
		});
		builder.addCase(fetchProfileAndBalance.rejected, (state, action) => {
			state.error = action.payload;
		});
	},
});

export default profileSlice.reducer;
