import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail3() {
  const location = useLocation();
  const { id, title } = location.state;

  return (
    <ul>
      <li>接收参数ID:{id}</li>
      <li>接收参数Title:{title}</li>
    </ul>
  );
}
