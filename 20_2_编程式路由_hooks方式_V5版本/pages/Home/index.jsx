import React from "react";
import { useHistory } from "react-router-dom";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
import Message from "./Message";
import News from "./News";

export default function Home() {
  const history = useHistory();
  const goAbout = () => {
    history.push("/about");
  };

  return (
    <div>
      <h3>我是Home的内容</h3>
      <button onClick={goAbout}>如果想找About,请点击我</button>
      <ul className="nav nav-tabs">
        <li>
          <NavLink to="/home/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/home/message">Message</NavLink>
        </li>
      </ul>

      <Switch>
        <Route path="/home/news" component={News} />
        <Route path="/home/message" component={Message} />
        <Redirect to="/home/news" />
      </Switch>
    </div>
  );
}
