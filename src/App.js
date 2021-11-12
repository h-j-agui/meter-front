import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import PrivateRoute from "./components/ProtectedRoute";
import MeterForm from "./components/MeterForm";
import Pin from "./components/Pin";
import Login from "./components/AdminLogin";
import Dashboard from "./components/adminDash/Dashboard";
import AddEmployee from "./components/adminDash/AddEmployee";
import Location from "./components/adminDash/AddLocation";
import Administrator from "./components/adminDash/AddAdministrator";
import ViewEmployees from "./components/adminDash/ViewEmployees";
import ViewMeters from "./components/adminDash/ViewMeters";
import Consumptions from "./components/adminDash/Consumptions";
import { LoginContext } from "./utils/Context";
import axios from "axios";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    axios
      .get("/checkAuth")
      .then((data) => {
        console.log("useEffect de App.js", data.data);
        setLoggedIn(data.data);
      })
      // .then(() => console.log("2", loggedIn))
      .catch((err) => console.log(err));
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="App">
        <Switch>
          {/* Pin number login can access the meter entries form */}
          <Route exact path="/" component={Pin}>
            {/* {loggedIn ? <Redirect to="/meter" /> : <Route exact path="/" />} */}
          </Route>
          {loggedIn && <Route exact path="/meter" component={MeterForm} />}
          {/* Admin can access the admin Dashboard and from there add employees, locations and add another administrator. 
      they can also view the meter entries entered */}
          <Route exact path="/admin" component={Login} />

          <PrivateRoute path="/admin/adminDash" component={Dashboard} />

          <PrivateRoute exact path="/addEmployee" component={AddEmployee} />
          {/* view of all employees */}
          <PrivateRoute exact path="/viewEmployees" component={ViewEmployees} />
          {/* view meter readings */}
          <PrivateRoute exact path="/viewMeters" component={ViewMeters} />
          <PrivateRoute exact path="/addLocation" component={Location} />
          <PrivateRoute
            exact
            path="/addAdministrator"
            component={Administrator}
          />
          <PrivateRoute exact path="/consumptions" component={Consumptions} />
        </Switch>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
