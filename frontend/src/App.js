import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { rootReducer } from "./redux/reducers/index";
import { AppRoutes } from "./routes/AppRoutes";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

let initialState;

if (userFromStorage) {
  initialState = {
    user: {
      loading: false,
      isAuth: true,
      userProfile: userFromStorage.user,
    },
  };
}

function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
}

const store = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
