import React from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const back = () => {
    history.goBack();
  };

  const forward = () => {
    history.goForward();
  };
  return (
    <div className="page-header">
      <h2>React Router Demo</h2>
      <button onClick={back}>回退</button>&nbsp;
      <button onClick={forward}>前进</button>&nbsp;
    </div>
  );
};

export default Header;
