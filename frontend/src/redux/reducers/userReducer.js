import { userActions } from "./../actionTypesData";

const initialState = {
  isAuth: false,
  userProfile: null,
  loading: false,
  error: false,
  errorMsg: null,
  userProfileNotification: false,
  userProfileNotificationMsg: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        userProfile: action.payload.user,
      };
    case userActions.UPDATE_CURRENT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload.user,
        userProfileNotification: action.payload.notification,
        userProfileNotificationMsg: action.payload.notificationMsg,
      };
    case userActions.UPDATE_CURRENT_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfileNotification: action.payload.notification,
        userProfileNotificationMsg: action.payload.notificationMsg,
      };
    case userActions.USER_LOGOUT:
      return {
        ...state,
        isAuth: false,
        userProfile: null,
      };
    case userActions.USER_PROFILE_ASYNC_START:
      return {
        ...state,
        loading: action.payload,
        error: false,
        errorMsg: null,
        userProfileNotification: false,
        userProfileNotificationMsg: null,
      };
    case userActions.USER_LOGIN_START:
      return {
        ...state,
        isAuth: false,
        loading: action.payload,
        userProfile: null,
        error: false,
        errorMsg: null,
      };
    case userActions.USER_PROFILE_ASYNC_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        errorMsg: action.payload.errorMsg,
      };
    case userActions.CLOSE_CURRENT_USER_PROFILE_NOTIFICATION:
      return {
        ...state,
        userProfileNotification: false,
        userProfileNotificationMsg: null,
      };
    default:
      return state;
  }
};
