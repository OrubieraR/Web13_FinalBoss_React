import { createSlice } from '@reduxjs/toolkit';

import client from '../../api/client';

const advertUrl = '/api/adverts';

export const advertsSlice = createSlice({
	name: 'adverts',
	initialState: {
		list: [],
	},
	reducers: {
		setAdvertsList: (state, action) => {
			state.list = action.payload;
		},
		setAdvertDetail: (state, action) => {
			state.list = [action.payload];
		},
		setDeletedAdvert: (state, action) => {
			state.list = state.list.filter((advert) => advert.id !== action.payload);
		},
	},
});

export const fetchAllAdverts = () => (dispatch) => {
	client
		.get(advertUrl)
		.then((response) => {
			dispatch(setAdvertsList(response.results.reverse()));
		})
		.catch((error) => console.log(error));
};

export const getUniqueAdvert = (advertId) => (dispatch) => {
	client
		.get(`${advertUrl}/${advertId}`)
		.then((response) => {
			dispatch(setAdvertDetail(response.results));
		})
		.catch((error) => console.log(error));
};

export const deleteAdvert = (advert) => (dispatch) => {
	const advertId = advert._id;
	client
		.delete(`${advertUrl}/${advertId}`)
		.then((response) => {
			dispatch(setDeletedAdvert(response.results));
		})
		.catch((error) => console.log(error));
};

export const getUserAdvert = (userOwner) => (dispatch) => {
	client
		.get(`${advertUrl}/user/${userOwner}`)
		.then((response) => {
			dispatch(setAdvertsList(response.results.reverse()));
		})
		.catch((error) => console.log(error));
};

export const { setAdvertsList, setAdvertDetail, setDeletedAdvert } =
	advertsSlice.actions;

export default advertsSlice.reducer;
