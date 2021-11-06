import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import "./App.css";
import MeterForm from "./components/MeterForm";
import Pin from "./components/Pin";
import Login from "./components/Login";
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
    // console.log("use effect ran");
    axios
      .get("/checkAuth")
      .then((data) => {
        // console.log(data);
        setLoggedIn(data.data);
      })
      // .then(() => console.log("2", loggedIn))
      .catch((err) => console.log(err));
  }, []);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="App">
        {/* Pin number login can access the meter entries form */}
        <Route exact path="/" component={Pin}>
          {/* {loggedIn ? <Redirect to="/meter" /> : <Route exact path="/" />} */}
        </Route>
        {loggedIn && <Route exact path="/meter" component={MeterForm} />}
        {/* Admin can access the admin Dashboard and from there add employees, locations and add another administrator. 
      they can also view the meter entries entered */}
        <Route exact path="/admin" component={Login} />
        <Route exact path="/admin/adminDash" component={Dashboard} />
        <Route exact path="/addEmployee" component={AddEmployee} />
        {/* add view of all employees */}
        <Route exact path="/viewEmployees" component={ViewEmployees} />
        {/* view meter readings */}
        <Route exact path="/viewMeters" component={ViewMeters} />
        <Route exact path="/addLocation" component={Location} />
        <Route exact path="/addAdministrator" component={Administrator} />
        <Route exact path="/consumptions" component={Consumptions} />
      </div>
    </LoginContext.Provider>
  );
}

export default App;
