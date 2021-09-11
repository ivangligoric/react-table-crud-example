import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import { Link, Route, Switch } from "react-router-dom";

import AddSupplier from "./components/AddSupplier";
import React from "react";
import Supplier from "./components/Supplier";
import SuppliersList from "./components/SupplierList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/supplier" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/supplier"} className="nav-link">
              Suppliers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/supplier"]} component={SuppliersList} />
          <Route exact path="/add" component={AddSupplier} />
          <Route path="/supplier/:id" component={Supplier} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
