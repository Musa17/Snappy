import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import Signup from "./components/Authentication/Signup/Signup";
import Login from "./components/Authentication/Login/Login";
import { initialState, reducer } from "./reducer/userReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();

const Routing = () => {
  const initial = (
    <Switch className="margin">
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [routers, setRouters] = useState(initial);
  const [user, setUser] = useState();

  // Searching for logged in user
  useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("user"));
    setUser(userTemp);
    if (userTemp) dispatch({ type: "USER", payload: userTemp });
    // log
  }, []);

  return (
    <React.Fragment>
      <Switch>
        {!state && !user && (
          <Route path="/signup">
            <Signup />
          </Route>
        )}
        {!state && !user && (
          <Route path="/login">
            <Login />
          </Route>
        )}
      </Switch>
    </React.Fragment>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
