import { combineReducers } from "redux";
import { featuredOffersReducer } from "./featuredOffersReducer";
import { allOffersReducer } from "./allOffersReducer";
import { userReducer } from "./userReducer";
import { notificationReducer } from "./notificationReducer";
import { offerReducer } from "./offerReducer";

export const rootReducer = combineReducers({
  featuredOffers: featuredOffersReducer,
  allOffers: allOffersReducer,
  user: userReducer,
  notification: notificationReducer,
  offer: offerReducer,
});
