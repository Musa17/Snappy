import React, {
  createContext,
} from "react";
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";

import Signup from "./components/Authentication/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext();

const Routing = () => {

  return (
    <React.Fragment>
      <Switch>
        {(
          <Route path="/signup">
            <Signup />
          </Route>
        )}
      </Switch>
    </React.Fragment>
  );
};

function App() {

  return (
    <UserContext.Provider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
