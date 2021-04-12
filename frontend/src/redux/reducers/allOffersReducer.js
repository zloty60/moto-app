import { allOffersActions } from "./../actionTypesData";

const initialState = {
  offers: [],
  loading: false,
  error: false,
  totalNumberOfResults: 0,
};

export const allOffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case allOffersActions.FETCH_ALL_OFFERS_START:
      return {
        ...state,
        loading: action.payload,
        error: false,
        offers: [],
        totalNumberOfResults: 0,
      };
    case allOffersActions.FETCH_ALL_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        totalNumberOfResults: action.payload.allResults,
        offers: [...action.payload.data],
      };
    case allOffersActions.FETCH_ALL_OFFERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
