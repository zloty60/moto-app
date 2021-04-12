import { offerActions } from "./../actionTypesData";

const initialState = {
  loading: false,
  error: false,
  errorMsg: null,
  singleOffer: {},
};

export const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case offerActions.ASYNC_OFFER_START:
      return {
        ...state,
        loading: action.payload,
        error: false,
        errorMsg: null,
      };
    case offerActions.ASYNC_OFFER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorMsg: action.payload.errorMsg,
      };
    case offerActions.CREATE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case offerActions.FETCH_SINGLE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        singleOffer: { ...action.payload },
      };
    case offerActions.DELETE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case offerActions.CLOSE_OFFER_ERROR:
      return {
        ...state,
        error: false,
        errorMsg: null,
      };
    default:
      return state;
  }
};
