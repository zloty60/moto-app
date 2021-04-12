import { notificationActions } from "./../actionTypesData";

const initialState = {
  isOpen: false,
  msg: "",
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActions.OPEN_NOTIFICATION:
      return {
        ...state,
        isOpen: true,
        msg: action.payload,
      };
    case notificationActions.CLOSE_NOTIFICATION:
      return {
        ...state,
        isOpen: false,
        msg: "",
      };
    default:
      return state;
  }
};
