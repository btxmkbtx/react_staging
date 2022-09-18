import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import Detail1 from "./Detail1";
import Detail2 from "./Detail2";
import Detail3 from "./Detail3";

export default function Message() {
  const message1 = { id: "01", title: "常用:测试param参数传值" };
  const message2 = { id: "02", title: "不常用:测试search参数传值" };
  const message3 = { id: "03", title: "常用:测试state参数传值" };

  return (
    <div>
      <ul>
        <li>
          <NavLink
            to={`/home/message/detail1/${message1.id}/${message1.title}`}
          >
            {message1.title}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/home/message/detail2?id=${message2.id}&title=${message2.title}`}
          >
            {message2.title}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: "/home/message/detail3",
              state: {
                id: message3.id,
                title: message3.title,
              },
            }}
          >
            {message3.title}
          </NavLink>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route
          path="/home/message/detail1/:id/:title"
          component={Detail1}
        ></Route>
        <Route path="/home/message/detail2" component={Detail2}></Route>
        <Route path="/home/message/detail3" component={Detail3}></Route>
      </Switch>
    </div>
  );
}
