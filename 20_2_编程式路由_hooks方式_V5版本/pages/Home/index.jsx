import React from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const goAbout = () => {
    history.push("/about");
  };

  return (
    <div>
      <div>我是Home</div>
      <button onClick={goAbout}>找About请点击我</button>
    </div>
  );
}
