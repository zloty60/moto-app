import { createBrowserHistory } from "history";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";

import { NotLoggedRoute, ProtectedRoute } from "./routes";
import { routesConstans } from "./routesConstans";
import { Navbar } from "./../components/navbar/Navbar";
import { NavbarSpace } from "./../components/navbar/NavbarSpace";
import { RootView } from "./../views/RootView";
import { Login } from "./../views/Login";
import { Register } from "./../views/Register";
import { NotFound } from "./../views/NotFound";
import { Account } from "./../views/Account";
import { Footer } from "./../components/footer/Footer";
import { AllOffers } from "./../views/AllOffers";
import { Offer } from "./../views/Offer";
import { OfferFormContainer } from "./../views/OfferFormContainer";
import { EditOfferFormContainer } from "./../views/EditOfferFormContainer";
import { CreatedByUser, CreatedByCurrentUser } from "./../views/CreatedByUser";
import { ScrollToTop } from "./../components/navbar/ScrollToTop";
import { Notification } from "./../components/notification/Notification";

export const history = createBrowserHistory();

export function AppRoutes() {
  const {
    login,
    register,
    allOffers,
    offer,
    allOffersPagination,
    userAccount,
    add,
    edit,
    createdByUser,
    myOffers,
  } = routesConstans;
  return (
    <Router history={history}>
      <main>
        <ScrollToTop />
        <Navbar />
        <NavbarSpace />
        <Notification />
        <Switch>
          <Route exact path="/" component={RootView} />
          <NotLoggedRoute path={login.path} component={Login} />
          <NotLoggedRoute path={register.path} component={Register} />
          <Route path={allOffers.path} component={AllOffers} />
          <Route path={allOffersPagination.path} component={AllOffers} />
          <Route path={offer.path} component={Offer} />
          <ProtectedRoute path={userAccount.path} component={Account} />
          <ProtectedRoute path={add.path} component={OfferFormContainer} />
          <ProtectedRoute path={edit.path} component={EditOfferFormContainer} />
          <ProtectedRoute
            path={myOffers.path}
            component={CreatedByCurrentUser}
          />
          <Route path={createdByUser.path} component={CreatedByUser} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}
