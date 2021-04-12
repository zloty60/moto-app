import axios from "axios";

import { allOffersActions } from "./../actionTypesData";

export const fetchAllOffers = (searchQuery, page = 1) => async (dispatch) => {
  let url;

  if (searchQuery) {
    url = `/api/v1/offers${searchQuery}&page=${page}&limit=12`;
  } else {
    url = `/api/v1/offers?page=${page}&limit=12`;
  }

  try {
    dispatch({
      type: allOffersActions.FETCH_ALL_OFFERS_START,
      payload: "fetchAllOffers",
    });
    const { data } = await axios.get(url);
    const payload = { allResults: data.allResults, data: data.data.data };
    dispatch({
      type: allOffersActions.FETCH_ALL_OFFERS_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    dispatch({
      type: allOffersActions.FETCH_ALL_OFFERS_FAIL,
      payload: "fetchAllOffers",
    });
  }
};

export const fetchAllOffersCreatedBy = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: allOffersActions.FETCH_ALL_OFFERS_START,
      payload: "fetchAllOffersCreatedBy",
    });
    const { data } = await axios.get(`/api/v1/offers?createdBy=${userId}`);
    const payload = { allResults: data.allResults, data: data.data.data };
    dispatch({
      type: allOffersActions.FETCH_ALL_OFFERS_SUCCESS,
      payload: payload,
    });
  } catch (err) {
    dispatch({
      type: allOffersActions.FETCH_ALL_OFFERS_FAIL,
      payload: "fetchAllOffersCreatedBy",
    });
  }
};
