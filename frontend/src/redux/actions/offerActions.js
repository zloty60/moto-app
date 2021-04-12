import axios from "axios";

import { history } from "./../../routes/AppRoutes";
import { offerActions } from "./../actionTypesData";
import { openNotification } from "./notificationActions";

function generateHeaders() {
  const userProfile = JSON.parse(localStorage.getItem("user"));

  let config = {};

  if (userProfile) {
    config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userProfile.token}`,
      },
    };
  }
  return config;
}

export const fetchSingleOffer = (id) => async (disptach) => {
  try {
    disptach({
      type: offerActions.ASYNC_OFFER_START,
      payload: "fetchSingleOffer",
    });
    const { data } = await axios.get(`/api/v1/offers/${id}`);
    disptach({
      type: offerActions.FETCH_SINGLE_OFFER_SUCCESS,
      payload: data.data.data,
    });
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed ";
    disptach({
      type: offerActions.ASYNC_OFFER_FAIL,
      payload: { error: "fetchSingleOffer", errorMsg: errorPayload },
    });
  }
};

export const createOffer = (values) => async (dispatch) => {
  const config = generateHeaders();
  const formData = new FormData();

  for (const property in values) {
    if (property === "images") {
      if (values.images.length > 0) {
        values.images.forEach((el) => {
          formData.append("images", el);
        });
      }
    } else {
      formData.append(property, values[property]);
    }
  }

  try {
    dispatch({ type: offerActions.ASYNC_OFFER_START, payload: "offerForm" });
    const { data } = await axios.post("/api/v1/offers", formData, config);
    const offerId = data.data.data._id;
    dispatch({ type: offerActions.CREATE_OFFER_SUCCESS });
    history.push(`/oferta/${offerId}`);
    dispatch(openNotification("Ogłosznie zostało pomyślnie dodane"));
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed";
    dispatch({
      type: offerActions.ASYNC_OFFER_FAIL,
      payload: { error: "offerForm", errorMsg: errorPayload },
    });
  }
};

export const updateOffer = (id, values) => async (dispatch) => {
  const config = generateHeaders();

  try {
    dispatch({ type: offerActions.ASYNC_OFFER_START, payload: "updateOffer" });
    const { data } = await axios.patch(`/api/v1/offers/${id}`, values, config);
    const offerId = data.data.data._id;
    dispatch({ type: offerActions.CREATE_OFFER_SUCCESS });
    history.push(`/oferta/${offerId}`);
    dispatch(openNotification("Ogłosznie zostało pomyślnie zaktualizowane"));
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed";
    dispatch({
      type: offerActions.ASYNC_OFFER_FAIL,
      payload: { error: "updateOffer", errorMsg: errorPayload },
    });
  }
};

export const deleteOffer = (id) => async (dispatch) => {
  const config = generateHeaders();
  try {
    dispatch({ type: offerActions.ASYNC_OFFER_START, payload: "deleteOffer" });
    await axios.delete(`/api/v1/offers/${id}`, config);
    dispatch({ type: offerActions.DELETE_OFFER_SUCCESS });
    history.push("/");
    dispatch(openNotification("Pomyślnie usunięto ogłoszenie"));
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed";
    dispatch({
      type: offerActions.ASYNC_OFFER_FAIL,
      payload: { error: "deleteOffer", errorMsg: errorPayload },
    });
  }
};

export const closeOfferError = () => (dispatch) => {
  dispatch({ type: offerActions.CLOSE_OFFER_ERROR });
};
