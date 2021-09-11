import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import { Link, Route, Switch } from "react-router-dom";

import AddTutorial from "./components/AddTutorial";
import React from "react";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

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
          <Route exact path={["/", "/supplier"]} component={TutorialsList} />
          <Route exact path="/add" component={AddTutorial} />
          <Route path="/supplier/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
