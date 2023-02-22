import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const advertUrl = "/api/adverts";

export const advertsSlice = createSlice({
  name: "adverts",
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
  },
});

export const fetchAllAdverts = () => (dispatch) => {
  axios
    .get(advertUrl)
    .then((response) => {
      dispatch(setAdvertsList(response.results));
    })
    .catch((error) => console.log(error));
};

export const getUniqueAdvert = (advertId) => (dispatch) => {
  axios
    .get(`${advertUrl}/${advertId}`)
    .then((response) => {
      dispatch(setAdvertDetail(response.results));
    })
    .catch((error) => console.log(error));
};

export const { setAdvertsList, setAdvertDetail } = advertsSlice.actions;
export default advertsSlice.reducer;
