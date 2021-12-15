import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Skills from "./components/Skills";

function App() {
  return (
    <Router>
      <div>
        <h2 className="header">AmCharts for Bryan</h2>
        <hr />
        <Switch>
          <Route exact path="/" component={Skills} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
