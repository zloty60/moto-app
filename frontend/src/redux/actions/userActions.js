import axios from "axios";

import { userActions } from "./../actionTypesData";
import { axiosRequestConfig } from "./../actionTypesData";
import { openNotification } from "./notificationActions";
import { history } from "./../../routes/AppRoutes";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: userActions.USER_LOGIN_START, payload: "login" });
    const { data } = await axios.post(
      "/api/v1/users/login",
      { email, password },
      axiosRequestConfig
    );
    delete data.data.user.__v;
    dispatch({
      type: userActions.USER_LOGIN_SUCCESS,
      payload: { token: data.token, user: data.data.user },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, user: data.data.user })
    );
    dispatch(openNotification("Pomyślnie zalogowano"));
    history.push("/");
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed ";
    dispatch({
      type: userActions.USER_PROFILE_ASYNC_FAIL,
      payload: { error: "login", errorMsg: errorPayload },
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: userActions.USER_LOGOUT });
  dispatch(openNotification("Pomyślnie wylogowano"));
  history.push("/");
};

export const register = (name, email, password, passwordConfirm) => async (
  dispatch
) => {
  try {
    dispatch({ type: userActions.USER_LOGIN_START, payload: "register" });
    const { data } = await axios.post(
      "/api/v1/users/signup",
      { name, email, password, passwordConfirm },
      axiosRequestConfig
    );
    delete data.data.user.__v;
    dispatch({
      type: userActions.USER_LOGIN_SUCCESS,
      payload: { token: data.token, user: data.data.user },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, user: data.data.user })
    );
    dispatch(openNotification("Pomyślnie zarejestrowano użytkownika"));
    history.push("/");
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed ";
    dispatch({
      type: userActions.USER_PROFILE_ASYNC_FAIL,
      payload: { error: "register", errorMsg: errorPayload },
    });
  }
};

export const closeCurrentUserProfileNotification = () => (dispatch) => {
  dispatch({ type: userActions.CLOSE_CURRENT_USER_PROFILE_NOTIFICATION });
};

export const updateCurrentUserProfile = (userProfile) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    dispatch({
      type: userActions.USER_PROFILE_ASYNC_START,
      payload: "userProfile",
    });
    const { data } = await axios.patch(
      "/api/v1/users/updateCurrentUser",
      userProfile,
      config
    );
    delete data.data.user.__v;
    dispatch({
      type: userActions.UPDATE_CURRENT_USER_PROFILE_SUCCESS,
      payload: {
        user: data.data.user,
        notification: "userProfile",
        notificationMsg: "Pomyślnie zmieniono dane użytkownika",
      },
    });
    localStorage.setItem(
      "user",
      JSON.stringify({ token: user.token, user: data.data.user })
    );
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed ";
    dispatch({
      type: userActions.USER_PROFILE_ASYNC_FAIL,
      payload: { error: "userProfile", errorMsg: errorPayload },
    });
  }
};

export const updateCurrentUserPassword = (passwordsFromForm) => async (
  dispatch
) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    dispatch({
      type: userActions.USER_PROFILE_ASYNC_START,
      payload: "password",
    });
    const { data } = await axios.patch(
      "/api/v1/users/updateMyPassword",
      passwordsFromForm,
      config
    );
    dispatch({
      type: userActions.UPDATE_CURRENT_USER_PASSWORD_SUCCESS,
      payload: {
        notification: "password",
        notificationMsg: "Pomyślnie zmieniono hasło",
      },
    });
    delete data.data.user.__v;
    delete data.data.user.passwordChangedAt;
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, user: data.data.user })
    );
  } catch (e) {
    const errorPayload = e.response.data.message
      ? e.response.data.message
      : "Request failed";
    dispatch({
      type: userActions.USER_PROFILE_ASYNC_FAIL,
      payload: { error: "password", errorMsg: errorPayload },
    });
  }
};
