import { featuredOffersActions } from "./../actionTypesData";

const initialState = {
  offers: [],
  loading: false,
  error: false,
};

export const featuredOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case featuredOffersActions.FETCH_FEATURED_OFFERS_START:
      return {
        ...state,
        loading: true,
        error: false,
        offers: [],
      };
    case featuredOffersActions.FETCH_FEATURED_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: [...action.payload],
      };
    case featuredOffersActions.FETCH_FEATURED_OFFERS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
