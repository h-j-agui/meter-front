import { Route, Switch, BrowserRouter } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      {/* Pin number login can access the meter entries form */}
      <Route exact path="/" component={Pin} />
      <Route exact path="/meter" component={MeterForm} />
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
    </div>
  );
}

export default App;
