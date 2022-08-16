import React from "react";
import { useHistory } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import { Route, Switch, Redirect } from "react-router-dom";

export default function App() {
  const history = useHistory();

  const goHome = () => {
    history.push("/home");
  };

  const goAbout = () => {
    history.push("/about");
  };

  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            <button onClick={goHome}>home</button>
            <button onClick={goAbout}>about</button>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由 */}
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/home" component={Home} />
                <Redirect to="/about" />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
