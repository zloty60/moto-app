import { notificationActions } from "./../actionTypesData";

export const openNotification = (msg) => {
  return {
    type: notificationActions.OPEN_NOTIFICATION,
    payload: msg,
  };
};

export const closeNotification = () => {
  return {
    type: notificationActions.CLOSE_NOTIFICATION,
  };
};
