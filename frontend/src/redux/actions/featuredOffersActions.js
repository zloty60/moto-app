import axios from "axios";

import { featuredOffersActions } from "./../actionTypesData";

export const fetchfeaturedOffers = () => async (dispatch) => {
  try {
    dispatch({ type: featuredOffersActions.FETCH_FEATURED_OFFERS_START });
    const {
      data: { data },
    } = await axios.get("/api/v1/offers/featured-offers");
    dispatch({
      type: featuredOffersActions.FETCH_FEATURED_OFFERS_SUCCESS,
      payload: data.data,
    });
  } catch (err) {
    dispatch({
      type: featuredOffersActions.FETCH_FEATURED_OFFERS_FAIL,
    });
  }
};
